import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest, { params } : { params :{userId: string}} ) {
    const session = await getServerSession(authOptions);

    const userId = params.userId;

    if(!session) {
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }

    const user = await prisma.user.findUnique({
       where: {id:userId} 
    })

    if(!user) {
        return NextResponse.json({message:"User not found!"},{status:402})
    }

    return NextResponse.json(user, {status:200})

}
 