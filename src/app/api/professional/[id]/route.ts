import { connectMongoDB } from "@/lib/mongodb";
import { Professional } from "@/models/professional";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    newName: name,
    newEmail: email,
    newImage: image,
    newBio: bio,
    newFunc: func,
    newOrgId: orgId,
    newServices: services,
  } = await request.json();
  await connectMongoDB();

  await Professional.findByIdAndUpdate(id, {
    name: name,
    orgId: orgId,
    bio: bio,
    email: email,
    function: func,
    image: image,
    services: services,
  });
  return NextResponse.json(
    {
      message: "Profissional atualizado",
    },
    {
      status: 200,
    }
  );
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  await connectMongoDB();
  const professional = await Professional.findOne({
    _id: id,
  });
  return NextResponse.json({ professional }, { status: 200 });
}
