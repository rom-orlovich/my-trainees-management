export interface Permission {
  by: "ALL" | "userID";
  role: "admin" | "trainer" | "trainee";
}

export const ROLE_ADMIN_BY_USER_ID: Permission[] = [
  { by: "userID", role: "admin" },
];
export const ROLE_ADMIN_ALL: Permission[] = [{ by: "ALL", role: "admin" }];

export const ROLE_TRAINER_BY_USER_ID: Permission[] = [
  { by: "userID", role: "admin" },
  { by: "userID", role: "trainer" },
];
export const ROLE_TRAINER_ALL: Permission[] = [
  { by: "ALL", role: "admin" },
  { by: "ALL", role: "trainer" },
];
export const ROLE_TRAINER_ADMIN_ALL: Permission[] = [
  { by: "ALL", role: "admin" },
  { by: "userID", role: "trainer" },
];
export const ROLE_TRAINEE_BY_USER_ID: Permission[] = [
  { by: "ALL", role: "admin" },
  { by: "userID", role: "trainer" },
  { by: "userID", role: "trainee" },
];
export const ROLE_TRAINEE_BY_USER_ID_ADMIN_USER_ID: Permission[] = [
  { by: "userID", role: "admin" },
  { by: "userID", role: "trainer" },
  { by: "userID", role: "trainee" },
];

export type PermissionsRolesType =
  | typeof ROLE_ADMIN_ALL
  | typeof ROLE_ADMIN_BY_USER_ID
  | typeof ROLE_TRAINER_ALL
  | typeof ROLE_TRAINER_ADMIN_ALL
  | typeof ROLE_TRAINER_BY_USER_ID
  | typeof ROLE_TRAINEE_BY_USER_ID;

export interface Permissions {
  read: PermissionsRolesType;
  delete: PermissionsRolesType;
  update: PermissionsRolesType;
  create: PermissionsRolesType;
}

export const PERMISSION_ADMIN: Permissions = {
  read: ROLE_ADMIN_ALL,
  delete: ROLE_ADMIN_ALL,
  update: ROLE_ADMIN_ALL,
  create: ROLE_ADMIN_ALL,
};

export const PERMISSION_TRAINER_BY_USER_ID: Permissions = {
  read: ROLE_TRAINER_BY_USER_ID,
  delete: ROLE_TRAINER_BY_USER_ID,
  update: ROLE_TRAINER_BY_USER_ID,
  create: ROLE_TRAINER_BY_USER_ID,
};

export const PERMISSION_TRAINER_BY_USER_ID_READ_ALL: Permissions = {
  read: ROLE_TRAINER_ALL,
  delete: ROLE_TRAINER_ADMIN_ALL,
  update: ROLE_TRAINER_ADMIN_ALL,
  create: ROLE_TRAINER_ADMIN_ALL,
};
export const PERMISSION_TRAINER_ADMIN_ALL: Permissions = {
  read: ROLE_TRAINER_ADMIN_ALL,
  delete: ROLE_TRAINER_ADMIN_ALL,
  update: ROLE_TRAINER_ADMIN_ALL,
  create: ROLE_TRAINER_ADMIN_ALL,
};
export const PERMISSION_TRAINEE: Permissions = {
  read: ROLE_TRAINEE_BY_USER_ID,
  delete: ROLE_TRAINEE_BY_USER_ID,
  update: ROLE_TRAINEE_BY_USER_ID,
  create: ROLE_TRAINEE_BY_USER_ID,
};

export const PERMISSION_TRAINEE_READONLY: Permissions = {
  read: ROLE_TRAINEE_BY_USER_ID,
  delete: ROLE_TRAINER_BY_USER_ID,
  update: ROLE_TRAINER_BY_USER_ID,
  create: ROLE_TRAINER_BY_USER_ID,
};

export const PERMISSION_TRAINEE_WITHOUT_DELETE: Permissions = {
  read: ROLE_TRAINEE_BY_USER_ID,
  delete: ROLE_TRAINER_BY_USER_ID,
  update: ROLE_TRAINEE_BY_USER_ID,
  create: ROLE_TRAINEE_BY_USER_ID,
};

export const PERMISSION_TRAINEE_WITHOUT_UPDATE: Permissions = {
  read: ROLE_TRAINEE_BY_USER_ID,
  delete: ROLE_TRAINEE_BY_USER_ID,
  update: ROLE_ADMIN_BY_USER_ID,
  create: ROLE_TRAINEE_BY_USER_ID,
};

export const PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE: Permissions = {
  read: ROLE_TRAINEE_BY_USER_ID_ADMIN_USER_ID,
  delete: ROLE_TRAINER_BY_USER_ID,
  update: ROLE_TRAINEE_BY_USER_ID,
  create: ROLE_TRAINER_BY_USER_ID,
};

export const PERMISSION_TRAINEE_BY_USER_ID: Permissions = {
  read: ROLE_TRAINEE_BY_USER_ID_ADMIN_USER_ID,
  delete: ROLE_TRAINEE_BY_USER_ID_ADMIN_USER_ID,
  update: ROLE_TRAINEE_BY_USER_ID_ADMIN_USER_ID,
  create: ROLE_TRAINEE_BY_USER_ID_ADMIN_USER_ID,
};
