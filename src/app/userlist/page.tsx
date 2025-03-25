'use client'

import { Suspense, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import getUsers from "@/libs/getUsers";
import UsersList from "@/components/UserList";
import getBans from "@/libs/getBans";

export default function UserList() { 
  const [page, setPage] = useState(1);
  return (
    <main className="p-5">
      <Suspense fallback = {<p className="text-center">Loading... <LinearProgress></LinearProgress></p>}>
        <UsersList page={page}></UsersList>
      </Suspense>  
    </main>
  );
}
