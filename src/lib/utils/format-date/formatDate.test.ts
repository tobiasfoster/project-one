import { describe, expect, it } from "vitest"
import { formatDate } from "./formatDate"

describe("formatDate", () => {
  it("formats ISO date strings", () => {
    expect(formatDate("2024-01-15")).toBe("Jan 15, 2024")
  })

  it("formats another month and day", () => {
    expect(formatDate("2023-12-25")).toBe("Dec 25, 2023")
  })
})
