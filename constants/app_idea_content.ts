/**
 * Local fallback for the /idea page, used when `public.idea_screens` is unavailable or empty.
 * Keep in sync with supabase/idea_screens_seed.sql (same copy, same screen keys).
 * Image URLs are built from `imagePath` via lib/storage — never hardcoded here.
 */

/** Carousel order on the page. Screen numbers keep the full 1–24 user journey. */
export const IdeaJourneys = [
  { key: "account_onboarding", title: "Account & Onboarding" },
  { key: "discover_profile", title: "Discover & Manage" },
  { key: "meetup", title: "The Meetup Journey" },
] as const;

export type IdeaJourneyKey = (typeof IdeaJourneys)[number]["key"];

export interface IdeaScreenCopy {
  screenNumber: number;
  screenKey: string;
  journeyKey: IdeaJourneyKey;
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  actions: readonly string[];
  note: string | null;
}

export const IdeaScreensFallback: readonly IdeaScreenCopy[] = [
  {
    screenNumber: 1,
    screenKey: "welcome",
    journeyKey: "account_onboarding",
    title: "Welcome",
    description:
      "FoodFriend brings people together through shared meals. Discover nearby restaurants, meet people with similar interests, and turn a meal into a new connection.",
    imagePath: "auth_onboarding/get_started.png",
    imageAlt: "Food O Friend welcome screen inviting new users to get started or sign in.",
    actions: ["Get Started — Begin onboarding.", "Sign In — Access an existing account."],
    note: null,
  },
  {
    screenNumber: 2,
    screenKey: "expand_your_circle",
    journeyKey: "account_onboarding",
    title: "Expand Your Circle",
    description:
      "Step outside your usual circle and meet people who share your taste in food. Join a group meal and start a conversation in a welcoming restaurant.",
    imagePath: "auth_onboarding/onbording1_auth.png",
    imageAlt: "Onboarding screen about meeting new people who share your taste in food.",
    actions: [],
    note: null,
  },
  {
    screenNumber: 3,
    screenKey: "privacy_control",
    journeyKey: "account_onboarding",
    title: "Privacy & Control",
    description:
      "Choose what you share. Your contact details and live location are shared with other members only when you allow it. Meetup suggestions consider your interests and age preferences.",
    imagePath: "auth_onboarding/onbording2_auth.png",
    imageAlt: "Onboarding screen explaining privacy choices for contact details and live location.",
    actions: ["Review the privacy policy.", "Continue without sharing your live location."],
    note: null,
  },
  {
    screenNumber: 4,
    screenKey: "build_new_connections",
    journeyKey: "account_onboarding",
    title: "Build New Connections",
    description:
      "Meet nearby people, exchange ideas, and discover different perspectives. Keep the conversation going after dinner to build friendships beyond the table.",
    imagePath: "auth_onboarding/onbording3_auth.png",
    imageAlt: "Onboarding screen about building friendships that continue after dinner.",
    actions: [],
    note: null,
  },
  {
    screenNumber: 5,
    screenKey: "choose_location",
    journeyKey: "account_onboarding",
    title: "Choose Your Location",
    description:
      "Set your location to discover nearby restaurants and group meals.",
    imagePath: "auth_onboarding/onbording4_auth.png",
    imageAlt: "Location setup screen with options to use your location or choose a city manually.",
    actions: ["Use My Location — Allow location access.", "Choose City Manually — Explore without granting location access.", "Change your selected city later."],
    note: null,
  },
  {
    screenNumber: 6,
    screenKey: "create_account",
    journeyKey: "account_onboarding",
    title: "Create Your Account",
    description:
      "Create an account with your name, email address, and password. Your account lets you reserve seats, join group conversations, and manage your meetups.",
    imagePath: "auth_onboarding/create_account.png",
    imageAlt: "Account creation form asking for name, email address and password.",
    actions: ["Create a new account.", "Switch to Sign In if you already have one."],
    note: null,
  },
  {
    screenNumber: 7,
    screenKey: "discover_nearby_meals",
    journeyKey: "discover_profile",
    title: "Discover Nearby Meals",
    description:
      "Explore restaurants and available group meals near you. See offers, new arrivals, meal prices, times, and remaining seats.",
    imagePath: "profile_home/Home_page.png",
    imageAlt: "Home screen listing nearby restaurants and group meals with prices, times and seats left.",
    actions: ["Search or filter available meals.", "Open a restaurant or meetup.", "Save a place to your favourites."],
    note: null,
  },
  {
    screenNumber: 8,
    screenKey: "restaurant_meetup_details",
    journeyKey: "discover_profile",
    title: "Restaurant & Meetup Details",
    description:
      "Review the restaurant, food photos, location, and group meal details before joining. Check the price per person, meetup time, and available seats.",
    imagePath: "profile_home/detail page.png",
    imageAlt: "Restaurant detail screen with food photos, location and group meal details.",
    actions: ["Join an available group meal.", "Save the restaurant.", "Continue to reservation confirmation."],
    note: null,
  },
  {
    screenNumber: 9,
    screenKey: "confirm_your_seat",
    journeyKey: "meetup",
    title: "Confirm Your Seat",
    description:
      "Review your selected meetup, total amount, and payment method. Read the cancellation terms before confirming your reservation.",
    imagePath: "meetup/1 confirmation.png",
    imageAlt: "Reservation confirmation screen summarising the meetup, total amount and payment method.",
    actions: ["Check the restaurant, date, time, and price.", "Open the cancellation policy.", "Confirm and pay to reserve your seat."],
    note: null,
  },
  {
    screenNumber: 10,
    screenKey: "cancellation_policy",
    journeyKey: "meetup",
    title: "Cancellation Policy",
    description:
      "Understand the cancellation and refund rules before committing. This page explains how cancellation depends on whether the group is still forming or already confirmed.",
    imagePath: "meetup/2cancellation policy.png",
    imageAlt: "Cancellation policy screen explaining refund rules for forming and confirmed groups.",
    actions: ["Review cancellation deadlines and refund eligibility.", "Return to your reservation."],
    note: "The final policy must define the exact deadlines and any exceptions.",
  },
  {
    screenNumber: 11,
    screenKey: "seat_reserved",
    journeyKey: "meetup",
    title: "Seat Reserved",
    description:
      "Your reservation is successful. See your booking details and the current group status.",
    imagePath: "meetup/3seat reserved.png",
    imageAlt: "Booking success screen showing the reserved seat and current group status.",
    actions: ["Check your reserved seat and payment status.", "Open the group waiting room."],
    note: null,
  },
  {
    screenNumber: 12,
    screenKey: "group_awaiting_members",
    journeyKey: "meetup",
    title: "Group Awaiting Members",
    description:
      "Your seat is reserved while the group waits for more members. See who has joined, how many seats remain, and the confirmation deadline.",
    imagePath: "meetup/4group_info awaiting.png",
    imageAlt: "Group waiting room showing joined members, remaining seats and the confirmation deadline.",
    actions: ["View member profiles.", "Open the group conversation.", "Track progress toward a confirmed meetup."],
    note: null,
  },
  {
    screenNumber: 13,
    screenKey: "group_confirmed",
    journeyKey: "meetup",
    title: "Group Confirmed",
    description:
      "The group is full and the meetup is confirmed. Review the final members, restaurant, meal time, and meeting instructions.",
    imagePath: "meetup/5group_info full.png",
    imageAlt: "Confirmed group screen listing the final members, restaurant and meal time.",
    actions: ["Open group chat to coordinate.", "Use voice or video calling.", "Check the meeting point and directions."],
    note: null,
  },
  {
    screenNumber: 14,
    screenKey: "meeting_point",
    journeyKey: "meetup",
    title: "Meeting Point",
    description:
      "View the agreed meeting location on the map. The group can meet at the restaurant entrance or agree on another pickup point.",
    imagePath: "meetup/6map_locaition decided.png",
    imageAlt: "Map screen showing the group's agreed meeting point.",
    actions: ["Check the meeting time and location.", "Open directions.", "Share the meeting point in group chat."],
    note: null,
  },
  {
    screenNumber: 15,
    screenKey: "pickup_points_member_locations",
    journeyKey: "meetup",
    title: "Pickup Points & Member Locations",
    description:
      "Coordinate an optional shared ride using pickup points and member locations. Only members who allow location sharing appear with a live position.",
    imagePath: "meetup/7map_pickup points.png",
    imageAlt: "Map screen with shared pickup points and the live positions of members who share their location.",
    actions: ["View shared pickup points.", "Request location access from a member whose position is unknown.", "Continue coordinating if they decline the request."],
    note: null,
  },
  {
    screenNumber: 16,
    screenKey: "arrival_waiting",
    journeyKey: "meetup",
    title: "Arrival & Waiting",
    description:
      "Let the group know when you arrive at the restaurant. See who has arrived, who is on the way, and who has not checked in.",
    imagePath: "meetup/8arrival_page.png",
    imageAlt: "Arrival screen showing which members have arrived, are on the way or haven't checked in.",
    actions: ["Tap I've Arrived.", "Contact the group through chat or calling.", "Wait for the remaining members before dining."],
    note: null,
  },
  {
    screenNumber: 17,
    screenKey: "start_billing",
    journeyKey: "meetup",
    title: "Start Billing",
    description:
      "After the meal, begin reviewing the bill and each member's share. Identify the person who paid the restaurant and attach the restaurant bill.",
    imagePath: "meetup/9start_billing.png",
    imageAlt: "Billing screen showing the bill total, each member's share and who paid the restaurant.",
    actions: ["Review the bill total and individual amounts.", "Confirm the bill payer, such as Alice.", "Continue to member confirmation."],
    note: null,
  },
  {
    screenNumber: 18,
    screenKey: "billing_confirmation",
    journeyKey: "meetup",
    title: "Billing Confirmation",
    description:
      "Each member reviews their share and confirms that the amount is correct. The screen shows who has confirmed and who is still pending.",
    imagePath: "meetup/10billing_confirmation.png",
    imageAlt: "Billing confirmation screen tracking which members have confirmed their share.",
    actions: ["Confirm your amount.", "Raise a billing issue before settlement.", "Track the group's confirmation progress."],
    note: "The proposed 80% confirmation threshold still needs to be finalised.",
  },
  {
    screenNumber: 19,
    screenKey: "dinner_wrap_up",
    journeyKey: "meetup",
    title: "Dinner Wrap-Up",
    description:
      "Review the completed meetup and final payment summary. See your share, the bill payer, and the settlement status.",
    imagePath: "meetup/11dinner wrap up.png",
    imageAlt: "Dinner wrap-up screen with the final payment summary and settlement status.",
    actions: ["Check the final amount.", "Continue to the transfer result and receipts.", "Keep in touch through group chat."],
    note: null,
  },
  {
    screenNumber: 20,
    screenKey: "transfer_complete",
    journeyKey: "meetup",
    title: "Transfer Complete",
    description:
      "Your share has been transferred from your FoodFriend wallet to the member who paid the restaurant. For example, Jack's $24 is transferred to Alice's wallet because Alice paid the bill.",
    imagePath: "meetup/12transfer complete.png",
    imageAlt: "Transfer complete screen confirming a wallet transfer to the member who paid the bill.",
    actions: ["Download the wallet transfer receipt.", "Download the restaurant bill paid by Alice.", "Return to your meetup history."],
    note: null,
  },
  {
    screenNumber: 21,
    screenKey: "upcoming_meetups",
    journeyKey: "discover_profile",
    title: "Upcoming Meetups",
    description:
      "Track future reservations and their current status.",
    imagePath: "profile_home/meetups_incoming.png",
    imageAlt: "Upcoming meetups screen listing future reservations with their status.",
    actions: ["Awaiting your confirmation.", "Waiting for more members.", "Confirmed and ready to attend.", "Cancelled or expired, with the refund status shown."],
    note: null,
  },
  {
    screenNumber: 22,
    screenKey: "past_meetups",
    journeyKey: "discover_profile",
    title: "Past Meetups",
    description:
      "Review previous meals with the restaurant, date, members, and your amount paid.",
    imagePath: "profile_home/your meetups past.png",
    imageAlt: "Past meetups screen listing previous meals with restaurant, date, members and amount paid.",
    actions: ["Return to the group chat.", "View payment details and receipts.", "Save the restaurant to your favourites."],
    note: null,
  },
  {
    screenNumber: 23,
    screenKey: "notifications",
    journeyKey: "discover_profile",
    title: "Notifications",
    description:
      "Stay updated on nearby meetups and changes to your groups. Notifications can highlight someone from a previous meal, an available seat, a member leaving, or a refund.",
    imagePath: "profile_home/notifications.png",
    imageAlt: "Notifications screen with updates about nearby meetups, open seats, members leaving and refunds.",
    actions: ["Open the related meetup or profile.", "Respond to updates that need your attention."],
    note: null,
  },
  {
    screenNumber: 24,
    screenKey: "member_profile",
    journeyKey: "discover_profile",
    title: "Member Profile",
    description:
      "Get to know another member before or after a meetup. View their photo, name, age, work, interests, and favourite sports.",
    imagePath: "profile_home/profile.png",
    imageAlt: "Another member's profile showing their photo, age, work, interests and favourite sports.",
    actions: ["Discover shared interests.", "View shared meetup history where available.", "Connect through the group conversation."],
    note: null,
  },
];
