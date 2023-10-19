import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Pagination as Pagination2, Avatar, Dialog, DialogContent, DialogContentText, DialogActions, Modal } from "@mui/material";
import {Delete, Add, Edit} from "@mui/icons-material";
import Image from "next/image";
import { rupiah } from "./[id]";

function Tambah(params) {
const [open, setOpen] = useState(false);
const [data,setData] = useState({
  token: params?.token,
  method:"tambah",
  nama_barang:"",
  harga_awal:"",
  deskripsi:""
})
const [image, setImage] = useState(null);
const [createObjectURL, setCreateObjectURL] = useState(null);
const router = useRouter();
const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === "image") {
    setImage(event.target.files[0]);
    setCreateObjectURL(URL.createObjectURL(event.target.files[0]));
  } else {
    setData({ ...data, [name]: value, token: params.token });
  }
};

const handleClik = async (event) => {    
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("token", data?.token);  
    formData.append("nama_barang", data?.nama_barang);  
    formData.append("harga_awal", data?.harga_awal);  
    formData.append("deskripsi", data?.deskripsi);  
    formData.append("method", data?.method);  
    try {
      const send = await axios({
        method:"POST",
        url:"/api/file",
        data:formData,
        headers:{"Content-Type" : "multipart/form-data"}
      })
      if (send.data.response) {
        router.reload()
      }
    } catch (error) {
      console.log(error)
    }   
    
  };

    return(
        <>
        <Button className="bg-blue-600 mb-2 flex" color="primary" variant="contained" size="medium" onClick={() => {setOpen(true)}}><Add /></Button>
        <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
<div className="bg-white w-[auto] h-[auto] rounded-lg border-black p-[16px] flex flex-col gap-6">
  <h1 className="text-lg font-bold">Tambah Barang</h1>
  <div className="flex flex-row gap-3 items-center">
  <label>Nama Barang : </label> <input type="text" name="nama_barang" value={data?.nama_barang} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder="Nama Barang" ></input> 
  </div>
  <div className="flex flex-row gap-3 mb-2">
  <div className="gap-[61px] flex"><label>Image </label> <label>:</label></div> <div className="flex flex-col gap-3"> <input type="file" name="image" onChange={handleChange} ></input>{ createObjectURL === null ? <Image src="/assets/images/notfound.png" width={200} height={200} />: <Image src={createObjectURL} width={200} height={200} className="object-contain max-h-[10rem]" />}</div>
  </div>
  <div className="flex flex-row gap-3">
  <label>Harga Barang : </label> <div className="flex flex-col gap-3"> <input type="number" name="harga_awal" value={data?.harga_awal} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder={rupiah(data?.harga_awal)} ></input> <p className="text-xs text-gray-500">{rupiah(data?.harga_awal)}</p> </div>
  </div>
  <div className="flex flex-row gap-3 items-center mb-2">
  <div className="gap-10 flex"><label>Deskripsi </label> <label>:</label></div> <textarea type="text" name="deskripsi" value={data?.deskripsi} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder="Deskripsi barang" ></textarea> 
  </div>
  <div className="flex items-center gap-3" style={{justifyContent:"right"}}>
  <Button variant="contained" color="error" className="bg-red-600" onClick={() => {setOpen(false)}}>Cancel</Button> 
  <Button variant="contained" className="bg-blue-600" onClick={handleClik}>Submit</Button> 
  </div>
  </div>
      </Modal>
      </>
    )
}
function UpdateBarang({token, nama , id , deskripsi , harga_awal, imagename}) {
const [open, setOpen] = useState(false);
const [data,setData] = useState({
  token: token,
  method:"update",
  nama_barang: nama,
  harga_awal:harga_awal,
  deskripsi: deskripsi,
  id_barang: id
})
const [image, setImage] = useState(null);
const [createObjectURL, setCreateObjectURL] = useState(null);
const router = useRouter();
const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === "image") {
    setImage(event.target.files[0]);
    setCreateObjectURL(URL.createObjectURL(event.target.files[0]));
  } else {
    setData({ ...data, [name]: value, token:token });
  }
};

