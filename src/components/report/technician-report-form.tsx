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
      number: 0,
      serviceDate: new Date().toLocaleDateString(),
      employeeId: user?.id,
      customerId: "",
      companyId: user?.installationCompany?.id,
      services: [],
      training: "",
      closureInfo: "",
      products: [],
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
          <div className="absolute flex w-[20%] right-[5rem] xl:right-[11.5rem] top-[5rem]">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="p-2 w-[50%] mb-8">
                  <FormControl>
                    <Input className="bg-muted" disabled type="text" value="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceDate"
              render={({ field }) => (
                <FormItem className="p-2 w-[50%] mb-8">
                  <FormControl>
                    <Input className="bg-muted" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
