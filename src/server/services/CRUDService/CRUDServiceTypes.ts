import * as yup from "yup";
import { GenericRecord, OmitKey, PickKey } from "../../utilities/types";
import { Permissions } from "../usersPermission";

export interface ArrayQueryParams {
  selectQueryStr: string;
  realFieldName?: string;
}
export interface SelectPaginationQueryParam {
  requestQuery: Record<string, any>;
  // The purpose of below params is to encapsulate the real table's fields from the client,
  // so the client won't able to know what are the real fields name of the table.
  queryParams?: Record<string, any>;
  queryNameParam?: Record<string, any>;
  orderByParam?: Record<string, string>;
  comparisonQuery?: GenericRecord<string>;
  arrayQueryParams?: GenericRecord<ArrayQueryParams>;
}

export interface TablePropsData {
  tableName: string;
  tableID: string;
  withClause?: string;
  fieldNamesQuery: string; // The field names that we want to return from the query
  querySelectLogic: string; // The query logic
  beforeWhereQuery?: string;
  groupBy?: string;
}

export type SelectTableQueryParam = {
  modifiedOtherTable?: {
    update?: {
      otherTableName: string;
      values: string[];
      otherTableID: string;
      include?: string[];
    };
    delete?: { otherTableName: string; otherTableID: string };
  };
} & OmitKey<SelectPaginationQueryParam, "requestQuery"> &
  TablePropsData;

export interface OptionsCRUD {
  singleEntityName: string; // name of one item
  selectQuery: SelectTableQueryParam;
  validateSchema?: yup.ObjectSchema<any>;
  permissions: Permissions;
  logAlert?: boolean;
}

export interface IncomeAPI {
  income_id?: number;
  product_id: number;
  date: Date;
  buyer_id: number;
  amount: number;
  total_price: number;
  note_topic?: string;
  note_text?: string;
  user_id?: number;
}

export interface ProductAPI {
  product_id?: number;
  product_name: string;
  product_type: string;
  max_training?: number;
  price: number;
  user_id?: number;
}
