import { describe, expect, it } from "vitest"
import { loginSchema, registerSchema } from "./auth.schemas"

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "jane.doe@email.com",
      password: "Password123!",
    })
    expect(result.success).toBe(true)
  })

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "Password123!",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      email: "jane.doe@email.com",
      password: "",
    })
    expect(result.success).toBe(false)
  })
})

describe("registerSchema", () => {
  it("accepts valid registration data", () => {
    const result = registerSchema.safeParse({
      firstName: "Jane",
      lastName: "Doe",
      email: "new@email.com",
      password: "Password1",
      confirmPassword: "Password1",
    })
    expect(result.success).toBe(true)
  })

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      firstName: "Jane",
      lastName: "Doe",
      email: "new@email.com",
      password: "Password1",
      confirmPassword: "Different1",
    })
    expect(result.success).toBe(false)
  })

  it("requires uppercase and number in password", () => {
    const result = registerSchema.safeParse({
      firstName: "Jane",
      lastName: "Doe",
      email: "new@email.com",
      password: "password",
      confirmPassword: "password",
    })
    expect(result.success).toBe(false)
  })
})
