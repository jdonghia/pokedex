import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  onValueChange: (value: any) => void;
  options: OptionProps[];
  placeholder?: string;
  defaultValue?: string;
}

export function CustomSelect({
  onValueChange,
  options,
  placeholder,
  defaultValue,
}: SelectProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
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
  );
}
