import { FormCheckboxGroup, FormRadioGroup } from "../form-items";
import { ServiceComboboxMulti } from "../service-combobox-multi";
import { ServiceInventory } from "../service-inventory";
import { FormField } from "../ui/form";
import { Label } from "../ui/label";
import { closureInfo, trainingData } from "./management/data";

interface Props {
  form: any;
}

export function ReportFormServiceInfo({ form }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-bold mb-4">Información de Servicio</p>
      <div className="flex flex-col gap-8 p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <Label>Servicios:</Label>
            <ServiceComboboxMulti form={form} />
          </div>
          <FormField
            control={form.control}
            name="training"
            render={() => (
              <FormCheckboxGroup
                data={trainingData}
                form={form}
                name="training"
                isString
              />
            )}
          />
          <FormField
            control={form.control}
            name="closureInfo"
            render={({ field }) => (
              <FormRadioGroup
                field={field}
                data={closureInfo}
                label="Cerrado por:"
              />
            )}
          />  
          <ServiceInventory form={form} />
        </div>
      </div>
    </div>
  );
}
