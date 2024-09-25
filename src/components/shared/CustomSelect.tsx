import type { OptionProps } from '@/app/utils/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange: (value: any) => void
  options: OptionProps[]
  placeholder?: string
  defaultValue?: string
  value?: string
  className?: string
}

export function CustomSelect({
  onValueChange,
  options,
  placeholder,
  defaultValue,
  value,
  className,
}: SelectProps) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: OptionProps) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
