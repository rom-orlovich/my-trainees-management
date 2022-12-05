export const ALLERGENS_LIST = [
  "גלוטן",
  "סויה",
  "שומשום",
  "בוטנים",
  "חיטה",

  "ביצה",
  "סולפיט",
  "חלב",
  "שקדים",
  "אגוזי לוז",
  "אגוזי פקאן",
  "קוקוס",
  "קשיו",

  "חרדל",
  "סלרי",
] as const;

// eslint-disable-next-line no-unused-vars
const ALLERGENS_LIST_ENGLISH = [
  "Gluten",
  "soya",
  "Sesame",
  "peanuts",
  "wheat",
  "nuts",
  "egg",
  "sulphite",
  "milk",
  "tonsils",
  "Hazelnuts",
  "Pecan Nuts",
  "coconut",
  "cashew",
  "hazel",
  "Pecan",
  "mustard",
  "celery",
];

export type AllergensListType = typeof ALLERGENS_LIST[number];
