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
    });

    return new Response(JSON.stringify(reportDetails));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
