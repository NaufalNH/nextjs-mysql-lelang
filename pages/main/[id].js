import { Avatar, Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

const TamaGay = () => {
  const router = useRouter();
  const {id}  = router.query;

  const [user,setUser] = useState({});
  const [display,setDisplay] = useState([]);
  const [penawaran,setPenawaran] = useState([]);
  const [best,setBest] = useState([]);
//   console.log(penawaran)

  useEffect(() => {
    const localuser = localStorage.getItem("user");
    const user = JSON.parse(localuser)
    setUser(user)
    if (!user) {
        router.replace("/")
    }
    if (user.level === "admin") {
        router.replace("/main")
    }
},[]);

const [tawar, setTawar] = useState({
    username:"",
    penawaran:"",
    id_lelang: "",
    method:"tawar",
    token:"",
    id_barang:""
})

const handleChange = (event) => {
    const { name, value,value2 } = event.target;
      setTawar({ ...tawar, [name]: value, id_lelang: id , username:user?.username, token:user?.token, id_barang:display?.id_barang});
  };

const handleClick = async () => {
try {
    const send = await axios({
        method:"POST",
        url:"/api/lelang",
        data:tawar
    })
    if (send.data.response) {
        router.reload();
    }
} catch (error) {
    console.log(error)
}
}
const handleTutup = async () => {
try {
    const send = await axios({
        method:"POST",
        url:"/api/lelang",
        data:{
            method:"tutup",
            harga_akhir:best?.penawaran,
            username:best?.username,
            harga_awal:display?.harga_awal,
            tanggal_lelang:display?.tanggal_lelang,
            nama_barang:display?.nama_barang,
            token:user?.token,
            image:display?.image,   
            id_lelang:id
        }
    })
    if (send.data.response) {
        router.reload();
    }
} catch (error) {
    console.log(error)
}
}

  useEffect(() => {
    (async() => {
try {
    if (user?.level === "masyarakat" || user?.level === "petugas" && id) {
        const get = await axios({
            method:"POST",
            url:"/api/lelang",
            data:{
                token: user?.token,
                method:"detail",
                id: id
            }
        }) 
        const tawar = await axios({
            method:"POST",
            url:"/api/lelang",
            data:{
                token: user?.token,
                method:"penawaran",
                id: id
            }
        })
        const penawaran = tawar.data.hasil
        const data = get.data.hasilfix
        setDisplay(data)
        setPenawaran(penawaran)
        setBest(penawaran[0])
    }
} catch (error) {
    console.log(error)
}
    })();
  },[user, id]);
  
    return( 
<>
<div className="flex flex-row flex-wrap bg-white h-[32.2rem] w-[67rem] p-3 rounded-md shadow-md border-gray-300 border gap-5">
    {!display.image ? 
<Image src="/assets/images/notfound.png" width={350} height={600} className="object-cover h-[30.5rem] shadow-md rounded-sm"  />
: <Image src={"/upload/" + display.image} width={350} height={600} className="object-cover h-[30.5rem] shadow-md rounded-sm"  /> }
<div className="flex flex-col w-[40rem] px-[1rem] flex-wrap">
<div className="flex flex-col w-full items-center mb-[3rem]">
<h1 className="font-bold text-xl">{display?.nama_barang}</h1>
</div>
<div className="flex gap-[7px]">
<p className="">Harga Awal</p> <p>:</p> <p className="text-green-700 font-bold">{rupiah(display?.harga_awal)}</p>
</div>
<div className="flex gap-3">
<p>Harga Akhir : </p> {display?.harga_akhir === 0 ? <p className="font-bold">-</p> : <p className="font-bold text-green-700">{rupiah(display?.harga_akhir)}</p>}
</div>
<div className="flex gap-3">
<p className="mr-[2rem]">Status </p> <p>:</p> <p className="font-bold">{display?.status === "dibuka" ? <strong className='text-green-700'>Dibuka</strong> : <strong className='text-red-700'>Ditutup</strong>}</p>
</div>
<div className="flex gap-3">
<p className="">Pemenang </p> <p>:</p> <p className="font-bold">{display?.username === "" ? "-" : <strong className='text-green-700'>{display?.username}</strong>}</p>
</div>
<div className="flex items-center flex-wrap overflow-x-auto w-[40rem] mt-[1rem] text-gray-500">
    <p>{display?.deskripsi}</p>
</div>
</div>
</div>
{display?.status === "dibuka" && <div className="flex flex-col flex-wrap bg-white h-[32.2rem] w-[67rem] p-3 rounded-md shadow-md border-gray-300 border gap-5 mt-[35px]">
<h1 className="font-bold text-xl  items-center flex flex-col">Penawaran Harga</h1>
<div className=" mt-[1rem] flex flex-row justify-center h-[24.5rem] gap-[3rem]">
    <div className="flex flex-row items-center">
        {user?.level === "masyarakat" ? <div className="flex flex-col gap-5 w-[29rem] ml-4">
<h1 className="text-lg font-bold">Berikan Tawaran</h1>
  <div className="flex flex-row gap-3 items-center">
  <div className="gap-10 flex"><label>Username </label> <label>:</label></div> <input type="text" name="username" value={user?.username}  className="border-black bg-gray-200 rounded-md p-[8px]" onChange={handleChange} readOnly ></input> 
  </div>
   <div className="flex flex-row gap-3">
  <label>Harga Tawaran : </label> <div className="flex flex-col gap-2"> <input type="number" name="penawaran" value={tawar?.penawaran} className="border-black bg-gray-200 rounded-md p-[8px]" onChange={handleChange} placeholder={rupiah(display?.harga_awal)} ></input> <p className="text-xs text-gray-500">{rupiah(tawar?.penawaran)}</p></div>
  </div>
  <div className="flex items-center gap-3">
  <Button variant="contained" color="error" className="bg-red-600" onClick={() => {setTawar({...tawar , penawaran:"", id:""})}}>Reset</Button> 
  {tawar?.penawaran >= display?.harga_awal ? <Button variant="contained" className="bg-blue-600" onClick={handleClick} >Submit</Button> : <Button disabled variant="contained" className="bg-blue-600" >Submit</Button>}
  </div>
  </div> : user?.level === "petugas" ? <div className="flex flex-col gap-5 w-[29rem] ml-4">
    {penawaran.length !== 0 ? <div><h1 className="flex flex-row flex-wrap gap-2 font-bold">Tutup Lelang dengan harga tertinggi <p className="text-green-700">{rupiah(best?.penawaran)}</p>dari user <p className="text-green-700">{best?.username}</p>?</h1>
<Button variant="contained" color="error" className="bg-red-600 w-full" onClick={handleTutup}>Tutup Lelang</Button></div> : ""} 
  </div>
   : ""}
</div>
<div>
<h1 className="text-lg font-bold">Penawaran</h1>
<div className="flex flex-col gap-5 w-[29rem] mr-4 h-[23.5rem] overflow-y-auto mt-2">
{penawaran.map((hh) => (
<div key={hh?.id_history} className="flex flex-row items-center gap-3"> 
 <Avatar sx={{ bgcolor: "indigo" }}>{String(hh?.username).charAt(0).toUpperCase()}</Avatar>
 <p><strong>{hh?.username} :</strong> <strong className="text-green-700">{rupiah(hh?.penawaran)}</strong></p>
 </div>
 ))}
</div>
</div>
</div>

</div>}
</>
    )
}

export default TamaGay;