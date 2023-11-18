import { connectMongoDB } from "@/lib/mongodb";
import { Hour } from "@/models/hour";
import { NextResponse } from "next/server";

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
    status,
    clientId,
    client,
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
    status: status,
    clientId: clientId,
    client: client,
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

  //   if (!hours) {
  //     return NextResponse.json({
  //       hours: [{}],
  //     });
  //   }

  return NextResponse.json({
    hours,
  });
}
