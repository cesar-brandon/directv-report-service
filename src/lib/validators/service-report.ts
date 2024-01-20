import { z } from "zod";

export const InventorySchema = z.object({
  id: z.string(),
  quantity: z.number(),
});

export const ServiceReportSchema = z.object({
  number: z.number(),
  serviceDate: z.string(),
  employeeId: z.string(),
  customerId: z.string().min(1, {
    message: "Debe seleccionar un cliente",
  }),
  companyId: z.string(),

  services: z.array(z.string()),
  training: z
    .string()
    .min(1, { message: "Debe seleccionar al menos una opción" }),
  closureInfo: z
    .string()
    .min(1, { message: "Debe seleccionar al menos una opción" }),
  products: z.array(InventorySchema).optional(),

  technicianObservations: z.string().optional(),
  customerObservations: z.string().optional(),
  signature: z.string().optional(),
});
