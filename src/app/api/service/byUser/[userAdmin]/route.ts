import { OrgProps, ServiceProps } from "@/lib/interfaces";
import { connectMongoDB } from "@/lib/mongodb";
import { Organization } from "@/models/organization";
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
  interface LocalServices extends ServiceProps {
    userAdmin: string;
    org: OrgProps;
  }

  const { userAdmin } = params;

  await connectMongoDB();

  const orgs = await Organization.find({
    userAdmin: userAdmin,
  });

  const localServices: LocalServices[] = [];

  for (const org of orgs) {
    const services = await Service.find({
      orgId: org._id,
    });
    for (const service of services) {
      localServices.push({
        _id: service._id,
        name: service.name,
        description: service.description,
        org: org,
        userAdmin: userAdmin,
      });
    }
  }
  return NextResponse.json(
    {
      localServices,
    },
    {
      status: 200,
    }
  );
}
