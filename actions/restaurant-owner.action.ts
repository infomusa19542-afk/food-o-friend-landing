"use server";

import { submitRestaurantOwner } from "@/controllers/restaurant-owner.controller";
import type { RestaurantOwnerResponse } from "@/models/restaurant-owner.model";
import { parseRestaurantOwnerInput } from "@/utils/restaurant-owner.validation";

/** Server Action for /restaurant-owner. Input is untrusted and re-validated by the controller. */
export async function submitRestaurantOwnerAction(payload: unknown): Promise<RestaurantOwnerResponse> {
  return submitRestaurantOwner(parseRestaurantOwnerInput(payload));
}
