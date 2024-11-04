"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { parseSearchParams } from "zod-search-params";

function toURLSearchParamsValue(item: unknown) {
  if (item instanceof Date) {
    return item.toISOString();
  } else {
    return String(item);
  }
}

function toURLSearchParams(object: object) {
  const searchParams = new URLSearchParams();
  for (let [key, value] of Object.entries(object)) {
    if (Array.isArray(value)) {
      for (let item of value) {
        if (item != null && item !== "") {
          const string = toURLSearchParamsValue(item);
          searchParams.append(key, string);
        }
      }
    } else {
      if (value != null && value !== "") {
        const str = toURLSearchParamsValue(value);
        searchParams.append(key, str);
      }
    }
  }
  return searchParams;
}

export function useZodSearchParams<Z extends z.ZodSchema>(
  schema: Z,
  defaultValue: z.input<Z>,
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(
    () =>
      ((parseSearchParams as any)(schema, searchParams) as z.input<Z>) ??
      defaultValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, schema],
  );

  const pushQuery = useCallback(
    (newQuery: z.input<Z>) => {
      const newSearchParams = toURLSearchParams(newQuery);
      router.push("?" + newSearchParams.toString());
    },
    [router],
  );

  const replaceQuery = useCallback(
    (newQuery: z.input<Z>) => {
      const newSearchParams = toURLSearchParams(newQuery);
      router.replace("?" + newSearchParams.toString());
    },
    [router],
  );

  return [query, pushQuery, replaceQuery] as const;
}
