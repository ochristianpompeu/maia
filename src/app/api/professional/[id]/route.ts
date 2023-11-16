import { connectMongoDB } from "@/lib/mongodb";
import { Professional } from "@/models/professional";
import { NextResponse } from "next/server";

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const { newName: name, newDescription: description } = await request.json();
//   await connectMongoDB();

//   await Organization.findByIdAndUpdate(id, {
//     name: name,
//     description: description,
//   });
//   return NextResponse.json(
//     {
//       message: "Organização atualizada",
//     },
//     {
//       status: 200,
//     }
//   );
// }

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
