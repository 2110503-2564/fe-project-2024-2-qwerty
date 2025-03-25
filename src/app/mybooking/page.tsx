'use client'

import deleteAppointment from "@/libs/deleteAppointment";
import getAppointments from "@/libs/getAppointments";
import updateAppointment from "@/libs/updateAppointment";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function List(){
    const [change, setChange] = useState(false);
    const [changeData, setChangeData] = useState(false);
    const [data, setData] = useState<AppointmentJson>();
    const [editMode, setEditMode] = useState<Map<string, boolean>>(new Map<string, boolean>());
    useEffect(() => {
        getAppointments(undefined).then((data)=>{
            setData(data);
        });
    },[changeData]);
    if(!data){
        return (<div className="text-center">Loading...</div>);
    }
    const updateFunction = (id:string, start:Date|undefined, end:Date|undefined) => {
        updateAppointment(id, start, end);
        setChangeData(!changeData);
    }
    const deleteFunction = (id:string) => {
        deleteAppointment(id);
        setChangeData(!changeData);
    }
    const json = data;
    return (
        <div>
            <h2 className="text-center text-2xl my-5">Total of {json.count} Appointments</h2>
            <div style = {{margin:"20px", display:"flex", flexDirection:"column", padding:"10px"}}>
            {(json.count == 0)?"No Companies":json.data.map((item) => (
            <div className={`w-full rounded px-5 py-2 my-2 flex flex-row border-2 border-black shadow-lg`} style={{backgroundColor: `${editMode.get(item._id)?'lightgreen':'lavender'}`}}key={item._id}>
                <div className="w-[90%] flex flex-col space-y-5"> 
                    <div className="text-md">UserID: {item.user}</div>
                    <div className="text-md">Company: {item.company.name}</div>
                    <div className="text-md">StartTime: {editMode?.get(item._id)?<LocalizationProvider dateAdapter={AdapterDayjs}><DateTimePicker maxDateTime={dayjs(item.endTime)} className="bg-white" onAccept={(val)=>{if(val){updateFunction(item._id, val.toDate(), undefined)}}}></DateTimePicker></LocalizationProvider>:(new Date(item.startTime)).toLocaleString()}</div>
                    <div className="text-md">EndTime: {editMode?.get(item._id)?<LocalizationProvider dateAdapter={AdapterDayjs}><DateTimePicker minDateTime={dayjs(item.startTime)} className="bg-white" onAccept={(val)=>{if(val){updateFunction(item._id, undefined, val.toDate())}}}></DateTimePicker></LocalizationProvider>:(new Date(item.endTime)).toLocaleString()}</div>
                </div>
                <div className="w-[10%] flex flex-col justify-center items-center space-y-5">
                    <button className="text-white bg-blue-400 rounded-md border-2 border-black border-solid w-[100px] h-[40px] shadow-md hover:bg-blue-300" onClick={()=>{setEditMode(editMode?.set(item._id, !editMode.get(item._id)));setChange(!change)}}>Edit</button>
                    <button className="text-white bg-red-500 rounded-md border-2 border-black border-solid w-[100px] h-[40px] shadow-md hover:bg-red-400" onClick={()=>{deleteFunction(item._id)}}>Delete</button>
                </div>
            </div>
            ))}
            </div>
        </div>
    );
}