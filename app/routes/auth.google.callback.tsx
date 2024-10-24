import { authenticator } from "../services/auth.server";

class SocialAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SocialAuthError";
  }
}

export const loader = ({ request }: { request: Request }) => {
  try {
    return authenticator.authenticate("google", request, {
      successRedirect: "/dashboard",
      failureRedirect: "/",
    });
  } catch (error) {
    if (error instanceof SocialAuthError) {
      console.error("Authentication error:", error.message);
      // You can handle or redirect based on the error message
    }
  }
};
