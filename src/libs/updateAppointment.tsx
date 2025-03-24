'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getAppointments from "./getAppointments";
import getAppointment from "./getAppointment";

export default async function updateAppointment(appointmentID: string, startDate: Date|undefined, endDate: Date|undefined){
      
      const session = await getServerSession(authOptions);
      if(!session?.user.token){
            throw new Error("No User Found");
      }
      const appt = (await getAppointment(appointmentID)).data;
      appt.startTime = startDate??appt.startTime;
      appt.endTime = endDate??appt.endTime;
      
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/appointments/${appointmentID}`, {
            method: "PUT",
            headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify(appt),
      });

      if(!response.ok){
            console.log('----------------------------------------');
            console.log(response);
            console.log('----------------------------------------');
            console.log(await (response.json()));

            throw new Error("Unable to update appointment");
      }
      return await response.json();
}