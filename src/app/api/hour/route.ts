import { connectMongoDB } from "@/lib/mongodb";
import { Hour } from "@/models/hour";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    day,
    interval,
    orgId,
    org,
    serviceId,
    service,
    professionalId,
    professional,
    userAdmin,
  } = await request.json();

  await connectMongoDB();

  const newHour = {
    day: day,
    interval: interval,
    orgId: orgId,
    org: org,
    serviceId: serviceId,
    service: service,
    professionalId: professionalId,
    professional: professional,
    userAdmin: userAdmin,
  };

  const hour = await Hour.create(newHour);

  return NextResponse.json(
    {
      hour,
    },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();

  const hours = await Hour.find();

  return NextResponse.json({
    hours,
  });
}

export async function DELETE(request: NextRequest) {
  const hourId = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Hour.findByIdAndDelete(hourId);
  return NextResponse.json({ message: "Horário removido." }, { status: 200 });
}
