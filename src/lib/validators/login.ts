import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres.",
    })
    .max(20, {
      message: "El nombre de usuario debe tener como máximo 20 caracteres.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "El nombre de usuario solo puede contener letras y números.",
    }),
  password: z.string().min(2, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
});
