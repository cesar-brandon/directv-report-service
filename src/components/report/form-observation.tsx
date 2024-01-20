import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface Props {
  form: any;
}

export function ReportFormObservation({ form }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-bold mb-4">Observaciones del Tecnico</p>
      <div className="flex flex-col gap-8 p-4">
        <FormField
          control={form.control}
          name="technicianObservations"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Escribe tus observaciones"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
