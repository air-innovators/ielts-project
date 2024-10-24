// Added the createCookieSessionStorage function 👇
import { json, createCookieSessionStorage } from "@remix-run/node";

// ...

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;