import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Props {
    id: string;
    status: string;
}

export function ReportStatusRow({ id, status }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

      const statusMapping: Record<string, string> = {
        PENDING: "PENDIENTE",
        COMPLETED: "COMPLETADO",
        CANCELED: "CANCELADO",
      };
      const displayStatus = statusMapping[status] || status;

      const handleStatusChange = async () => {
        setIsLoading(true);
        try {
          const result = await axios.put(`/api/report/${id}/status`, {
            status: status === "COMPLETED" ? "PENDING" : "COMPLETED",
          });
          if (result.status === 201) {
            toast({
              title: "Éxito",
              description: "Se actualizó el estado correctamente",
            });
            setIsOpen(false);
            queryClient.invalidateQueries("reports");
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Ocurrió un error al actualizar el estado",
          });
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <div className="capitalize cursor-pointer">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "COMPLETED"
                ? "bg-green-100 text-green-800"
                : status === "CANCELED"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {displayStatus}
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de cambiar el Estado?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción cambiara el estado del informe
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={handleStatusChange} disabled={isLoading}>
            Continuar
            {isLoading && <Loader2 className="ml-2 h-4 w-4" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
