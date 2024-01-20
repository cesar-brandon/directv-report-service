import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const clients = await db.customer.findMany();

    return new Response(JSON.stringify(clients));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
