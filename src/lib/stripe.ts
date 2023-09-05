import Stripe from "stripe";

export const stripe = new Stripe(`${process.env.SECRET_KEY}`, {
  apiVersion: "2023-08-16",
  appInfo: {
    name: "Ignite Shop",
  },
});
