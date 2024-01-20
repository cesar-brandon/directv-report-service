import { ClientSelectField } from "../client-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  form: any;
  user: any;
}

export function ReportFormBasicInfo({ form, user }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-bold mb-4">Información básica</p>
      <div className="flex flex-col gap-8 p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <ClientSelectField form={form} />

          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tecnico: </FormLabel>
                <FormControl>
                  <Input value={user.name} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compañia Instaladora: </FormLabel>
                <FormControl>
                  <Input value={user.installationCompany.name} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
