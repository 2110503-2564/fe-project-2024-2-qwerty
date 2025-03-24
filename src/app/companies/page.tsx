'use client'

import { Suspense, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import CompaniesList from "@/components/CompaniesList";
import getCompanies from "@/libs/getCompanies";

export default function Company() { 
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CompanyJson>();
  useEffect(() => {
      getCompanies(page).then((data)=>{setData(data)});
  },[page]);
  if(!data){
      return (<div className="text-center">Loading...</div>);
  }
  return (
    <main className="p-5">
      <Suspense fallback = {<p className="text-center">Loading... <LinearProgress></LinearProgress></p>}>
        <CompaniesList companiesJson={data} page={page}></CompaniesList>
      </Suspense>  
    </main>
  );
}
