export interface Permission {
  by: "ALL" | "userID";
  role: "admin" | "trainer" | "trainee";
}

export const ROLE_ADMIN: Permission[] = [{ by: "userID", role: "admin" }];

export const ROLE_TRAINER: Permission[] = [
  { by: "userID", role: "admin" },
  { by: "userID", role: "trainer" },
];
export const ROLE_TRAINEE: Permission[] = [
  { by: "ALL", role: "admin" },
  { by: "userID", role: "trainer" },
  { by: "userID", role: "trainee" },
];

export type PermissionsRolesType =
  | typeof ROLE_ADMIN
  | typeof ROLE_TRAINER
  | typeof ROLE_TRAINEE;

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

export const PERMISSION_TRAINER: Permissions = {
  read: ROLE_TRAINER,
  delete: ROLE_TRAINER,
  update: ROLE_TRAINER,
  create: ROLE_TRAINER,
};
export const PERMISSION_TRAINEE: Permissions = {
  read: ROLE_TRAINEE,
  delete: ROLE_TRAINEE,
  update: ROLE_TRAINEE,
  create: ROLE_TRAINEE,
};
export const PERMISSION_TRAINEE_READONLY: Permissions = {
  read: ROLE_TRAINEE,
  delete: ROLE_TRAINER,
  update: ROLE_TRAINER,
  create: ROLE_TRAINER,
};

export const PERMISSION_TRAINEE_WITHOUT_DELETE: Permissions = {
  read: ROLE_TRAINEE,
  delete: ROLE_TRAINER,
  update: ROLE_TRAINEE,
  create: ROLE_TRAINEE,
};

export const PERMISSION_TRAINEE_WITHOUT_UPDATE: Permissions = {
  read: ROLE_TRAINEE,
  delete: ROLE_TRAINEE,
  update: ROLE_ADMIN,
  create: ROLE_TRAINEE,
};

export const PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE: Permissions = {
  read: ROLE_TRAINEE,
  delete: ROLE_TRAINER,
  update: ROLE_TRAINEE,
  create: ROLE_TRAINER,
};

// export const ROLE_USER_ID = ["userID"] as const;
// export const ROLE_ADMIN = ["admin"] as const;
// export const ROLE_TRAINER = ["admin", "trainer"] as const;
// export const ROLE_ALL = ["admin", "trainer", "trainee"] as const;
// export const ROLE_ADMIN_OR_USER_ID = ["userID", "admin"] as const;
// export const ROLE_TRAINER_OR_USER_ID = ["userID", "admin", "trainer"] as const;

// export const ROLE_USER_ID = ["userID"] as const;
// export const ROLE_ADMIN = ["admin"] as const;
// export const ROLE_TRAINER = ["admin", "trainer"] as const;
// export const ROLE_ALL = ["admin", "trainer", "trainee"] as const;
// export const ROLE_ADMIN_OR_USER_ID = ["userID", "admin"] as const;
// export const ROLE_TRAINER_OR_USER_ID = ["userID", "admin", "trainer"] as const;

// export type PermissionsRolesType =
//   | typeof ROLE_ADMIN
//   | typeof ROLE_TRAINER
//   | typeof ROLE_ALL
//   | typeof ROLE_USER_ID
//   | typeof ROLE_ADMIN_OR_USER_ID
//   | typeof ROLE_TRAINER_OR_USER_ID;
// export interface Permissions {
//   read: PermissionsRolesType;
//   delete: PermissionsRolesType;
//   update: PermissionsRolesType;
//   create: PermissionsRolesType;
// }

// export const PERMISSION_ADMIN: Permissions = {
//   read: ROLE_ADMIN,
//   delete: ROLE_ADMIN,
//   update: ROLE_ADMIN,
//   create: ROLE_ADMIN,
// };

// export const PERMISSION_ADMIN_OR_USER_ID: Permissions = {
//   read: ROLE_ADMIN_OR_USER_ID,
//   delete: ROLE_ADMIN_OR_USER_ID,
//   update: ROLE_ADMIN_OR_USER_ID,
//   create: ROLE_ADMIN_OR_USER_ID,
// };
// export const PERMISSION_ADMIN_OR_USER_ID_WITHOUT_UPDATE: Permissions = {
//   read: ROLE_ADMIN_OR_USER_ID,
//   delete: ROLE_ADMIN_OR_USER_ID,
//   update: ROLE_ADMIN,
//   create: ROLE_ADMIN_OR_USER_ID,
// };
// export const PERMISSION_ALL_WITHOUT_UPDATE: Permissions = {
//   read: ROLE_ALL,
//   delete: ROLE_ALL,
//   update: ROLE_ADMIN,
//   create: ROLE_ALL,
// };
// export const PERMISSION_TRAINER_WITHOUT_DELETE: Permissions = {
//   read: ROLE_ALL,
//   delete: ROLE_ADMIN,
//   update: ROLE_TRAINER,
//   create: ROLE_TRAINER,
// };
// export const PERMISSION_TRAINER_DELETE_WITH_USER_ID: Permissions = {
//   read: ROLE_TRAINER,
//   delete: ROLE_ADMIN_OR_USER_ID,
//   update: ROLE_TRAINER,
//   create: ROLE_TRAINER,
// };
// export const PERMISSION_TRAINER_DELETE_UPDATE_WITH_USER_ID: Permissions = {
//   read: ROLE_TRAINER,
//   delete: ROLE_ADMIN_OR_USER_ID,
//   update: ROLE_ADMIN_OR_USER_ID,
//   create: ROLE_TRAINER,
// };
// export const PERMISSION_TRAINER_ONLY_CREATE: Permissions = {
//   read: ROLE_TRAINER,
//   delete: ROLE_ADMIN,
//   update: ROLE_ADMIN,
//   create: ROLE_TRAINER,
// };
// export const PERMISSION_TRAINER: Permissions = {
//   read: ROLE_TRAINER,
//   delete: ROLE_TRAINER,
//   update: ROLE_TRAINER,
//   create: ROLE_TRAINER,
// };
// export const PERMISSION_TRAINER_WITH_USER_ID: Permissions = {
//   read: ROLE_TRAINER_OR_USER_ID,
//   delete: ROLE_TRAINER,
//   update: ROLE_TRAINER_OR_USER_ID,
//   create: ROLE_TRAINER_OR_USER_ID,
// };
// export const PERMISSION_TRAINEE_ONLY_UPDATE: Permissions = {
//   read: ROLE_ALL,
//   delete: ROLE_TRAINER,
//   update: ROLE_ALL,
//   create: ROLE_TRAINER,
// };
// export const PERMISSION_TRAINEE_ONLY_READ: Permissions = {
//   read: ROLE_ALL,
//   delete: ROLE_TRAINER,
//   update: ROLE_TRAINER,
//   create: ROLE_TRAINER,
// };

// export const PERMISSION_ALL: Permissions = {
//   read: ROLE_ALL,
//   delete: ROLE_ALL,
//   update: ROLE_ALL,
//   create: ROLE_ALL,
// };
