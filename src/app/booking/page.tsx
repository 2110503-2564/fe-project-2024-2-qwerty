'use client'

import DateReserve from "@/components/DateReserve";
import { Autocomplete, Button, MenuItem, Select, TextField } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { Dayjs } from "dayjs";
import getCompanies from "@/libs/getCompanies";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import addAppointment from "@/libs/addAppointment";

export default function booking(){

    // const session = await getServerSession(authOptions);
    // let node = null;
    // if(session && session.user.token) {
    //     const profile = await getUserProfile(session.user.token);
    //     var createdAt = new Date(profile.data.createdAt);
    //     node = (
    //         <div className = "w-[100%] flex flex-col items-center space-y-4 pb-10 pt-3">
    //          <div className = "text-xl font-medium">User Profile</div>
    //          <table className = "table-auto border-separate border-spacing-y-2 border-spacing-x-7 bg-slate-100 rounded-lg space-x-10 px-5 py-5 flex flex-row justify-center">
    //          <tbody>
    //              <tr>
    //                  <td>Name</td>
    //                  <td>{profile.data.name}</td>
    //              </tr>
    //              <tr>
    //                  <td>Email</td>
    //                  <td>{profile.data.email}</td>
    //              </tr>
    //              <tr>
    //                  <td>Tel</td>
    //                  <td>{profile.data.tel}</td>
    //              </tr>
    //              <tr>   
    //                  <td>Member Since</td>
    //                  <td>{createdAt.toString()}</td>
    //              </tr>
    //          </tbody>
    //          </table>
    //      </div>
    //     );
    // }

    // const [name, setName] = useState("");
    // const [contact, setContact] = useState("");
    // const [venue, setVenue] = useState("Bloom");
    // const [bookDate, setBookDate] = useState<Dayjs|null>(null);

    // const bookVenue = () => {
    //     if(name && contact && venue && bookDate){
    //         const item:BookingItem = {
    //         nameLastname: name,
    //         tel: contact,
    //         venue: venue,
    //         bookDate: bookDate?.toString()??""
    //         }
    //         dispatch(addBooking(item));
    //     }
    // };

    const [errMsg, setErrMsg] = useState<React.ReactNode>(null);

    const [fullData, setFullData] = useState<CompanyJson>();
    useEffect(() => {
        getCompanies(1, 999).then((data)=>{setFullData(data)});
    },[]);

    const [startTime, setStartTime] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const [company, setCompany] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const bookInterview = async () => {
        if(startTime && endTime && company){
            if(startTime > endTime){
                setErrMsg(<p className="text-red-400 text-sm max-w-fits text-wrap">You cannot have Start Date after End Date.</p>);
            }else{
                const res = await addAppointment(company, startTime, endTime);
                if(res.success){
                    setErrMsg(<p className="text-green-400 text-sm max-w-fits text-wrap">Success.</p>);
                }else{
                    setErrMsg(<p className="text-red-400 text-sm max-w-fits text-wrap">{res.msg}.</p>);
                }
            }
            
        }else{
            setErrMsg(<p className="text-red-400 text-sm max-w-fits text-wrap">Please fill in all of the fields.</p>);
        }
    };

    if(!fullData){
        return (<div className="text-center">Loading...</div>);
    }
    const companyList = fullData.data;
    if(company == ''){
        setCompany(companyList[0]._id);
    }

    return (
        <main className = "w-[100%] flex flex-col items-center space-y-4">
            <div className = "text-xl font-medium">Book An Interview</div>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <div className = "w-fits space-y-2">
                    <div className = "bg-slate-100 rounded-lg w-full px-10 py-5 flex flex-col justify-center">
                        <h4 className="text-xs">Company</h4>
                        <div className="w-fits flex justify-center pb-2">
                        <Select variant="standard" id = "venue" value = {companyList[0]._id} onChange = {(e) => setCompany(e.target.value)} className = "h-[2em] w-[250px]">
                            {companyList.map((comp) => (<MenuItem key = {comp._id} value = {comp._id}>{comp.name}</MenuItem>))}
                        </Select>
                        </div>
                        <div className="pt-2">
                            <h4 className="text-xs">Start Date</h4>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker onChange={(e)=>setStartTime(e?.toDate())}></DateTimePicker>
                            </LocalizationProvider>
                        </div>
                        <div className="pt-2 pb-5">
                            <h4 className="text-xs">End Date</h4>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker onChange={(e)=>setEndTime(e?.toDate())}></DateTimePicker>
                            </LocalizationProvider>
                        </div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white" name = "Book Interview" onClick={()=>{bookInterview();}}>Book Interview</button>
                    </div>
                    <div className="flex justify-center max-w-[335px] text-wrap text-center">{errMsg}</div>
                </div>
            </form>
        </main>
    );
}