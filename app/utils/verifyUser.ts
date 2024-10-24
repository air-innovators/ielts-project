import { authenticator } from "../services/auth.server";

export const verifyUser = async (request: Request) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/",
    });
    return user;
}