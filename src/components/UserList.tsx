import Link from "next/link";

export default function UsersList({usersJson, page}:{usersJson:UserJson, page:number}) {
      const json = usersJson;
      return (
            <><h2 className="text-center text-xl">Explore {json.count} companies</h2>
            <div style = {{margin:"20px", display:"flex", flexDirection:"column", padding:"10px"}}>
                {(json.count == 0)?"No Companies":json.data.map((item) => (
                    <div className="bg-slate-200 rounded px-5 py-4 my-2 shadow-md w-full" key={item._id}> 
                        <div className="text-md">UserID: {item._id}</div>
                        <div className="text-md">Name: {item.name}</div>
                        <div className="text-md">Email: {item.email}</div>
                        <div className="text-md">Tel: {item.tel}</div>
                        <div className="text-md">Member Since: {(new Date(item.createdAt)).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            </>
      );
}