import { z } from "zod";
import { Gender, UserStatus } from "./user.types";

export const createUserValidation = z.object({
  body: z.object({
    roleId: z.string().uuid(),

    firstName: z.string().min(2),

    lastName: z.string().min(2),

    email: z.string().email(),

    phone: z.string().optional(),

    password: z.string().min(6),

    avatar: z.string().optional(),

    gender: z.nativeEnum(Gender).optional(),

    status: z.nativeEnum(UserStatus).optional(),
  }),
});

export const updateUserValidation = z.object({
  body: z.object({
    roleId: z.string().uuid().optional(),

    firstName: z.string().min(2).optional(),

    lastName: z.string().min(2).optional(),

    email: z.string().email().optional(),

    phone: z.string().optional(),

    password: z.string().min(6).optional(),

    avatar: z.string().optional(),

    gender: z.nativeEnum(Gender).optional(),

    status: z.nativeEnum(UserStatus).optional(),

    isVerified: z.boolean().optional(),
  }),
});
