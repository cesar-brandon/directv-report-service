import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const session = await getAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await db.serviceReport.update({
      where: { id: params.id },
      data: {
        serviceStatus: body.status,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
