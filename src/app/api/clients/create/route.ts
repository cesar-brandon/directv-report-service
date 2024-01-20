import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

const POST = async (request: Request) => {
  const body = await request.json();

//   const session = await getAuthSession();

//   if (!session) {
//     return new Response("Unauthorized", { status: 401 });
//   }

  try {
    const customer = await db.customer.create({
      data: {
        name: body.name,
        address: body.address,
        district: body.district,
        email: body.email,
        cellNumber: body.phone,
        subscriptionDate: new Date(),
      },
    });

    return new Response(JSON.stringify(customer));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export { POST };
