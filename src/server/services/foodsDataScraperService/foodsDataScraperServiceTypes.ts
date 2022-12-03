/* eslint-disable no-use-before-define */
export interface ResDataBaseFood {
  help: string;
  success: boolean;
  result: Result;
}

export interface Result {
  filters: Filters;
  include_total: boolean;
  limit: number;
  records_format: string;
  resource_id: string;
  sort: string;
  total_estimation_threshold: any;
  records: FoodDetails[];
  fields: Field[];
  _links: Links;
  total: number;
  total_was_estimated: boolean;
}

export interface Filters {
  protein: number;
}

export interface FoodDetails {
  _id: number;
  Code: number;
  smlmitzrach: number;
  shmmitzrach: string;
  makor: number;
  edible: any;
  psolet: any;
  ahuz_ibud_nozlim?: number;
  protein: number;
  total_fat: number;
  carbohydrates: number;
  food_energy: number;
  alcohol?: number;
  moisture: number;
  total_dietary_fiber: number;
  calcium: number;
  iron: number;
  magnesium: number;
  phosphorus: number;
  potassium: number;
  sodium: number;
  zinc: number;
  copper: number;
  vitamin_a_iu?: number;
  carotene?: number;
  vitamin_e?: number;
  vitamin_c: number;
  thiamin: number;
  riboflavin: number;
  niacin: number;
  vitamin_b6: number;
  folate: number;
  folate_dfe: string;
  vitamin_b12: number;
  cholesterol: number;
  saturated_fat: number;
  butyric?: number;
  caproic?: number;
  caprylic?: number;
  capric?: number;
  lauric: number;
  myristic: number;
  palmitic: number;
  stearic: number;
  oleic: number;
  linoleic: number;
  linolenic: number;
  arachidonic?: number;
  docosahexanoic?: number;
  palmitoleic: number;
  parinaric?: number;
  gadoleic?: number;
  eicosapentaenoic?: number;
  erucic?: number;
  docosapentaenoic?: number;
  mono_unsaturated_fat: number;
  poly_unsaturated_fat: number;
  vitamin_d?: number;
  total_sugars: number;
  trans_fatty_acids?: number;
  vitamin_a_re?: number;
  isoleucine?: number;
  leucine?: number;
  valine?: number;
  lysine?: number;
  threonine?: number;
  methionine?: number;
  phenylalanine?: number;
  tryptophan?: number;
  histidine?: number;
  tyrosine?: number;
  arginine?: number;
  cystine?: number;
  serine?: number;
  vitamin_k?: number;
  pantothenic_acid?: number;
  iodine?: number;
  selenium?: number;
  sugar_alcohols?: number;
  choline?: number;
  biotin?: number;
  manganese?: number;
  fructose?: number;
  tarich_ptiha: string;
  tarich_idkun: string;
  english_name: string;
}

export interface Field {
  id: string;
  type: string;
  info?: Info;
}

export interface Info {
  label: string;
  notes: string;
  type_override: string;
}

export interface Links {
  start: string;
  next: string;
}

export interface FoodNameDB {
  id: number;
  name: string;
}

export interface CronCachedData {
  eachMin: number;
  fetchProductsList: Range;
  fetchFoodsDetails: Range;
  fetchNationalDict: {
    start: number;
    add: number;
  };
}

export interface Range {
  start: number;
  end: number;
}
export type KosherTypeWithoutPareve = Exclude<KosherType, "פרווה">;
export type KosherType = "בשרי" | "חלבי" | "פרווה";

export type NutrientsTypes = "proteins" | "fats" | "carbohydrates";
export type FoodType = "בשרי" | "טבעוני" | "צמחוני";

export interface Food {
  food_id?: number;
  food_name: string;
  calories_total: number;
  protein_g: number;
  protein_cals: number;
  carbs_g: number;
  carbs_cals: number;
  sugars_g: number;
  fat_g: number;
  fat_cals: number;
  saturated_fat: number;
  cholesterol_mg: number;
  sodium_mg: number;
  nutrient_type: NutrientsTypes;
  allergens: string[];
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  kosher_type: KosherType;
  food_score: number;
  food_density: number;
  user_id?: number;
}
