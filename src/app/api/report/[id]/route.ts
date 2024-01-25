import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const reportDetails = await db.serviceReport.findUnique({
      where: { id: params.id },
      include: {
        employee: {
          include: {
            InstallationCompany: true,
          },
        },
        company: true,
        customer: true,
        services: {
          select: {
            service: {
              select: {
                id: true,
                code: true,
                serviceName: true,
                woNumber: true,
              },
            },
          },
        },
        products: {
          select: {
            product: {
              select: {
                id: true,
                item: true,
              },
            },
            quantityUsed: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(reportDetails));
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
