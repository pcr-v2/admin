export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL!;

// export const COMMON_API_URL = process.env.NEXT_PUBLIC_COMMON_API_URL!;

// export const AI_SKETCH_API_URL = process.env.NEXT_PUBLIC_AI_SKETCH_API_URL;

// export const AI_PPT_API_URL = process.env.NEXT_PUBLIC_AI_PPT_API_URL;

// export const LANG_COOKIE_KEY = "SCHOOL_TEACHER_LANG";

// export const LANGS = ["ko" as const, "en" as const];

// export const DEFAULT_LANG = "ko";

export const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY;

export const ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRATION_TIME;

export const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY;

export const REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRATION_TIME;

export const PUBLIC_PATHS = [
  "/signin",
  "/signup",
  "/find-id",
  "/find-password",
];
