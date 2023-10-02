import { sqlconnect } from "../../lib/db";

export default async function handler(req , res){
    if (req.method === "GET") {
        res.status(401).json({response:"Unauthorized"})
}
    if (req.method === "POST") {
        if (req.body.method) {
            if (req.body.method === "add") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `username` , `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "petugas") {
                const hasil = await sqlconnect({
                    query: "INSERT INTO `lelang` SET `nama_barang` = ? , `harga_awal` = ? , `deskripsi` = ? , `username_petugas` = ? , `id_barang` = ? ",
                    values: [req.body.nama_barang, req.body.harga_awal, req.body.deskripsi, select[0]?.username, req.body.id],
                });
                res.status(200).json({response:"Berhasil menambahkan ke lelang"})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
            if (req.body.method === "get") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "petugas" || select[0]?.level === "masyarakat") {
                const hasil = await sqlconnect({
                    query: "SELECT * FROM `lelang` ",
                    values: [],
                });
                res.status(200).json({hasil})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
        } else {
            res.status(401).send({response:"no such method",});
        }
}

}