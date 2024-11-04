import "server-only";

export const TOKEN_SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_TOKEN_SECRET,
);
