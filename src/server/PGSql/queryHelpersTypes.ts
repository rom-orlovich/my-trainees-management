export interface ArrayQueryParamsPrepareStatementObj {
  paramsArrayArr: any[][];
  selectQueryStatements: string[];
}
export interface RealFieldNameAndValue {
  realFieldName: string;
  valueToCompare: string;
}
export interface ComparisonQueryKeyValueObj {
  gt: RealFieldNameAndValue[];
  lt: RealFieldNameAndValue[];
}
