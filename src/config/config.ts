export const DOMAIN_URL = process.env.NEXT_PUBLIC_LOCAL_URL!;

export const ACCESS_TOKEN_KEY = "BA_ACCESS_TOKEN";
export const REFRESH_TOKEN_KEY = "BA_REFRESH_TOKEN";

export const ACCESS_TOKEN_EXPIRATION_TIME = "1h";
export const REFRESH_TOKEN_EXPIRATION_TIME = "1d";

export const PUBLIC_PATHS = [
  "/",
  "/signin",
  "/signup",
  "/find-id",
  "/reset-password",
];
