'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function getAppointments(appointmentID: string){
      
    const session = await getServerSession(authOptions);  
    if(!session?.user.token){
        throw new Error("No User Found");
    }
    const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/appointments/${appointmentID}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${session.user.token}`,
        },
    });
      
    if(!response.ok){
        throw new Error("Unable to fetch appointment");
    }
    return await response.json();
}