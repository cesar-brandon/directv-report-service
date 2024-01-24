import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const reportService = await db.serviceReport.create({
      data: {
        employeeId: body.employeeId,
        customerId: body.customerId,
        companyId: body.companyId,
        technicianObservations: body.technicianObservations,
        customerObservations: body.customerObservations,
        training: body.training,
        closureInfo: body.closureInfo,

        services: {
          create: body.services.map((service: any) => ({
            serviceId: service,
          })),
        },
        products: {
          create: body.products.map((product: any) => ({
            quantityUsed: product.quantity,
            productId: product.id,
          })),
        },
      },
    });

    const customer = await db.customer.update({
      where: {
        id: body.customerId,
      },
      data: {
        signature: body.signature,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
