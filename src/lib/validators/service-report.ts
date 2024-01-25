import { z } from "zod";

export const InventorySchema = z.object({
  id: z.string().min(1, {
    message: "Debe seleccionar un producto",
  }),
  quantity: z.number().min(1, {
    message: "Debe ingresar una cantidad válida",
  }),
});

export const ServiceReportSchema = z.object({
  employeeId: z.string(),
  customerId: z.string().min(1, {
    message: "Debe seleccionar un cliente",
  }),
  companyId: z.string(),

  services: z.string().array().nonempty({
    message: "Debe seleccionar al menos un servicio",
  }),
  training: z
    .string()
    .min(1, { message: "Debe seleccionar al menos una opción" }),
  closureInfo: z
    .string()
    .min(1, { message: "Debe seleccionar al menos una opción" }),
  products: z.array(InventorySchema),

  technicianObservations: z.string().optional(),
  customerObservations: z.string().optional(),
  signature: z.string().min(1, {
    message: "Debe ingresar una firma",
  }),
});
