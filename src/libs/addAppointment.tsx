'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function addAppointment(companyID: string, startDate: Date, endDate: Date){
      
      const session = await getServerSession(authOptions);
      if(!session?.user.token){
            throw new Error("No User Found");
      }
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/companies/${companyID}/appointments`, {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
                  startTime: startDate,
                  endTime: endDate,
                  user: session.user._id,
            }),
      });

      if(!response.ok){
            throw new Error("Unable to add appointment");
      }
      return await response.json();
}