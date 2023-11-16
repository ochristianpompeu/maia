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
      orgId: string;
    };
  }
) {
  interface LocalServices extends ServiceProps {
    org: OrgProps;
  }

  const { orgId } = params;

  await connectMongoDB();

  const services = await Service.find({
    orgId: orgId,
  });
  const localServices: LocalServices[] = [];

  for (const service of services) {
    const res = await Organization.findById(service.orgId);
    localServices.push({
      _id: service._id,
      name: service.name,
      description: service.description,
      org: res,
    });
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
