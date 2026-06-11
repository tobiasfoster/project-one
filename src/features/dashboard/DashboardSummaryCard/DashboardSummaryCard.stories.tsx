import type { Meta, StoryObj } from "@storybook/react-vite"
import { DashboardSummaryCard } from "./DashboardSummaryCard"
import { CreditCardIcon } from "@/components/ui/icons/CreditCardIcon/CreditCardIcon"
import { ArrowDownLeftIcon } from "@/components/ui/icons/ArrowDownLeftIcon/ArrowDownLeftIcon"
import { ArrowUpRightIcon } from "@/components/ui/icons/ArrowUpRightIcon/ArrowUpRightIcon"

const meta = {
  title: "Features/Dashboard/DashboardSummaryCard",
  component: DashboardSummaryCard,
  tags: ["autodocs"],
  args: { index: 0 },
} satisfies Meta<typeof DashboardSummaryCard>

export default meta
type Story = StoryObj<typeof meta>

export const AccountBalance: Story = {
  args: {
    title: "Primary Savings",
    value: "$12,450.75",
    icon: CreditCardIcon,
    color: "text-eb-primary-600",
    bg: "bg-eb-primary-50",
  },
}

export const MonthlyDeposits: Story = {
  args: {
    title: "Monthly Deposits",
    value: "$4,400.00",
    icon: ArrowDownLeftIcon,
    color: "text-eb-accent-600",
    bg: "bg-eb-accent-50",
  },
}

export const MonthlyWithdrawals: Story = {
  args: {
    title: "Monthly Withdrawals",
    value: "-$1,651.88",
    icon: ArrowUpRightIcon,
    color: "text-eb-warning-600",
    bg: "bg-eb-warning-50",
  },
}
