import * as yup from "yup";
import { Permissions } from "../usersPermission";

export interface ComparisonQuery {
  gt: string;
  lt: string;
}
export interface SelectTableQueryParam {
  tableName: string;
  tableID: string;
  fieldNamesQuery: string; // The field names that we want to return from the query
  querySelectLogic: string; // The query logic
  orderByParam?: Record<string, string>;
  comparisonQuery?: ComparisonQuery;
  // The purpose of below params is to encapsulate the real table's fields from the client,
  // so the client won't able to know what are the real fields name of the table.
  queryParams?: Record<string, string>;
  queryNameParam?: Record<string, string>;
  modifiedOtherTable?: {
    update?: {
      otherTableName: string;
      values: string[];
      otherTableID: string;
      include?: string[];
    };
    delete?: { otherTableName: string; otherTableID: string };
  };
  groupBy?: string;
}

export interface OptionsCRUD {
  singleEntityName: string; // name of one item
  selectQuery: SelectTableQueryParam;
  validateSchema?: yup.ObjectSchema<any>;
  permissions: Permissions;
  logAlert?: boolean;
}

export interface SelectPaginationQueryParam {
  requestQuery: Record<string, any>;
  queryParams?: Record<string, any>;
  queryNameParam?: Record<string, any>;
  orderByParam?: Record<string, string>;
  comparisonQuery?: ComparisonQuery;
}

export interface TablePropsData {
  tableName: string;
  tableID: string;
  fieldNamesQuery: string;
  querySelectLogic: string;
  groupBy?: string;
}
