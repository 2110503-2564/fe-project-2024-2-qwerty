'use client'

import { TextField } from "@mui/material";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import getSessionFromServer from "@/libs/getSessionFromServer";
import Link from "next/link";
import userRegister from "@/libs/userRegister";

export default function Register(){

      const [validEmail, setValidEmail] = useState(true);
      const [validPassword, setValidPassword] = useState(true);
      const [validTel, setValidTel] = useState(true);

      const [name, setName] = useState<string|undefined>(undefined);
      const [email, setEmail] = useState<string|undefined>(undefined);
      const [tel, setTel] = useState<string|undefined>(undefined);
      const [password, setPassword] = useState<string|undefined>(undefined);

      const [session, setSession] = useState<Session|null>(null);
      getSessionFromServer().then((data) => {setSession(data)});
      if(session){
            (useRouter()).push('/');
      }
      const registerFunction = () => {
            if(name && email && tel && password){
                  const res = userRegister(name, email, tel, password);
                  signIn('credentials',{email, password, callbackUrl:'/'});
            }
      }

      const checkValid = () => {
            return validEmail && validPassword && validTel;
      }

      return(
            <div className="w-full h-[calc(100vh+50px)] absolute top-[-50px] bg-gray-200 flex flex-col justify-center items-center">
                 <div className="bg-white rounded-md flex flex-col justify-center items-center p-10">
                  <h1 className="text-lg">Register</h1>
                  <div className="m-2">
                  <TextField onKeyDown={(e) => { if (e.key === "Enter" && name && checkValid()){registerFunction()}}} className='w-[260px]' required={true} label='Name' onChange={(e)=>{setName(e.target.value)}}></TextField>
                  </div>
                  <div className="m-2">
                  <TextField onKeyDown={(e) => { if (e.key === "Enter" && email && checkValid()){registerFunction()}}} className='w-[260px]' type='email' error={!validEmail} helperText={validEmail?'':'Please enter valid email'} required={true} label='Email' onChange={(e)=>{setValidEmail(e.target.validity.valid||(e.target.value=='')); setEmail(e.target.value)}}></TextField>
                  </div>
                  <div className="m-2">
                  <TextField onKeyDown={(e) => { if (e.key === "Enter" && tel && checkValid()){registerFunction()}}} className='w-[260px]' type='tel' error={!validTel} helperText={validTel?'':'Please enter valid phone number'} required={true} label='Tel' onChange={(e)=>{setValidTel(e.target.validity.valid||(e.target.value=='')); setTel(e.target.value)}}></TextField>
                  </div>
                  <div className="m-2">
                  <TextField onKeyDown={(e) => { if (e.key === "Enter" && password && checkValid()){registerFunction()}}} className='w-[260px]' type='password' error={!validPassword} inputProps={{ minLength: 6 }} helperText={validPassword?'':'Password should be atleast 6 characters'} required={true} label='Password' onChange={(e)=>{setValidPassword(!e.target.validity.tooShort||(e.target.value==''));setPassword(e.target.value)}}></TextField>
                  </div>
                  <Link href='/login' className="text-sm text-cyan-600 hover:text-cyan-500">Already have account? Click Here</Link>
                  <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white w-[100px] mt-[15px]" onClick={()=>{if(checkValid()){registerFunction()}}}>Register</button>
                 </div>
            </div>
      );
}