import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  userId?: string;
  companyId?: string;
}

const POST = async (request: Request) => {
  const body: RequestBody = await request.json();

  let userAssociated = null;

  if (body.userId) {
    userAssociated = await db.user.findFirst({
      where: {
        id: body.userId
      },
    });
  }

  try {

    if (!userAssociated || userAssociated === null) {
      const user = await db.user.create({
        data: {
          name: body.name,
          username: body.username,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
          role: body.role,
          installationCompanyId: body.companyId,
        },
      });

      const { password, ...result } = user;
      return new Response(JSON.stringify(result));
    }

    const user = await db.user.update({
      where: {
        id: body.userId
      },
      data: {
        name: body.username,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }

};

export { POST };