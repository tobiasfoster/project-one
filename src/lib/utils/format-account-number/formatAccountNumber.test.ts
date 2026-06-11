import { describe, expect, it } from "vitest"
import { formatAccountNumber } from "./formatAccountNumber"

describe("formatAccountNumber", () => {
  it("groups digits in blocks of four", () => {
    expect(formatAccountNumber("1234567890123456")).toBe("1234 5678 9012 3456")
  })

  it("does not add trailing space for short numbers", () => {
    expect(formatAccountNumber("1234")).toBe("1234")
  })

  it("formats partial groups", () => {
    expect(formatAccountNumber("12345678")).toBe("1234 5678")
  })
})
