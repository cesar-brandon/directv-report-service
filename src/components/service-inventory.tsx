import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useQuery } from "react-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

async function getProducts() {
  const res = await axios.get("/api/products");
  return res.data;
}

interface Props {
  form: any;
}

export function ServiceInventory({ form }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const { data, isLoading } = useQuery<Product[]>("products", getProducts);

  return (
    <div className="grid grid-flow-col col-span-2 ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3">
            <Label>Productos:</Label>
            {fields.map((field, index) => (
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
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === item.id
                                    ? "opacity-100"
                                    : "opacity-0"
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
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Label>Cantidad:</Label>

            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`products.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-[8rem]"
                        min={1}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={() => append({ id: "", quantity: 0 })}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
