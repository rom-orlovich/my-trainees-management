export const ROLE_ADMIN = ["admin"] as const;
export const ROLE_TRAINER = ["admin", "trainer"] as const;
export const ROLE_ALL = ["admin", "trainer", "trainee"] as const;
export const ROLE_ADMIN_OR_USER_ID = ["userID", "admin"] as const;
export const ROLE_TRAINER_OR_USER_ID = ["userID", "admin", "trainer"] as const;

export type PermissionsRolesType =
  | typeof ROLE_ADMIN
  | typeof ROLE_TRAINER
  | typeof ROLE_ALL
  | typeof ROLE_ADMIN_OR_USER_ID
  | typeof ROLE_TRAINER_OR_USER_ID;
export interface Permissions {
  read: PermissionsRolesType;
  delete: PermissionsRolesType;
  update: PermissionsRolesType;
  create: PermissionsRolesType;
}

export const PERMISSION_ADMIN: Permissions = {
  read: ROLE_ADMIN,
  delete: ROLE_ADMIN,
  update: ROLE_ADMIN,
  create: ROLE_ADMIN,
};
export const PERMISSION_ALL_WITHOUT_UPDATE: Permissions = {
  read: ROLE_ALL,
  delete: ROLE_ALL,
  update: ROLE_ADMIN,
  create: ROLE_ALL,
};
export const PERMISSION_TRAINER_WITHOUT_DELETE: Permissions = {
  read: ROLE_ALL,
  delete: ROLE_ADMIN,
  update: ROLE_TRAINER,
  create: ROLE_TRAINER,
};
export const PERMISSION_TRAINER_ONLY_CREATE: Permissions = {
  read: ROLE_TRAINER,
  delete: ROLE_ADMIN,
  update: ROLE_ADMIN,
  create: ROLE_TRAINER,
};
export const PERMISSION_TRAINER: Permissions = {
  read: ROLE_TRAINER,
  delete: ROLE_TRAINER,
  update: ROLE_TRAINER_OR_USER_ID,
  create: ROLE_TRAINER_OR_USER_ID,
};
export const PERMISSION_TRAINEE_ONLY_UPDATE: Permissions = {
  read: ROLE_ALL,
  delete: ROLE_TRAINER,
  update: ROLE_ALL,
  create: ROLE_TRAINER,
};
export const PERMISSION_TRAINEE_ONLY_READ: Permissions = {
  read: ROLE_ALL,
  delete: ROLE_TRAINER,
  update: ROLE_TRAINER,
  create: ROLE_TRAINER,
};

export const PERMISSION_ALL: Permissions = {
  read: ROLE_ALL,
  delete: ROLE_ALL,
  update: ROLE_ALL,
  create: ROLE_ALL,
};
