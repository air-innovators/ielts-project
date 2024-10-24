import { authenticator } from "../services/auth.server";

export const action = async ({ request }: { request: Request }) => {
  // initiating authentication using Google Strategy
  // on success --> redirect to dasboard
  // on failure --> back to homepage/login
  return await authenticator.authenticate("google", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  });
};
