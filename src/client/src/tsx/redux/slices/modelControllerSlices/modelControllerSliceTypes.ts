import { ExtractKey } from "../../../types";

export type ModelDisplayContentOptions =
  | "meeting"
  | "participantsGroupsListForm"
  | "participantForm"
  | "activityForm"
  | "locationForm"
  | "cityForm"
  | "productForm"
  | "exerciseForm"
  | "equipmentForm"
  | "muscleGroupForm"
  | "subscriptionPlansForm"
  | "allergensList"
  | "mealsDistPercents"
  | "filterFoodsForm"
  | "foodsListForm"
  | "favoriteFoodsFilterForm"
  | "nutrientsValues"
  | "foodDetails";

export interface ModelControllerState {
  displayContent: ModelDisplayContentOptions[];
  isModelOpen: boolean;
  curParam?: any;
  lastModel?: ModelDisplayContentOptions;
  lastParam: any;
}

export type FilterFoodFormTypes =
  | "favoriteFoodsFilterForm"
  | "blackListFoodsFilterForm";

export type ModelFormQuestionnaireModeDisplay =
  | "nutritionQuestionnaire"
  | FilterFoodFormTypes;