const handleClik = async (event) => {    
    event.preventDefault();
    const formData = new FormData();
      formData.append("file", image);
    formData.append("token", data?.token);  
    formData.append("nama_barang", data?.nama_barang);  
    formData.append("harga_awal", data?.harga_awal);  
    formData.append("deskripsi", data?.deskripsi);  
    formData.append("method", data?.method);  
    formData.append("id_barang", data?.id_barang);  
    try {
      const send = await axios({
        method:"POST",
        url:"/api/file",
        data:formData,
        headers:{"Content-Type" : "multipart/form-data"}
      })
      if (send.data.response) {
        router.reload()
      }
    } catch (error) {
      console.log(error)
    }   
    
  };

    return(
        <>
        <Button className="bg-blue-600 mb-2 flex" color="primary" variant="contained" size="medium" onClick={() => {setOpen(true)}}><Edit /></Button>
        <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
<div className="bg-white w-[auto] h-[auto] rounded-lg border-black p-[16px] flex flex-col gap-6">
  <h1 className="text-lg font-bold">Edit Barang</h1>
  <div className="flex flex-row gap-3 items-center">
  <label>Nama Barang : </label> <input type="text" name="nama_barang" value={data?.nama_barang} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder="Nama Barang" ></input> 
  </div>
  <div className="flex flex-row gap-3 mb-2">
  <div className="gap-[61px] flex"><label>Image </label> <label>:</label></div>  <div className="flex flex-col gap-3"> <input type="file" name="image" onChange={handleChange} ></input>{ imagename && createObjectURL === null ? <Image src={"/upload/" + imagename} width={200} height={200} className="object-contain max-h-[10rem]" />: createObjectURL !== null ? <Image src={createObjectURL} width={200} height={200} className="object-contain max-h-[10rem]" /> : <Image src="/assets/images/notfound.png" width={200} height={200} className="object-contain max-h-[10rem]" />}</div>
  </div>
  <div className="flex flex-row gap-3">
  <label>Harga Barang : </label> <div className="flex flex-col gap-3"> <input type="number" name="harga_awal" value={data?.harga_awal} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder={rupiah(data?.harga_awal)} ></input> <p className="text-xs text-gray-500">{rupiah(data?.harga_awal)}</p> </div>
  </div>
  <div className="flex flex-row gap-3 items-center mb-2">
  <div className="gap-10 flex"><label>Deskripsi </label> <label>:</label></div> <textarea type="text" name="deskripsi" value={data?.deskripsi} onChange={handleChange} className="border-black bg-gray-200 rounded-md p-[8px]" placeholder="Deskripsi barang" ></textarea> 
  </div>
  <div className="flex items-center gap-3" style={{justifyContent:"right"}}>
  <Button variant="contained" color="error" className="bg-red-600" onClick={() => {setOpen(false)}}>Cancel</Button> 
  <Button variant="contained" className="bg-blue-600" onClick={handleClik}>Update</Button> 
  </div>
  </div>
      </Modal>
      </>
    )
}
function Tambahlelang(params) {
const [open, setOpen] = useState(false);
const [data,setData] = useState({
  token: params?.token,
  method:"add",
  nama_barang: params.nama,
  harga_awal:params.harga_awal,
  deskripsi:params.deskripsi,
  image:params.image,
  id:params.id
})
const router = useRouter();

const handleClik = async () => {
    try {
       const send = await axios({
            method:"POST",
            url:"/api/lelang",
            data:data
        })
if (send.data.response) {
    setOpen(false)
    router.replace("/main");
}
    } catch (error) {
        
    }
}
    return(
        <>
        <Button className="bg-green-600 mb-2 flex" color="success" variant="contained" size="medium" onClick={() => {setOpen(true)}}><Add /></Button>
        <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
<div className="bg-white w-[auto] h-[auto] rounded-lg border-black p-[16px] flex flex-col gap-6">
  <h1 className="text-lg font-bold">Tambahkan Ke Lelang</h1>
  <div className="flex flex-row gap-3 items-center">
  <label>Nama Barang : </label> <input type="text" name="nama_barang" value={data?.nama_barang}  className="border-black bg-gray-200 rounded-md p-[8px]" readOnly  ></input> 
  </div>
  <div className="flex flex-row gap-3 mb-2">
  <div className="gap-[61px] flex"><label>Image </label> <label>:</label></div> <div className="flex flex-col gap-3">{ !params.image ? <Image src="/assets/images/notfound.png" width={200} height={200} />: <Image src={"/upload/" + params.image} width={200} height={200} className="object-contain max-h-[10rem]" />}</div>
  </div>
  <div className="flex flex-row gap-3 items-center">
  <label>Harga Barang : </label> <input type="text" name="harga_awal" value={rupiah(data?.harga_awal)}  className="border-black bg-gray-200 rounded-md p-[8px]" readOnly ></input> 
  </div>
  <div className="flex flex-row gap-3 items-center mb-2">
  <div className="gap-10 flex"><label>Deskripsi </label> <label>:</label></div> <textarea type="text" name="deskripsi" value={data?.deskripsi}  className="border-black bg-gray-200 rounded-md p-[8px]" readOnly ></textarea> 
  </div>
  <div className="flex items-center gap-3" style={{justifyContent:"right"}}>
  <Button variant="contained" color="error" className="bg-red-600" onClick={() => {setOpen(false)}}>Cancel</Button> 
  <Button variant="contained" className="bg-blue-600" onClick={handleClik}>Submit</Button> 
  </div>
  </div>
      </Modal>
      </>
    )
}

