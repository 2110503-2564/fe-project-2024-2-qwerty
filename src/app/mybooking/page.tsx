'use client'

import deleteAppointment from "@/libs/deleteAppointment";
import getAppointments from "@/libs/getAppointments";
import { useEffect, useState } from "react";

export default function List(){
    const [change, setChange] = useState(false);
    const [data, setData] = useState<AppointmentJson>();
    useEffect(() => {
        getAppointments().then((data)=>{setData(data)});
    },[change]);
    if(!data){
        return (<div className="text-center">Loading...</div>);
    }
    const deleteFunction = (id:string) => {
        deleteAppointment(id);
        setChange(!change);
    }
    const json = data;
    return (
        <div>
            <h2 className="text-center text-xl">Total of {json.count} Appointments</h2>
            <div style = {{margin:"20px", display:"flex", flexDirection:"column", padding:"10px"}}>
            {(json.count == 0)?"No Companies":json.data.map((item) => (
            <div className="w-full bg-slate-200 rounded px-5 py-2 my-2 flex flex-row" key={item._id}>
                <div className="w-[90%]"> 
                    <div className="text-md">UserID: {item.user}</div>
                    <div className="text-md">Company: {item.company.name}</div>
                    <div className="text-md">StartTime: {item.startTime.toString()}</div>
                    <div className="text-md">EndTime: {item.endTime.toString()}</div>
                </div>
                <div className="w-[10%] flex flex-col justify-center items-center space-y-3">
                    <button className="text-white bg-blue-400 rounded-md border-2 border-black border-solid w-[100px] h-[40px] shadow-md hover:bg-blue-300">Edit</button>
                    <button className="text-white bg-red-500 rounded-md border-2 border-black border-solid w-[100px] h-[40px] shadow-md hover:bg-red-400" onClick={()=>{deleteFunction(item._id)}}>Delete</button>
                </div>
            </div>
            ))}
            </div>
        </div>
    );
}