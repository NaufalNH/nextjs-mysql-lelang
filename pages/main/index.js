import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Home = () => {

  const [user, setUser] = useState();
const router = useRouter();
useEffect(() => {
    const localuser = localStorage.getItem("user");
    const user = JSON.parse(localuser)
    setUser(user)
    if (!user) {
        router.replace("/")
    }
},[]);
    
    return(
<>
<div className='text-center font-bold pb-4 text-xl'><h1>Welcome back, {user?.username} !</h1></div>
<Lelang />
</>
    )
}

export default Home;

export  function Lelang() {

  return (
    <>
    <div>
    <div className='flex flex-row gap-[1rem] flex-wrap justify-start px-[2.5rem]'>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD 1"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Status: <strong className='text-green-700'>Dibuka</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD 2"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Status: <strong className='text-green-700'>Dibuka</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD 3"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    </div>
    </div>
    </>
  );
}