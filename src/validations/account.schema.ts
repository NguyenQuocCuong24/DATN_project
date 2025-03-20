import { Role } from "@/constants/enum.const";
import z from "zod";

export const AccountBodySchema = z
  .object({
    roles: z.array(z.enum([Role.ADMIN, Role.USER]).default(Role.ADMIN)),
    username: z.string().min(1, "Mật khẩu không được để trống"),
    exp: z.number(),
    iat: z.number(),
    userId: z.number(),
  })
  .strict();

export type AccountBodyType = z.TypeOf<typeof AccountBodySchema>;
