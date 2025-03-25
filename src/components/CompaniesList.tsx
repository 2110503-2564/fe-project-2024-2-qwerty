import Link from "next/link";

export default function CompaniesList({companiesJson, page}:{companiesJson:CompanyJson, page:number}) {
      const json = companiesJson;
      return (
            <><h2 className="text-center text-xl">Explore {json.count} companies</h2>
            <div style = {{margin:"20px", display:"flex", flexDirection:"row", padding:"10px"}}>
                {(json.count == 0)?"No Companies":json.data.map((item) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-4 my-2 shadow-md w-full" key={item._id}> 
                        <div className="text-md">Name: {item.name}</div>
                        <div className="text-md">Address: {item.address}</div>
                        <Link className="text-md text-cyan-700" href={item.website}>Website: {item.website}</Link>
                        <div className="text-md">Description: {item.description}</div>
                        <div className="text-md">Tel: {item.tel}</div>
                    </div>
                ))}
            </div>
            </>
      );
}