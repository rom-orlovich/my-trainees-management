/* eslint-disable no-unused-vars */
export enum ErrorCodePgNODE {
  unique = "23505",
}
export function handleError(
  err: Error & { code?: string },
  singleEntityName: string
) {
  if (ErrorCodePgNODE.unique === err.code)
    return `The ${singleEntityName} have already existed`;
  return "Something is went worng.";
}
