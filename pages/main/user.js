import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Button, Pagination as Pagination2, Avatar } from "@mui/material";
import Link from "next/link";

const Userpage =  () => {
    const [user, setUser] = useState();
    // const [inisial, setInisial] = useState();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const router = useRouter();
useEffect(() => {
    const localuser = localStorage.getItem("user");
    const user = JSON.parse(localuser)
    setUser(user)
    if (!user) {
        router.replace("/")
    }
    if (user.level !== "admin") {
        router.replace("/main")
    }
},[]);

useEffect(() => {
    (async() => {
    try {
        // const get = await axios.get("/api/pengaduan")
        if(user.level === "admin")
        {
            const get = await axios({
                method:"POST",
                url:"/api/user",
                data: {
                    token: user?.token,
                    method: "get"
                }
            })
            const getdata = get.data.hasil
            setData(getdata)
        }
        } catch (error) {
            console.log(error)
        }
    })();
},[user]);
    return(
        <>

<h1 className="text-xl font-bold">Pengaduan</h1>
<div id="pengaduan" class="relative overflow-x-auto shadow-md sm:rounded-md pt-2 ">
    <table class="w-full text-sm text-left text-black dark:border-gray-300 border-gray-300 border">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700 border-b dark:border-gray-300 border-gray-300" >
            <tr>
                <th scope="col" class="px-6 py-5">
                    Index
                </th>
                <th scope="col" class="px-6 py-5">
                    Profile
                </th>
                <th scope="col" class=" px-6 py-5">
                    Nama
                </th>
                <th scope="col" class="px-6 py-5">
                    Username
                </th>
                <th scope="col" class="px-6 py-5">
                    No. Telp
                </th>
                <th scope="col" class="px-6 py-5">
                    Level
                </th>
                <th scope="col" class="px-6 py-5">
                    Aksi
                </th>
            </tr>
        </thead>
        <tbody> 
          <>
        {data?.map((data, index)=> (
          <>
          <tr  key={data.id_pengaduan} class=" border-b  dark:border-gray-300 border-gray-300 dark:hover:bg-zinc-200">
              <td class="px-6 py-5">
                {index + 1}
              </td>
              <td class="px-6 py-5">
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {data?.username}
          </Avatar>
              </td>
              <td class="px-6 py-5">
             {data?.nama }
              </td>
              {/* <td class="px-6 py-5">
              {new Date(data?.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  weekday: "long",
                  month: "long",
                  year: "numeric",
                  // hour: '2-digit',
                  // minute: "2-digit"
                })}
              </td> */}
                <td class="px-6 py-5">
                {data?.username}
                </td>
                <td class="px-6 py-5">
                {data?.telp}
                </td>
                <td class="px-6 py-5">
                {data?.level}
                </td>
                {/* <td class="px-6 py-5">
                    <Link href={`/main/${data?.id_pengaduan}`}>
                <Button color="primary" variant="contained" >Detail</Button>
                </Link>
                </td>
                <td class="px-6 py-5">
                    <Link href={`/main/${data?.id_pengaduan}`}>
                <Button color="primary" variant="contained" >Detail</Button>
                </Link>
                </td> */}
              </tr>
              
          </>
            ))}
            </>
        </tbody>
        
    
    </table>
    <div className="dark:border-gray-300 border-gray-300 border-b border-r border-l flex flex-row py-[11px] px-[10px] items-center text-sm" style={{justifyContent:"right"}}>
    {/* {data === null || data.length === 0 ?   <p>{(page - 1) * itemsPerPage}-
      { Math.min(page * itemsPerPage, data?.length) } of { data?.length }
      </p> :  <p>{(page - 1) * itemsPerPage + 1}-
      { Math.min(page * itemsPerPage, data?.length) } of { data?.length }
      </p> } 
     <Pagination2 count={pageCount} page={page} onChange={handleChange} /> */}
      </div>
</div>


</>
    )
}

export default Userpage;