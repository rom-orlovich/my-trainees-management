import * as yup from "yup";
import { GenericRecord } from "../../utilities/types";
import { Permissions } from "../usersPermission";

export interface ComparisonQuery {
  fieldName: string;
}
// export type FieldComparisonQuery = GenericRecord<ComparisonQuery>;

export interface SelectTableQueryParam {
  tableName: string;
  tableID: string;
  withClause?: string;
  fieldNamesQuery: string; // The field names that we want to return from the query
  querySelectLogic: string; // The query logic
  orderByParam?: Record<string, string>;
  comparisonQuery?: GenericRecord<string>;
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
  comparisonQuery?: GenericRecord<string>;
}

export interface TablePropsData {
  withClause?: string;
  tableName: string;
  tableID: string;
  fieldNamesQuery: string;
  querySelectLogic: string;
  groupBy?: string;
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
