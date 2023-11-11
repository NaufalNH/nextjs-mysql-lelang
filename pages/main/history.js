import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Pagination as Pagination2, Avatar, Dialog, DialogContent, DialogContentText, DialogActions, Modal } from "@mui/material";
import {Delete, Add, Edit} from "@mui/icons-material";
import Image from "next/image";
import { rupiah } from "./[id]";

const History =  () => {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);

    const router = useRouter();
useEffect(() => {
    const localuser = localStorage.getItem("user");
    const user = JSON.parse(localuser)
    setUser(user)
    if (!user) {
        router.replace("/")
    }
    if (user.level !== "masyarakat") {
        router.replace("/main")
    }
},[]);

useEffect(() => {
    (async() => {
    try {
        // const get = await axios.get("/api/pengaduan")
        if(user.level === "masyarakat")
        {
            const get = await axios({
                method:"POST",
                url:"/api/lelang",
                data: {
                    token: user?.token,
                    method: "history"
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

<h1 className="text-xl font-bold mb-2">History Menang</h1>
<div className="flex" style={{justifyContent:"right"}}>
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-md pt-2 ">
<table class="w-full text-sm text-left text-gray-500 dark:border-gray-300 border-gray-300 border">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700 border-b dark:border-gray-300 border-gray-300" >
              <tr>
                  <th scope="col" class="pl-4 py-5 pr-3">
                      Image
                  </th>
                  <th scope="col" class="py-5">
                      Nama Barang
                  </th>
                  <th scope="col" class=" pl-6 py-5">
                      Tanggal Lelang 
                  </th>
                  <th scope="col" class="pl-6 py-5">
                      Pemenang
                  </th>
                  <th scope="col" class="pl-6 py-5">
                      Harga Awal
                  </th>
                  <th scope="col" class="pl-6 py-5">
                      Penawaran Anda
                  </th>
              </tr>
          </thead>
          <tbody> 
            <>
          {data?.map((data, index)=> (
            <>
            <tr  key={data.id_pengaduan} class=" border-b  dark:border-gray-300 border-gray-300 dark:hover:bg-zinc-200">
                <td class="pl-6 py-2">
                {!data?.image ? <Image src="/assets/images/notfound.png" width={90} height={50} /> : <Image src={"/upload/" + data?.image} width={90} height={50} className="object-cover max-h-[60px]" /> }
                </td>
                <td class="">
               {data?.nama_barang}
                </td>
                <td class="pl-6 py-2">
                {new Date(data?.tanggal_lelang).toLocaleDateString("id-ID", {
                    day: "numeric",
                    weekday: "long",
                    month: "long",
                    year: "numeric",
                    // hour: '2-digit',
                    // minute: "2-digit"
                  })}
                </td>
                  <td class="pl-6 py-2 font-bold">
                  {data?.username}
                  </td>
                  <td class="pl-6 py-2 text-red-700 font-bold italic">
                  {rupiah(data?.harga_awal)}
                  </td>
                  <td class="pl-6 py-2 text-green-700 font-bold italic">
                  {rupiah(data?.harga_akhir)}
                  </td>
                </tr>        
            </>
              ))}
              </>
          </tbody>
          
      
      </table>
    <div className="dark:border-gray-300 border-gray-300 border-b border-r border-l flex flex-row py-[25px] px-[10px] items-center text-sm" style={{justifyContent:"right"}}>
      </div>
</div>
</>
    )
}


export default History;