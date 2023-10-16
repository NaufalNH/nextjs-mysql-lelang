import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { rupiah } from './[id]';

const Lelang = () => {
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
    if (user.level === "admin") {
        router.replace("/main")
    }
},[]);

useEffect(() => {
    (async() => {
    try {
        if(user.level === "masyarakat" || user.level === "petugas")
        {
            const get = await axios({
                method:"POST",
                url:"/api/lelang",
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
    return (
      <>
            <div>
      <div className='flex flex-row gap-[1rem] flex-wrap justify-start px-[2.5rem]'>
      {data?.map((hh) => (
      <Card  key={hh?.id_lelang} sx={{ maxWidth: 240}} className='mb-[1rem]'>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "indigo" }} aria-label="recipe">
              {String(hh?.username_petugas).charAt(0).toUpperCase()}
            </Avatar>
          }
          title={hh?.nama_barang}
          subheader={hh?.username_petugas}
        />
        {!hh.image ? 
        <CardMedia
          component="img" 
          image="/assets/images/notfound.png"
          alt="No Image"
          sx={{height:140}}    
        />
        : <CardMedia
        component="img" 
        image={"/upload/" + hh?.image}
        alt="No Image"
        sx={{height:140 , width:211}}    
      /> }
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Tanggal : <strong> {new Date(hh?.tanggal_lelang).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}</strong>
          </Typography>
            <Typography variant="body2" color="text.secondary">
            Harga: <strong>{rupiah(hh?.harga_awal)}</strong>
          </Typography>
            <Typography variant="body2" color="text.secondary">
            Status: {hh?.status === "dibuka" ? <strong className='text-green-700'>Dibuka</strong> : <strong className='text-red-700'>Ditutup</strong> } 
          </Typography>
        </CardContent>
            <CardActions>
        <Button size="small" href={`/main/${hh?.id_lelang}`}>Offer</Button>
      </CardActions>
      </Card>
            ))}
      </div>
      </div>
      </>
    );
  }

  export default Lelang