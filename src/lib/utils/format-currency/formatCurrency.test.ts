import { describe, expect, it } from "vitest"
import { formatCurrency } from "./formatCurrency"

describe("formatCurrency", () => {
  it("formats whole amounts as USD currency", () => {
    expect(formatCurrency(1000)).toBe("US$1,000.00")
  })

  it("formats decimal amounts with two fraction digits", () => {
    expect(formatCurrency(1234.56)).toBe("US$1,234.56")
  })

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("US$0.00")
  })

  it("formats negative amounts", () => {
    expect(formatCurrency(-50)).toBe("-US$50.00")
  })
})
