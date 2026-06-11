export function formatAccountNumber(num: string): string {
  return num.replace(/(\d{4})(?=\d)/g, "$1 ")
}
