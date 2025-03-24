'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function deleteAppointment(appointmentID: string){
      
      const session = await getServerSession(authOptions);
      if(!session?.user.token){
            throw new Error("No User Found");
      }
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/appointments/${appointmentID}`, {
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session.user.token}`,
            }
      });
      if(!response.ok){
            throw new Error("Unable to delete appointment");
      }
      return await response.json();
}