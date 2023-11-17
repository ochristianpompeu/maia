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
        orgId: professional.orgId,
        bio: professional.bio,
        email: professional.email,
        image: professional.image,
        services: professional.services,
        createdAt: professional.createdAt,
        updatedAt: professional.updatedAt,
        org: org,
        localServices: services,
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
