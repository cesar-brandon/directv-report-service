import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceReportSchema } from "@/lib/validators/service-report";
import { ReportFormBasicInfo } from "./form-basic-info";
import { ReportFormServiceInfo } from "./form-service-info";
import { ReportFormObservation } from "./form-observation";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { ClientReportForm } from "./client-report-form";
import { Input } from "../ui/input";

interface Props {
  user: any;
  onSubmit: (data: z.infer<typeof ServiceReportSchema>) => void;
  step: number;
}

export function TechnicianReportForm({ user, onSubmit, step }: Props) {
  const form = useForm<z.infer<typeof ServiceReportSchema>>({
    resolver: zodResolver(ServiceReportSchema),
    defaultValues: {
      employeeId: user?.id,
      customerId: "",
      companyId: user?.installationCompany?.id,
      services: [],
      training: "",
      closureInfo: "",
      products: [
        {
          id: "",
          quantity: 0,
        },
      ],
      technicianObservations: "",
      customerObservations: "",
      signature: "",
    },
  });

  return (
    <Form {...form}>
      <form id="add-report-form" onSubmit={form.handleSubmit(onSubmit)}>
        {/* <Button onClick={() => console.log(form.getValues())}>Log</Button> */}
        <div className="flex flex-col gap-6 mb-20">
          <div className="absolute flex w-[20%] right-0 top-[6rem] gap-4">
            <Input
              value={new Date().toLocaleDateString()}
              className="bg-muted my-2 w-[50%]"
              disabled
            />
          </div>
          {step === 1 && (
            <>
              <ReportFormBasicInfo user={user} form={form} />
              <ReportFormServiceInfo form={form} />
              <ReportFormObservation form={form} />
            </>
          )}
          {step === 2 && <ClientReportForm form={form} />}
        </div>
      </form>
    </Form>
  );
}
