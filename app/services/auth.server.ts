import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy, GoogleProfile } from "remix-auth-google";
import { createUser, getUserByEmail } from "~/models/user.server";

// Create an instance of the authenticator
// It will take session storage as an input parameter and creates the user session on successful authentication
export const authenticator = new Authenticator(sessionStorage);

// Custom error class for handling missing fields
class SocialAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SocialAuthError";
  }
}

// callback function that will be invoked upon successful authentication from social provider
async function handleGoogleAuthCallback({
  profile,
}: {
  profile: GoogleProfile;
}) {
  // create user in your db here
  // profile object contains all the user data like image, displayName, id

  // check if user email is verified or not
  if (!profile._json.email_verified) {
    throw new SocialAuthError("Email not verified");
  }

  let user = await getUserByEmail(profile.emails[0].value);
  if (user) {
    return { id: user.id, name: user.name, email: user.email };
  } else {
    user = await createUser(
      profile.emails[0].value,
      profile.provider,
      profile.displayName,
      profile.photos[0].value
    );
    return { id: user.id, name: user.name, email: user.email };
  }
}

// Configuring Google Strategy
authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["openid email profile"],
      callbackURL: `http://localhost:5173/auth/google/callback`,
    },
    handleGoogleAuthCallback
    // async ({profile, ...rest}) => {
    //   console.log(rest);
    //   return profile

    // }
  )
);
