/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcryptjs";

import { CookieOptions } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";

import {
  insertQueryOneItem,
  selectQuery,
  updateQuerySingleItem,
} from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";

import { API_ROUTES } from "../../apiRoutesConstants";
import { TABLES_DATA } from "../../../utilities/constants";
import { createModifiedActionResult } from "../../serviceAlerts/handleAlerts";

export type UserRoles = "admin" | "trainee" | "trainer";

export enum USER_ROLES {
  ADMIN = "admin",
  TRAINEE = "trainee",
  TRAINER = "trainer",
}

export interface User {
  user_id: number;
  username: string;
  password: string;
  refresh_tokens: string[];
  role: UserRoles;
}

// export const REFRESH_IN =
//   1000 * 60 * Number(process.env.EXPIRE_IN_REFRESH_TOKEN?.slice(0, -1) || 15);
export const EXPIRE_IN =
  1000 *
  60 *
  60 *
  Number(process.env.EXPIRE_IN_REFRESH_TOKEN?.slice(0, -1) || 2);

export const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.USER_ENTITY
);
export const COOKIES_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};
export function verifyAsync(
  token: string,
  key: string
): Promise<string | JwtPayload | undefined> {
  return new Promise((res, reject) => {
    verify(token, key, (err, decode) => {
      if (err) reject(err);
      res(decode);
    });
  });
}

export const genToken = (
  obj: Record<string, any>,
  key: string,
  expireTime: string | number
) =>
  sign(obj, key, {
    expiresIn: expireTime,
  });

export async function createUser(
  password: string,
  username: string,
  role: UserRoles
) {
  const hashPassword = await hash(password, 10);

  const [user, error] = await promiseHandler<User[]>(
    insertQueryOneItem(TABLES_DATA.USERS_TABLE_NAME, {
      role,
      refresh_tokens: [],
      username,
      password: hashPassword,
    })
  );

  console.log(error);
}