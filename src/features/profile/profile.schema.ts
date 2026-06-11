import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(1, "Full name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  avatarUrl: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
