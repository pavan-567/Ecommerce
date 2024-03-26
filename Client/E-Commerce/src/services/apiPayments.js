import { loadStripe } from "@stripe/stripe-js";

export async function makePayment() {
  const stripe = await loadStripe(
    "pk_test_51OkSw4SClaubPB0OhHWs9yviEIDDdyLMJ58YXlsYeEOD8mkWsJ5ItJcmOUneh3wwi3llyNY2wTwptLEAwSXpPkxG00SfkFoex8"
  );

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch();
}
