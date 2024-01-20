import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { uploadFiles } from "@/lib/uploadthing";

const POST = async (request: Request) => {
  const body = await request.json();

  const session = await getAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // const [uploadResponse] = await uploadFiles({
    //   endpoint: "imageUploader",
    //   files: body.files,
    // });

    // return new Response(JSON.stringify(uploadResponse.fileUrl));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export { POST };
