import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const reports = await db.serviceReport.findMany({
      select: {
        id: true,
        number: true,
        serviceDate: true,
        serviceStatus: true,
        customer: {
          select: {
            name: true,
            address: true,
            district: true,
          },
        },
      },
    });

    const flattenedReports = reports.map((report) => {
      const { customer, ...otherProps } = report;
      return { ...otherProps, ...customer };
    });

    return new Response(JSON.stringify(flattenedReports));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
