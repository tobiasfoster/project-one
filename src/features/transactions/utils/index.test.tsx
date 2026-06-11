import { describe, expect, it } from "vitest"
import {
  resolveTransactionsSearch,
  validateTransactionsSearch,
} from "./index"

describe("validateTransactionsSearch", () => {
  it("returns an empty object when search params are absent", () => {
    expect(validateTransactionsSearch({})).toEqual({})
  })

  it("omits page when it is 1 or less", () => {
    expect(validateTransactionsSearch({ page: 1 })).toEqual({})
    expect(validateTransactionsSearch({ page: 0 })).toEqual({})
    expect(validateTransactionsSearch({ page: -2 })).toEqual({})
  })

  it("includes page when it is greater than 1", () => {
    expect(validateTransactionsSearch({ page: 2 })).toEqual({ page: 2 })
    expect(validateTransactionsSearch({ page: "3" })).toEqual({ page: 3 })
  })

  it("ignores non-finite page values", () => {
    expect(validateTransactionsSearch({ page: "abc" })).toEqual({})
    expect(validateTransactionsSearch({ page: NaN })).toEqual({})
  })

  it("only keeps sortBy when it is amount", () => {
    expect(validateTransactionsSearch({ sortBy: "amount" })).toEqual({
      sortBy: "amount",
    })
    expect(validateTransactionsSearch({ sortBy: "date" })).toEqual({})
    expect(validateTransactionsSearch({ sortBy: "other" })).toEqual({})
  })

  it("only keeps sortOrder when it is asc", () => {
    expect(validateTransactionsSearch({ sortOrder: "asc" })).toEqual({
      sortOrder: "asc",
    })
    expect(validateTransactionsSearch({ sortOrder: "desc" })).toEqual({})
  })

  it("keeps non-empty date strings", () => {
    expect(
      validateTransactionsSearch({
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      }),
    ).toEqual({
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    })
  })

  it("ignores empty or non-string date values", () => {
    expect(validateTransactionsSearch({ startDate: "", endDate: 123 })).toEqual(
      {},
    )
  })

  it("parses a full set of supported search params", () => {
    expect(
      validateTransactionsSearch({
        page: "4",
        sortBy: "amount",
        sortOrder: "asc",
        startDate: "2024-06-01",
        endDate: "2024-06-30",
      }),
    ).toEqual({
      page: 4,
      sortBy: "amount",
      sortOrder: "asc",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
    })
  })
})

describe("resolveTransactionsSearch", () => {
  it("fills in defaults for an empty search object", () => {
    expect(resolveTransactionsSearch({})).toEqual({
      page: 1,
      sortBy: "date",
      sortOrder: "desc",
      startDate: "",
      endDate: "",
    })
  })

  it("preserves provided values and defaults the rest", () => {
    expect(
      resolveTransactionsSearch({
        page: 3,
        sortBy: "amount",
        startDate: "2024-01-01",
      }),
    ).toEqual({
      page: 3,
      sortBy: "amount",
      sortOrder: "desc",
      startDate: "2024-01-01",
      endDate: "",
    })
  })

  it("passes through a fully specified search object", () => {
    expect(
      resolveTransactionsSearch({
        page: 5,
        sortBy: "amount",
        sortOrder: "asc",
        startDate: "2024-02-01",
        endDate: "2024-02-29",
      }),
    ).toEqual({
      page: 5,
      sortBy: "amount",
      sortOrder: "asc",
      startDate: "2024-02-01",
      endDate: "2024-02-29",
    })
  })
})
