/* eslint-disable no-unused-vars */

import { hash } from "bcryptjs";
import nodemailer from "nodemailer";
import { CookieOptions } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";

import Mail from "nodemailer/lib/mailer";
import {
  insertQueryOneItem,
  updateQuerySingleItem,
} from "../../../PGSql/sqlHelpers";

import { API_ROUTES } from "../../apiRoutesConstants";
import { TABLES_DATA } from "../../../utilities/constants";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";
import { client } from "../../../PGSql/DBConnectConfig";
import {
  clientMailOAuth,
  MAIL_OPTIONS,
  MY_USER_MAIL,
} from "../../googleApiConstants";

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

export const EXPIRE_IN =
  1000 *
  60 *
  60 *
  Number(process.env.EXPIRE_IN_REFRESH_TOKEN?.slice(0, -1) || 2);

export const prepareLogAlert = createLogAlertInfo(API_ROUTES.USER_ENTITY);
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
  email: string,
  username: string,
  password: string,
  role: UserRoles,
  updateID?: string
) {
  try {
    await client.query("BEGIN");
    const hashPassword = await hash(password, 10);
    let profile;
    
    if (updateID) {
      profile = await updateQuerySingleItem(
        TABLES_DATA.PROFILES_TABLE_NAME,
        { email },
        updateID,
        `where ${TABLES_DATA.PROFILE_ID}=$1`
      );
    } else
      profile = await insertQueryOneItem(TABLES_DATA.PROFILES_TABLE_NAME, {
        email,
      });

    console.log("profile", profile);
    const user = await insertQueryOneItem(TABLES_DATA.USERS_TABLE_NAME, {
      role,
      refresh_tokens: [],
      username,
      password: hashPassword,
      profile_id: profile.profile_id,
    });
    console.log("user", user);
    await client.query("COMMIT");
    return [user as User, undefined] as const;
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("error", error);
    return [undefined, error as Error] as const;
  }
}

export const sendEmail = async (
  to: string,
  message: { text: string; subject: string }
) => {
  let result1;
  try {
    const { token } = await clientMailOAuth.getAccessToken();
    console.log("token", token);
    const mailOptions: Mail.Options = {
      ...MAIL_OPTIONS,
      to,

      ...message,
    };

    if (token) {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          accessToken: token,
          ...MY_USER_MAIL,
        },
        socketTimeout: 1000 * 3,
        connectionTimeout: 1000 * 3,
        greetingTimeout: 1000 * 3,
      });

      // eslint-disable-next-line no-unused-vars
      result1 = await transport.sendMail(mailOptions);
      transport.close();
    }
    console.log("result1", result1);
    return result1;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
