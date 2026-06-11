import { useId } from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { ChevronDownIcon } from "@/components/ui/icons/ChevronDownIcon/ChevronDownIcon"
import { CheckIcon } from "@/components/ui/icons/CheckIcon/CheckIcon"
import { cn } from "@/lib/utils/cn"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onValueChange: (value: string | null) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  className?: string
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  label,
  className,
}: SelectProps) {
  const selected = options.find(o => o.value === value)
  const labelId = useId()

  return (
    <BaseSelect.Root value={value} onValueChange={onValueChange}>
      <div className="flex flex-col gap-eb-sm">
        {label && (
          <span className="text-sm font-medium text-eb-primary-700" id={labelId}>
            {label}
          </span>
        )}
        <BaseSelect.Trigger
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-eb-primary-200 bg-eb-surface px-eb-sm text-sm text-eb-primary-900",
            "hover:border-eb-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eb-accent-500",
            className,
          )}
        >
          <BaseSelect.Value>
            {selected?.label ?? placeholder}
          </BaseSelect.Value>
          <BaseSelect.Icon>
            <ChevronDownIcon aria-hidden="true" className="h-4 w-4 text-eb-primary-500" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </div>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-50" sideOffset={4}>
          <BaseSelect.Popup className="max-h-60 min-w-[var(--anchor-width)] overflow-auto rounded-lg border border-eb-primary-100 bg-eb-surface px-eb-xs shadow-lg">
            {options.map(option => (
              <BaseSelect.Item
                key={option.value}
                className="flex cursor-pointer items-center justify-between py-eb-sm px-eb-sm text-sm text-eb-primary-800 outline-none data-[highlighted]:bg-eb-surface-hover"
                value={option.value}
              >
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator>
                  <CheckIcon aria-hidden="true" className="h-4 w-4 text-eb-accent-600" />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
