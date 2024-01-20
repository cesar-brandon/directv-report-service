"use client";

import { ServiceReportSchema } from "@/lib/validators/service-report";
import { useState } from "react";
import { z } from "zod";
import { TechnicianReportForm } from "./technician-report-form";
import { User } from "@prisma/client";
import { ReportFormFooter } from "./report-form-footer";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export function ReportForm({ user }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [step, setStep] = useState(1);

  const router = useRouter();

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: z.infer<typeof ServiceReportSchema>) => {
    setIsPending(true);
    try {
      const result = await axios.post("/api/report/create", data);
      if (result.status === 200) {
        toast({
          title: "Reporte creado",
          description: "El reporte se ha creado correctamente",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al crear el reporte",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <TechnicianReportForm step={step} user={user} onSubmit={onSubmit} />
      <ReportFormFooter
        step={step}
        nextStep={nextStep}
        previousStep={previousStep}
        isPending={isPending}
      />
    </>
  );
}
