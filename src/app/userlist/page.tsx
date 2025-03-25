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
    </main>
  );
}
