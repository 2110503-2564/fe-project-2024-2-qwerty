import CardPanel from "@/components/CardPanel";
//import VenueCatalog from "@/components/VenueCatalog";
//import getVenues from "@/libs/getVenues";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Venue() {
  const json = await getVenues();
  // console.log(json.data.count);
  return (
    <main className="p-5 text-center">
      {/*<CardPanel></CardPanel>*/}
      <Suspense fallback = {<p>Loading... <LinearProgress></LinearProgress></p>}>
       
      </Suspense>  
    </main>
  );
}
