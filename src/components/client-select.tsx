"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, simplifyName } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  form: any;
}

async function getClients() {
  const res = await axios.get("/api/clients");
  return res.data;
}

export function ClientSelectField({ form }: Props) {
  const [open, setOpen] = useState(false);

  const { data: clients, isLoading } = useQuery<Client[]>(
    "clients",
    getClients
  );

  return (
    <FormField
      control={form.control}
      name="customerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cliente:</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between relative"
              >
                {field.value && clients
                  ? clients.find((client) => client.id === field.value)?.name
                  : "Selecciona un cliente"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  isLoading={isLoading}
                  placeholder="Buscar clientes"
                />
                <CommandEmpty>No hay elementos.</CommandEmpty>
                <CommandGroup className="h-40">
                  <ScrollArea className="w-full h-40">
                    {clients &&
                      clients.map((client) => (
                        <CommandItemClient
                          key={client.id}
                          client={client}
                          form={form}
                          setOpen={setOpen}
                          field={field}
                        />
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

interface CommandItemClientProps {
  client: Client;
  form: any;
  setOpen: (open: boolean) => void;
  field: any;
}

function CommandItemClient({
  client,
  form,
  setOpen,
  field,
}: CommandItemClientProps) {
  return (
    <CommandItem
      value={client.name}
      key={client.id}
      onSelect={() => {
        form.setValue("clientId", client.id);
        field.onChange(client.id);
        if(client.signature !== null) {
          form.setValue("signature", "firmado");
        }
        setOpen(false);
      }}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          client.id.toString() === field.value ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            src={client.image}
            alt="user profile image"
            className="object-cover"
          />
          <AvatarFallback>{simplifyName(client.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{client.name}</p>
          <p className="text-sm text-muted-foreground truncate">
            {client.district}
          </p>
        </div>
      </div>
    </CommandItem>
  );
}
