import * as z from "zod";
import type {
  AddPlayerInput,
  ClickInput,
  ClickerGameState,
  Player,
  RemovePlayerInput,
  ResetGameInput,
  StartGameInput,
  StopGameInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddPlayerInputSchema(): z.ZodObject<
  Properties<AddPlayerInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function ClickInputSchema(): z.ZodObject<Properties<ClickInput>> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function ClickerGameStateSchema(): z.ZodObject<
  Properties<ClickerGameState>
> {
  return z.object({
    __typename: z.literal("ClickerGameState").optional(),
    gameMaster: z.string().nullish(),
    players: z.array(z.lazy(() => PlayerSchema())),
  });
}

export function PlayerSchema(): z.ZodObject<Properties<Player>> {
  return z.object({
    __typename: z.literal("Player").optional(),
    clicks: z.number(),
    id: z.string(),
    name: z.string(),
  });
}

export function RemovePlayerInputSchema(): z.ZodObject<
  Properties<RemovePlayerInput>
> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function ResetGameInputSchema(): z.ZodObject<
  Properties<ResetGameInput>
> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function StartGameInputSchema(): z.ZodObject<
  Properties<StartGameInput>
> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function StopGameInputSchema(): z.ZodObject<Properties<StopGameInput>> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}
