import * as React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Barang from './barang';
import Lelang from './lelang';
import { Laporan } from './barang';

const Home = () => {
  const [user, setUser] = useState();
  const [view,setView] = useState('');

  const router = useRouter();
useEffect(() => {
    const localuser = localStorage.getItem("user");
    const user = JSON.parse(localuser)
    setUser(user)
  setView(Allview[user?.level])
    if (!user) {
        router.replace("/")
    }
},[]);
    
    return(
<>
<div className='text-center font-bold pb-4 text-xl'><h1>Welcome back, {user?.username} !</h1></div>
{view}
</>
    )
}

export default Home;

const Allview = {
  masyarakat : <Lelang /> ,
  admin : <Barang /> , 
  petugas : <Lelang /> 
}

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div className='hidden'>
    <div ref={ref}>
      <Laporan />
    </div>
    </div>
  );
});

