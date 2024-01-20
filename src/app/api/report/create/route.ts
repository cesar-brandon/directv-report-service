import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  //   {
  //     "number": 0,
  //     "serviceDate": "18/1/2024",
  //     "employeeId": "clrjo93tf0001e49r7qgz5fqi",
  //     "customerId": "clrikv5i30000lqe8b5wggndz",
  //     "companyId": "clrjo3xo0000008l95xbh1ilc",
  //     "services": [
  //         "clrj1fmbj000008l47paddcx2",
  //         "clrj19a0y000308la5iya2h9z",
  //         "clrj1fmbj000008l47paddcxl",
  //         "clrj1930d000108lacfxt2393"
  //     ],
  //     "training": "Directv GO,Grabación",
  //     "closureInfo": "Call Center",
  //     "products": [
  //         {
  //             "id": "5",
  //             "quantity": 12
  //         }
  //     ],
  //     "technicianObservations": "sdfsdf",
  //     "customerObservations": "dadasdasda",
  //     "signature": "",
  //     "clientId": "clrikv5i30000lqe8b5wggndz"
  // }

  try {
    const reportService = db.serviceReport.create({
      data: {
        employeeId: body.employeeId,
        customerId: body.customerId,
        companyId: body.companyId,
        serviceDate: new Date(body.serviceDate),
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

    const customer = db.customer.update({
      where: {
        id: body.customerId,
      },
      data: {
        signature: body.signature,
      },
    });
    console.log(reportService);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
