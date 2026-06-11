import { describe, expect, it } from "vitest"
import { profileSchema } from "./profile.schema"

const validProfile = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@email.com",
}

describe("profileSchema", () => {
  it("accepts valid required fields", () => {
    const result = profileSchema.safeParse(validProfile)
    expect(result.success).toBe(true)
  })

  it("accepts valid data with optional fields", () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      phone: "555-1234",
      address: "123 Main St",
      postalCode: "10001",
      avatarUrl: "https://example.com/avatar.png",
    })
    expect(result.success).toBe(true)
  })

  it("rejects empty first name", () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      firstName: "",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Full name is required")
    }
  })

  it("rejects empty last name", () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      lastName: "",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Last name is required")
    }
  })

  it("rejects empty email", () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      email: "",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required")
    }
  })

  it("rejects invalid email", () => {
    const result = profileSchema.safeParse({
      ...validProfile,
      email: "not-an-email",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address")
    }
  })
})
