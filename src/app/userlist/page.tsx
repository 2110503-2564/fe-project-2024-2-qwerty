'use client'

import { Suspense, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import getUsers from "@/libs/getUsers";
import UsersList from "@/components/UserList";

export default function UserList() { 
  const [page, setPage] = useState(1);
  const [data, setData] = useState<UserJson>();
  useEffect(() => {
      getUsers(page).then((data)=>{setData(data)});
  },[page]);
  if(!data){
      return (<div className="text-center">Loading...</div>);
  }
  return (
    <main className="p-5">
      <Suspense fallback = {<p className="text-center">Loading... <LinearProgress></LinearProgress></p>}>
        <UsersList usersJson={data} page={page}></UsersList>
      </Suspense>
      <div className="justify-end flex ">
      <button className="bg-orange-300 hover:bg-gray-400 px-4 py-1 mx-2 rounded-2xl">{"< "}ก่อนหน้า</button>
      <button className="bg-orange-400 hover:bg-gray-400 px-4 py-1 mx-2 rounded-2xl">ถัดไป{" >"}</button>
</div>
    </main>
  );
}
