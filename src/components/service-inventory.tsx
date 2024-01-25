import { useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "react-query";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ProductCombobox } from "./product-combobox";

async function getProducts() {
  const res = await axios.get("/api/products");
  return res.data;
}

interface Props {
  form: any;
}

export function ServiceInventory({ form }: Props) {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const { data, isLoading } = useQuery("products", getProducts);

  return (
    <div className="grid grid-flow-col col-span-2 ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <ProductCombobox
                key={index}
                form={form}
                field={field}
                index={index}
                data={data}
                isLoading={isLoading}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`products.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad:</FormLabel>
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
