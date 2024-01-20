import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface FormCheckboxGroupProps {
  data: any[];
  form: any;
  name: string;
  isString?: boolean;
}

export function FormCheckboxGroup({
  data,
  form,
  name,
  isString = false,
}: FormCheckboxGroupProps) {
  return (
    <FormItem>
      <FormLabel>Se Capacitó en:</FormLabel>

      {data.map((item) => (
        <FormField
          key={item.id}
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    className="rounded"
                    checked={
                        isString
                          ? field.value?.split(',').includes(item.value)
                          : field.value?.includes(item.id)
                      }
                    onCheckedChange={(checked) => {
                        if (checked) {
                            if (isString) {
                                let newValues = field.value ? field.value.split(',') : [];
                                newValues.push(item.value);
                                return field.onChange(newValues.join(','));
                            }
                            return field.onChange([...field.value, item.id]);
                        } else {
                            if (isString) {
                                let newValues = field.value ? field.value.split(',') : [];
                                newValues = newValues.filter((value: string) => value !== item.value);
                                return field.onChange(newValues.join(','));
                            }
                            return field.onChange(
                                field.value?.filter(
                                    (value: number) => value !== item.id
                                )
                            );
                        }
                    }}
                  />
                </FormControl>
                <FormLabel className="w-24">{item.value}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}

      <FormMessage />
    </FormItem>
  );
}

interface RadioGroupItemProps {
  field: any;
  data: any[];
  label: string;
}
export function FormRadioGroup({ field, data, label }: RadioGroupItemProps) {
  return (
    <FormItem className="space-y-3">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-1"
        >
          {data.map((item) => (
            <FormItem
              key={item.id}
              className="flex items-center space-x-3 space-y-0"
            >
              <FormControl>
                <RadioGroupItem value={item.value} />
              </FormControl>
              <FormLabel className="font-normal">{item.value}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
