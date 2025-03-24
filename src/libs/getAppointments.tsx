'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function getAppointments(companyID?: string){
      
      console.log("get");
      const session = await getServerSession(authOptions);  
      if(!session?.user.token){
            throw new Error("No User Found");
      }
      let response;
      if(companyID){
            response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/companies/${companyID}/appointments`, {
                  method: "GET",
                  headers: {
                        authorization: `Bearer ${session.user.token}`,
                  },
            });
      }else{
            response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/appointments`, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${session.user.token}`,
                  },
            });
      }

      if(!response.ok){
            console.log('----------------------------');
            console.log(response);
            console.log('----------------------------');
            throw new Error("Unable to fetch appointments");
      }
      return await response.json();
}