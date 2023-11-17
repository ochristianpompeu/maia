import { connectMongoDB } from "@/lib/mongodb";
import { Professional } from "@/models/professional";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, image, bio, func, orgId, services, completeServices } =
    await request.json();

  await connectMongoDB();

  await Professional.create({
    name: name,
    email: email,
    image: image,
    bio: bio,
    function: func,
    orgId: orgId,
    services: services,
    completeServices: completeServices,
  });

  return NextResponse.json(
    {
      postMessage: "Profissional cadastrado",
    },
    {
      status: 201,
    }
  );
}

export async function GET() {
  await connectMongoDB();
  const localProfessionals = await Professional.find();

  return NextResponse.json({
    localProfessionals,
  });
}

export async function DELETE(request: NextRequest) {
  const profId = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Professional.findByIdAndDelete(profId);
  return NextResponse.json(
    {
      message: "Profissional removido",
    },
    {
      status: 200,
    }
  );
}
