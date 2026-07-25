import { z } from "zod";
import { RoleName } from "./role.types";

export const createRoleValidation = z.object({
  body: z.object({
    name: z.nativeEnum(RoleName),

    description: z.string().optional(),
  }),
});

export const updateRoleValidation = z.object({
  body: z.object({
    name: z.nativeEnum(RoleName).optional(),

    description: z.string().optional(),
  }),
});
