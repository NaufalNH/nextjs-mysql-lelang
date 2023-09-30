import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Pagination as Pagination2, Avatar, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { ArrowUpward, Delete, Person, AdminPanelSettings } from "@mui/icons-material";
import Link from "next/link";

function Upgrade(params) {
const [open, setOpen] = useState(false);
    return(
        <>
        <Button color="success" variant="contained" size="small" onClick={() => {setOpen(true)}}><ArrowUpward /></Button>
        <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Naikkan {params?.nama} menjadi Petugas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Batal</Button>
          <Button onClick={() => {setOpen(false)}}>Ya</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

const Userpage =  () => {
    const [user, setUser] = useState();
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
<div class="relative overflow-x-auto shadow-md sm:rounded-md pt-2 ">
      <table class="w-full text-sm text-left text-gray-500 dark:border-gray-300 border-gray-300 border">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700 border-b dark:border-gray-300 border-gray-300" >
            <tr>
                <th scope="col" class="pl-4 py-5">
                    Index
                </th>
                <th scope="col" class="py-5">
                    Profile
                </th>
                <th scope="col" class=" pl-6 py-5">
                    Nama
                </th>
                <th scope="col" class="pl-6 py-5">
                    Username
                </th>
                <th scope="col" class="pl-6 py-5">
                    No. Telp
                </th>
                <th scope="col" class="pl-6 py-5">
                    Level
                </th>
                <th scope="col" class="pl-6 py-5">
                    Aksi
                </th>
            </tr>
        </thead>
        <tbody> 
          <>
        {data?.map((data, index)=> (
          <>
          <tr  key={data.id_pengaduan} class=" border-b  dark:border-gray-300 border-gray-300 dark:hover:bg-zinc-200">
              <td class="pl-6 py-4">
                {index + 1}
              </td>
              <td class="">
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {data?.username}
          </Avatar>
              </td>
              <td class="pl-6 py-4">
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
                <td class="pl-6 py-4">
                {data?.username}
                </td>
                <td class="pl-6 py-4">
                {data?.telp}
                </td>
                <td class="pl-6 py-4">
                {data?.level === "petugas" ? <AdminPanelSettings color="primary" fontSize="large" /> : <Person color="success" fontSize="large" />}
                </td>
                <td class=" pl-6 py-4">
                    <div className="gap-2 flex">
                   <Upgrade nama={data?.nama} />
                    <Button color="error" variant="contained" size="small"><Delete /></Button>
                    </div>
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

export default Userpage;