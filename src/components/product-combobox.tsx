import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  form: any;
  field: any;
  index: number;
  data: Product[];
  isLoading: boolean;
}

export function ProductCombobox({
  form,
  field,
  index,
  data,
  isLoading,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <FormField
      control={form.control}
      key={field.id}
      name={`products.${index}.id`}
      render={({ field }) => (
        <FormItem className="flex flex-col mt-[0.65rem]">
          <FormLabel>Producto:</FormLabel>
          <Popover key={index} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[21rem] justify-between"
              >
                {value
                  ? data && data.find((item) => item.id === value)?.item
                  : "Seleccionar elemento..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar elemento..."
                  isLoading={isLoading}
                />
                <CommandEmpty>No hay elementos.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="w-full h-40">
                    {data &&
                      data.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.id}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            form.setValue(
                              `products.${index}.id`,
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(!open);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === item.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {item.item}
                        </CommandItem>
                      ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
