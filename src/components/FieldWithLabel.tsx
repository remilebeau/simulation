import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  labelColor?: string;
};

export default function FieldWithLabel({
  label,
  name,
  placeholder,
  labelColor,
}: Props) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`italic ${labelColor}`}>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              required
              placeholder={placeholder}
              className="rounded-xl"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
