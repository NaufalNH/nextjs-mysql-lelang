import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Assignment, AccountCircle, LocalMall, Print, EmojiEvents } from '@mui/icons-material';
import { useEffect, useState,useRef } from "react";
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from '../pages/main';
import { Laporan } from '../pages/main/barang';

const List1  = () => {
  return(
    <>
<ListItemButton  component={Link} href="/main" sx={{color: "white"}}>
      <ListItemIcon>
        <LocalMall  sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Pelelangan" />
    </ListItemButton>
<ListItemButton  component={Link} href="/main/history" sx={{color: "white"}}>
      <ListItemIcon>
        <EmojiEvents sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="History Menang" />
    </ListItemButton>
    </>
  )
}

const List3  = () => {
  return(
    <>
<ListItemButton  component={Link} href="/main" sx={{color: "white"}}>
      <ListItemIcon>
        <Assignment  sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Pendataan Barang" />
    </ListItemButton>
<ListItemButton  component={Link} href="/main/user" sx={{color: "white"}}>
      <ListItemIcon>
        <AccountCircle  sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="User" />
    </ListItemButton>
    </>
  )
}

const List2  = () => {
  return(
    <>
    <ListItemButton  component={Link} href="/main" sx={{color: "white"}}>
      <ListItemIcon>
        <LocalMall  sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Pelelangan" />
    </ListItemButton>
<ListItemButton  component={Link} href="/main/barang" sx={{color: "white"}}>
      <ListItemIcon>
        <Assignment  sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Pendataan Barang" />
    </ListItemButton>
    </>
  )
}


const List = {
  masyarakat : List1,
  petugas : List2,
  admin : List3
}

export const Listsidebar = () =>{
  const [user, setUser] = useState();
  const [View, setView] = useState('');
  const router = useRouter();
  const componentRef = useRef();
  useEffect(() => {
      const localuser = localStorage.getItem("user");
      const user = JSON.parse(localuser)
      setUser(user)
      setView(List[user?.level])
  },[])


  return(
  <React.Fragment>
    
    <ListSubheader sx={{backgroundColor: "#213555", color: "white"}} component="h4"  >
      Main Menu
    </ListSubheader>
    {View}
    {(user?.level === "petugas" || user?.level === "admin") && <div>
      <ReactToPrint
        trigger={() => <ListItemButton sx={{color: "white"}}> 
      <ListItemIcon>
        <Print  sx={{color: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Generate Laporan" />
    </ListItemButton>} // seng nang jero trigger ki tampilan click an ne, diganti button printmu
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div>}
      </React.Fragment>
)
}

