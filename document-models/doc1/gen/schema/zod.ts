import * as z from "zod";
import type { Doc1State, SetTextInput } from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function Doc1StateSchema(): z.ZodObject<Properties<Doc1State>> {
  return z.object({
    __typename: z.literal("Doc1State").optional(),
    text: z.string(),
  });
}

export function SetTextInputSchema(): z.ZodObject<Properties<SetTextInput>> {
  return z.object({
    text: z.string(),
  });
}
