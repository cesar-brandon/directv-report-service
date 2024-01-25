import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useQuery } from "react-query";
import { ScrollArea } from "./ui/scroll-area";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface Props {
  form: any;
}

async function getServices() {
  const res = await axios.get("/api/services");
  return res.data;
}

export function ServiceComboboxMulti({ form }: Props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<string[]>([]);

  const { data, isLoading } = useQuery("services", getServices);

  const handleSelect = (selectedValue: string) => {
    const newValue = [...values]; // Cambio de onSelectCategory a values
    const index = newValue.indexOf(selectedValue);
    if (index === -1) {
      newValue.push(selectedValue);
    } else {
      newValue.splice(index, 1);
    }
    setValues(newValue);
    form.setValue("services", newValue);
  };

  const handlePopoverToggle = () => {
    setOpen(!open);
  };

  const selectedLabels = values.map(
    (value) => data.find((item: Service) => item.id === value)?.label || ""
  );
  return (
    <FormField
      control={form.control}
      name="services"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-1">Servicios:</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                  onClick={handlePopoverToggle}
                >
                  {selectedLabels.length > 0
                    ? `${selectedLabels.length} elementos seleccionados`
                    : "Selecciona los elementos..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] md:w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Busca los elementos..."
                  isLoading={isLoading}
                />
                <CommandEmpty>No hay elementos.</CommandEmpty>
                <CommandGroup className="h-40">
                  <ScrollArea className="w-full h-40">
                    {data &&
                      data.map((item: Service) => (
                        <CommandItem
                          key={item.id}
                          value={item.serviceName}
                          onSelect={() => handleSelect(item.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              values.includes(item.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.serviceName}
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
