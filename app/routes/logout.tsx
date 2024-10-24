import { authenticator } from "../services/auth.server";

export const action = async ({ request }: { request: Request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
};
