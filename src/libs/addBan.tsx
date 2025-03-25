'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function addBan(UserID: string) {

      const session = await getServerSession(authOptions);  
            if(!session?.user.token){
                  throw new Error("No User Found");
            }
            if(session.user.role !== 'admin'){
                  throw new Error("Unauthorized Access");
            }
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/users/${UserID}/bans`, {
            method: "POST",
            headers: {
                  authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
                  bannedAt: new Date(Date.now()),
                  endTime: new Date(Date.now() + 7*24*60*60*1000)
            }),
      });
      return await response.json();
}