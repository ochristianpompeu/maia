import { connectMongoDB } from "@/lib/mongodb";
import { Hour } from "@/models/hour";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    newDay: day,
    newInterval: interval,
    newOrgId: orgId,
    newOrg: org,
    newServiceId: serviceId,
    newService: service,
    newProfessionalId: professionalId,
    newProfessional: professional,
    newUserAdmin: userAdmin,
  } = await request.json();
  await connectMongoDB();

  await Hour.findByIdAndUpdate(id, {
    day: day,
    interval: interval,
    orgId: orgId,
    org: org,
    serviceId: serviceId,
    service: service,
    professionalId: professionalId,
    professional: professional,
    userAdmin: userAdmin,
  });
  return NextResponse.json(
    {
      message: "Horário atualizado",
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
  const hour = await Hour.findOne({
    _id: id,
  });
  return NextResponse.json({ hour }, { status: 200 });
}
