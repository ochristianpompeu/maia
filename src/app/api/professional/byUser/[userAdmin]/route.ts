import { LocalProfessionals } from "@/lib/interfaces";
import { connectMongoDB } from "@/lib/mongodb";
import { Organization } from "@/models/organization";
import { Professional } from "@/models/professional";
import { Service } from "@/models/service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      userAdmin: string;
    };
  }
) {
  const { userAdmin } = params;

  await connectMongoDB();

  const orgs = await Organization.find({
    userAdmin: userAdmin,
  });

  const localProfessionals: LocalProfessionals[] = [];

  for (const org of orgs) {
    const professionals = await Professional.find({
      orgId: org._id,
    });

    const services = await Service.find({
      orgId: org._id,
    });

    for (const professional of professionals) {
      localProfessionals.push({
        _id: professional._id,
        name: professional.name,
        email: professional.email,
        image: professional.image,
        bio: professional.bio,
        orgId: professional.orgId,
        org: org,
        services: professional.services,
        localServices: services,
        completeServices: professional.completeServices,
        createdAt: professional.createdAt,
        updatedAt: professional.updatedAt,
      });
    }
  }
  return NextResponse.json(
    {
      localProfessionals,
    },
    {
      status: 200,
    }
  );
}
