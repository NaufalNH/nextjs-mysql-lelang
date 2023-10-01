import { sqlconnect } from "../../lib/db";

export default async function handler(req , res){

if (req.method === "GET") {
        res.status(401).json({response:"Unauthorized"})
}
if (req.method === "POST") {
    if (req.body.method) {
        if (req.body.method === "login") {
            const hasil = await sqlconnect({
                query: "SELECT `username`, `level`  FROM user WHERE `username` = ? AND `password` = ?",
                values: [req.body.username, req.body.password],
            });

                    
                if (hasil[0]) {
                    const tokenini = "19203871" + hasil[0].username + "823746"
                    const send = await sqlconnect({
                        query: "UPDATE `user` SET `token`= ? WHERE `username`= ?",
                        values: [ tokenini,hasil[0].username],
                    });
                    res.status(200).json({username : hasil[0].username, level: hasil[0].level, token: tokenini}) 
                } else {
                    res.status(401).json({response:"User Not Found"})
                }   
        }     
        if (req.body.method === "get") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "admin") {
                const hasil = await sqlconnect({
                    query: "SELECT `nama`, `username`, `level`, `telp`  FROM user WHERE `level` = ? OR `level` = ?",
                    values: ["masyarakat", "petugas"],
                });
                res.status(200).json({hasil})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
        if (req.body.method === "up") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "admin") {
                const send = await sqlconnect({
                    query: "UPDATE `user` SET `level`= ? WHERE `username`= ?",
                    values: [req.body.role, req.body.username],
                });
                res.status(200).json({response:"Berhasil"})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
        if (req.body.method === "delete") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "admin") {
                const send = await sqlconnect({
                    query: "DELETE FROM `user` WHERE `username`= ?",
                    values: [req.body.username],
                });
                res.status(200).json({response:"Berhasil Menghapus" + req.body.username})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
        if (req.body.method === "logout") {
            const send = await sqlconnect({
                query: "UPDATE `user` SET `token`= ? WHERE `username`= ?",
                values: [ "",req.body.username],
            });
            res.status(200).send({response:"Berhasil Logout",});
        }
        if (req.body.method === "register") {
            const send = await sqlconnect({
                query:"INSERT INTO `user` SET `nama` = ? , `username` = ? , `password` = ? , `telp` = ? ",
                values:[req.body.nama , req.body.username , req.body.password , req.body.telp]
            })
            //   if (send.insertId) {
                res.status(200).send({response:"SUCCESS!!"});
            //   } else {
            //     res.status(400).send({response:"gagal menambahkan"});
            //   } 
    
        }

    } else {
        res.status(401).send({response:"no such method",});
    }

}
}