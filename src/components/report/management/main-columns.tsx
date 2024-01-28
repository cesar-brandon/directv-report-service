import { ColumnDef, RowData } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "react-query";

const PreviewPDF = React.lazy(() => import("@/components/preview-pdf"));

export const MainColumns: ColumnDef<RowData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="ml-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Informe
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("number")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dirección
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "district",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Distrito
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("district")}</div>,
  },
  {
    accessorKey: "serviceDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Informe
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const serviceDate = new Date(
        row.getValue("serviceDate")
      ).toLocaleDateString();

      return <div className="lowercase">{serviceDate}</div>;
    },
  },
  {
    accessorKey: "serviceStatus",
    header: ({ column }) => {
      return <Button variant="ghost">Estado</Button>;
    },
    cell: ({ row }) => {
      const [isLoading, setIsLoading] = React.useState(false);
      const [isOpen, setIsOpen] = React.useState(false);
      const status = row.getValue("serviceStatus") as string;
      const id = (row.original as { id: string }).id;

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
            queryClient.invalidateQueries('reports');
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
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="text-right">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-full lg:min-w-[45rem]">
              <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <PreviewPDF dataDetail={item as ReportServiceTable} />
              </Suspense>
            </SheetContent>
          </Sheet>
        </div>
      );
    },
  },
];
