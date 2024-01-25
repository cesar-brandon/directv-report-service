import SignatureCanvas from "../signature-canvas";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface Props {
  form: any;
}

export function ClientReportForm({form}: Props) {
  return (
    <section className="p-4 border rounded-lg">
      <h3 className="font-bold mb-4">Información del Cliente</h3>
      <div className="flex flex-col gap-8 p-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Observaciones</Label>
          <Textarea
            placeholder="Escribe tus observaciones aquí."
            {...form.register("customerObservations")}
          />
        </div>
        <div>
          <Label>Firma</Label>
          <SignatureCanvas form={form}/>
        </div>
      </div>
    </section>
  );
}
