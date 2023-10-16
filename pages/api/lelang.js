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
                    query: "INSERT INTO `lelang` SET `nama_barang` = ? , `harga_awal` = ? , `deskripsi` = ? , `username_petugas` = ? , `id_barang` = ? , `image` = ? ",
                    values: [req.body.nama_barang, req.body.harga_awal, req.body.deskripsi, select[0]?.username, req.body.id, req.body.image],
                });
                const send2 = await sqlconnect({
                    query: "UPDATE `barang` SET `status` = ? WHERE `id_barang` = ? ",
                    values: ["lelang" , req.body.id],
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
            if (req.body.method === "detail") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "petugas" || select[0]?.level === "masyarakat") {
                const hasil = await sqlconnect({
                    query: "SELECT * FROM `lelang` WHERE id_lelang = ? ",
                    values: [req.body.id],
                });
                const hasilfix = hasil[0]
                res.status(200).json({hasilfix})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
            if (req.body.method === "tawar") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "masyarakat") {
                const send = await sqlconnect({
                    query: "INSERT INTO `history` SET `id_lelang` = ? , `username` = ? , `penawaran` = ? , `id_barang` = ? ",
                    values: [req.body.id_lelang , req.body.username , req.body.penawaran, req.body.id_barang],
                });
                res.status(200).json({response:"Berhasil memberikan penawaran"})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
            if (req.body.method === "tutup") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "petugas") {
                const send = await sqlconnect({
                    query: "UPDATE `lelang` SET `harga_akhir` = ? , `username` = ? , `status` = ? WHERE `id_lelang` = ?",
                    values: [ req.body.harga_akhir , req.body.username , "ditutup" , req.body.id_lelang ],
                });
                const laporan = await sqlconnect({
                    query: "INSERT INTO `laporan` SET `nama_barang` = ? , `harga_awal` = ? , `harga_akhir` = ? , `username` = ? , `tanggal_lelang` = ? , `image` = ?",
                    values: [ req.body.nama_barang , req.body.harga_awal , req.body.harga_akhir , req.body.username, req.body.tanggal_lelang, req.body.image ],
                });
                res.status(200).json({response:"Berhasil menutup lelang!!!"})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
            if (req.body.method === "penawaran") {
                if(req.body.token){
            const select = await sqlconnect({
                query: "SELECT `level` FROM user WHERE `token` = ?  ",
                values: [req.body.token],
            });
            if (select[0]?.level === "masyarakat" || select[0]?.level === "petugas") {
                const hasil = await sqlconnect({
                    query: "SELECT * FROM `history` WHERE id_lelang = ? ORDER BY `penawaran` DESC",
                    values: [req.body.id],
                });
                res.status(200).json({hasil})
            }else{
                res.status(401).json({response:"Unauthorized"})
            }
                }else{
                    res.status(401).json({response:"Unauthorized"})
                } 
        }
        if (req.body.method === "laporan") {
            if(req.body.token){
        const select = await sqlconnect({
            query: "SELECT `level` FROM user WHERE `token` = ?  ",
            values: [req.body.token],
        });
        if (select[0]?.level === "petugas" || select[0]?.level === "admin") {
            const hasil = await sqlconnect({
                query: "SELECT * FROM `laporan` ",
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