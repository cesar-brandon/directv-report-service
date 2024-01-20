import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const reports = await db.serviceReport.findMany();

    return new Response(JSON.stringify(reports));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
