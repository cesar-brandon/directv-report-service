import { Button } from "../ui/button";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface Props {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
}

export function ReportFormFooter({
  step,
  nextStep,
  previousStep,
  isPending,
}: Props) {
  return (
    <div className="fixed w-full sm:right-0 bottom-0 bg-background flex gap-4 sm:justify-end py-4 px-0 sm:px-20 xl:px-40">
      <Link href="/">
        <Button variant="outline" className="relative">
          Cancelar
        </Button>
      </Link>

      {step === 1 && (
        <div>
          <Button className="relative" onClick={nextStep}>
            Siguiente
            <ChevronRight className="ml-2 w-5" />
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="relative border-primary text-primary hover:bg-primary hover:text-background"
            onClick={previousStep}
          >
            <ChevronLeft className="mr-2 w-5" />
            Anterior
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            form="add-report-form"
            className="relative"
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Agregar
            <Check className="ml-2 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
