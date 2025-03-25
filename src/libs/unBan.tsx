'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function unBan(UserID: string) {

      const session = await getServerSession(authOptions);  
            if(!session?.user.token){
                  throw new Error("No User Found");
            }
            if(session.user.role !== 'admin'){
                  throw new Error("Unauthorized Access");
            }
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/users/${UserID}/bans`, {
            method: "PUT",
            headers: {
                  authorization: `Bearer ${session.user.token}`,
            },
      });
      return await response.json();
}