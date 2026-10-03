import "server-only";

import { AppStrings } from "@/constants/app_strings";
import { submitForm } from "@/controllers/form-submission";
import type { RestaurantOwnerInput, RestaurantOwnerResponse } from "@/models/restaurant-owner.model";
import { insertRestaurantOwner } from "@/services/restaurant-owner.service";
import { validateRestaurantOwner } from "@/utils/restaurant-owner.validation";

export const submitRestaurantOwner = (input: RestaurantOwnerInput): Promise<RestaurantOwnerResponse> =>
  submitForm({
    context: "restaurant-owner.submit",
    input,
    validate: validateRestaurantOwner,
    save: insertRestaurantOwner,
    messages: {
      success: AppStrings.restaurantOwner.success,
      duplicate: AppStrings.restaurantOwner.duplicate,
    },
  });
