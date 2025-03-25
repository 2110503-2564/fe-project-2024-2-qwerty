'use client'

import addBan from "@/libs/addBan";
import getBans from "@/libs/getBans";
import getUsers from "@/libs/getUsers";
import unBan from "@/libs/unBan";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersList({page}:{page:number}) {
    const [json, setJson] = useState<UserJson>();
    const [err, setErr] = useState(new Map<string, string>());
    const [banMap, setBanMap] = useState(new Map<string, boolean>());
    useEffect(() => {
        getUsers().then((data)=>{setJson(data)});
    });
    let ban = async (id:string) => {
        const res = await addBan(id);
        if(res && 'msg' in res){
            if(res.msg === 'User is already banned'){
                setBanMap(banMap.set(id, true));
            }
            setErr(err.set(id, res.msg));
        }else{
            setErr(err.set(id, ''));
            setBanMap(banMap.set(id, true));
        }
    }
    let unban = async (id:string) => {
        const res = await unBan(id);
        if(res && 'msg' in res){
            setErr(err.set(id, res.msg));
        }else{
            setErr(err.set(id,''));
            setBanMap(banMap.set(id, false));
        }
    }
    if(!json){
        return (<div className="text-center">Loading...</div>);
    }
      return (
            <><h2 className="text-center text-4xl my-10">Total Users: {json.count}</h2>
            <div style = {{margin:"20px", display:"flex", flexDirection:"column", padding:"10px", justifyContent:"center", alignItems: "center"}}>
                {(json.count == 0)?"No Companies":json.data.map((item: User) => (
                    <div className="bg-slate-200 rounded px-5 py-4 my-2 shadow-lg border-black border-2 w-[80%] flex flex-row" key={item._id}>
                        <div className = "h-fits w-[90%]"> 
                            <div className="text-md">UserID: {item._id}</div>
                            <div className="text-md">Name: {item.name}</div>
                            <div className="text-md">Email: {item.email}</div>
                            <div className="text-md">Tel: {item.tel}</div>
                            <div className="text-md">Member Since: {(new Date(item.createdAt)).toLocaleString()}</div>
                        </div>
                        <div className = "h-fits w-[10%] flex justify-center items-center flex-col">
                                {
                                    banMap.get(item._id)?
                                    <button className="border-white border-[3px] bg-green-400 w-[70px] h-[70px] hover:text-white rounded-lg shadow-lg text-lg" onClick={() => unban(item._id)}>Unban</button>
                                    :<button className="border-white border-[3px] bg-red-400 w-[70px] h-[70px] hover:text-white rounded-lg shadow-lg text-lg" onClick={()=>{ban(item._id)}}>Ban</button>
                                }
                                <p>{err.get(item._id)??''}</p>
                        </div>
                    </div>
                ))}
            </div>
            </>
      );
}