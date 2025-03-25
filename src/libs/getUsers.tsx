'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function getUsers(page?:number, limit?:number) {

      const session = await getServerSession(authOptions);  
            if(!session?.user.token){
                  throw new Error("No User Found");
            }
            if(session.user.role !== 'admin'){
                  throw new Error("Unauthorized Access");
            }
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/users?page=${page??1}&&limit=${limit??25}`, {
            method: "GET",
            headers: {
                  authorization: `Bearer ${session.user.token}`,
            },
      });
      if(!response.ok){
            console.log(response);
            throw new Error("Failed to fetch users");
      }
      return await response.json();
}