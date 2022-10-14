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
  type: PermissionsRolesType;
  operations?: {
    delete: PermissionsRolesType;
    update: PermissionsRolesType;
    create: PermissionsRolesType;
  };
}

export const PERMISSION_ADMIN: Permissions = { type: ROLE_ADMIN };
export const PERMISSION_ALL_WITHOUT_UPDATE: Permissions = {
  type: ROLE_ALL,
  operations: {
    delete: ROLE_ALL,
    update: ROLE_ADMIN,
    create: ROLE_ALL,
  },
};
export const PERMISSION_TRAINER_WITHOUT_DELETE: Permissions = {
  type: ROLE_TRAINER,
  operations: {
    delete: ROLE_ADMIN,
    update: ROLE_TRAINER,
    create: ROLE_TRAINER,
  },
};
export const PERMISSION_TRAINER_ONLY_CREATE: Permissions = {
  type: ROLE_TRAINER,
  operations: {
    delete: ROLE_ADMIN,
    update: ROLE_ADMIN,
    create: ROLE_TRAINER,
  },
};
export const PERMISSION_TRAINER: Permissions = {
  type: ROLE_TRAINER_OR_USER_ID,
  operations: {
    delete: ROLE_TRAINER,
    update: ROLE_TRAINER_OR_USER_ID,
    create: ROLE_TRAINER_OR_USER_ID,
  },
};
export const PERMISSION_TRAINEE_ONLY_UPDATE: Permissions = {
  type: ROLE_ALL,
  operations: {
    delete: ROLE_TRAINER,
    update: ROLE_ALL,
    create: ROLE_TRAINER,
  },
};
export const PERMISSION_TRAINEE_ONLY_READ: Permissions = {
  type: ROLE_ALL,
  operations: {
    delete: ROLE_TRAINER,
    update: ROLE_TRAINER,
    create: ROLE_TRAINER,
  },
};

export const PERMISSION_ALL: Permissions = { type: ROLE_ALL };
