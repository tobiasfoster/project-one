import type { User } from "@/types"

export interface StoredUser extends User {
  password: string
}

export const users: StoredUser[] = [
  {
    id: "user-1",
    email: "jane.doe@email.com",
    password: "Password123!",
    profile: {
      id: "profile-1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Eagle Street, New York, NY 10001",
      postalCode: "10001",
      avatarUrl: undefined,
    },
  },
]
