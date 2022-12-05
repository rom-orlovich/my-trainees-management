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
  | "favoriteFoods"
  | "blackListFoods"
  | "filterFoodForm"
  | "nutrientsValues"
  | "foodDetails";

export interface ModelControllerState {
  displayContent: ModelDisplayContentOptions[];
  isModelOpen: boolean;
  curParam?: any;
  lastModel?: ModelDisplayContentOptions;
}

export type ModelFormQuestionnaireModeDisplay =
  | ExtractKey<
      ModelDisplayContentOptions,
      "filterFoodForm" | "blackListFoods" | "favoriteFoods" | "allergensList"
    >
  | "nutritionQuestionnaire";