function Deletebarang(params) {
const [open, setOpen] = useState(false);
const router = useRouter();
const handleClik = async () => {
    try {
       const send = await axios({
            method:"POST",
            url:"/api/barang",
            data:{
                method:"delete",
                id: params?.id,
                token: params?.token,
            }
        })
if (send.data.response) {
    setOpen(false)
    router.reload();
}
    } catch (error) {
        
    }
}
    return(
        <>
        <Button className="bg-red-600 mb-2 flex" color="error" variant="contained" size="medium" onClick={() => {setOpen(true)}}><Delete /></Button>
        <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Hapus <strong>{params?.nama}</strong> dari Barang?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Batal</Button>
          <Button onClick={handleClik}>Ya</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

const Barang =  () => {
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
    if (user.level === "masyarakat") {
        router.replace("/main")
    }
},[]);

useEffect(() => {
    (async() => {
    try {
        // const get = await axios.get("/api/pengaduan")
        if(user.level === "admin" || user.level === "petugas")
        {
            const get = await axios({
                method:"POST",
                url:"/api/barang",
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

<h1 className="text-xl font-bold mb-2">Pendataan Barang</h1>
<div className="flex" style={{justifyContent:"right"}}>
<Tambah token={user?.token} />
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-md pt-2 ">
      <table class="w-full text-sm text-left text-gray-500 dark:border-gray-300 border-gray-300 border">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700 border-b dark:border-gray-300 border-gray-300" >
            <tr>
                <th scope="col" class="pl-4 py-5 pr-3">
                    Index
                </th>
                <th scope="col" class="py-5">
                    Image
                </th>
                <th scope="col" class=" pl-6 py-5">
                    Nama 
                </th>
                <th scope="col" class="pl-6 py-5">
                    Tanggal
                </th>
                <th scope="col" class="pl-6 py-5">
                    Harga Awal
                </th>
                <th scope="col" class="pl-6 py-5">
                    Deskripsi
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
              { data?.image !== "" ? <Image src={"/upload/" + data?.image} width={90} height={50} className="object-cover max-h-[60px]" /> : <Image src="/assets/images/notfound.png" width={90} height={50} />}
              </td>
              <td class="pl-6 py-4">
             {data?.nama_barang }
              </td>
                <td class="pl-6 py-4">
                {new Date(data?.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  weekday: "long",
                  month: "long",
                  year: "numeric",
                  // hour: '2-digit',
                  // minute: "2-digit"
                })}
                </td>
                <td class="pl-6 py-4 text-green-700">
                {rupiah(data?.harga_awal)}
                </td>
                <td class="pl-6 py-4">
                {data?.deskripsi.length > 20 ? String(data?.deskripsi).substring(0, 20) + " ..." : data?.deskripsi  }
                </td>
                <td class=" pl-6 py-4">
                    <div className="gap-2 flex">
                   {user?.level === "petugas" && data?.status === "ada" ? <Tambahlelang id={data?.id_barang} token={user?.token} nama={data?.nama_barang} harga_awal={data?.harga_awal} deskripsi={data?.deskripsi} image={data?.image} status={data?.status} /> : user?.level === "petugas" ? <Button disabled className="bg-green-600 mb-2 flex" color="success" variant="contained" size="medium"><Add /></Button> : ""} 
                   <UpdateBarang id={data?.id_barang} token={user?.token} nama={data?.nama_barang} harga_awal={data?.harga_awal} deskripsi={data?.deskripsi} imagename={data?.image} status={data?.status} />
                    <Deletebarang id={data?.id_barang} token={user?.token} nama={data?.nama_barang}/>
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

export const Laporan = () => {
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
    if (user.level === "masyarakat") {
        router.replace("/main")
    }
  },[]);
  
  useEffect(() => {
    (async() => {
    try {
        // const get = await axios.get("/api/pengaduan")
        if(user.level === "admin" || user.level === "petugas")
        {
            const get = await axios({
                method:"POST",
                url:"/api/lelang",
                data: {
                    token: user?.token,
                    method: "laporan"
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
  <h1 className="text-xl font-bold mb-2">Laporan Lelang</h1>
  <div class="relative overflow-x-auto shadow-md sm:rounded-md pt-2 p-5">
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
                      Harga Akhir
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
                  <td class="pl-6 py-2 text-green-700">
                  {rupiah(data?.harga_awal)}
                  </td>
                  <td class="pl-6 py-2 text-green-700">
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

export default Barang;