import { sqlconnect } from '../../lib/db';
import { IncomingForm } from 'formidable'
// import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    if (req.method === "POST") {
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm()
            
            form.parse(req, async (err, fields, files)  => {
                 if (err) return reject(err)
                 if (fields.method[0] === "tambah") {
                    if (fields.token[0]) {
                        const select = await sqlconnect({
                            query: "SELECT `level` FROM user WHERE `token` = ?  ",
                            values: [fields.token[0]],
                        });
                        if (select[0]?.level === "admin" || select[0]?.level === "petugas") {
                            var oldPath = files.file[0].filepath;
                         var newPath = `./public/upload/${files.file[0].originalFilename}`;
                         mv(oldPath, newPath, function(err) {
                         });
                            const hasil = await sqlconnect({
                                query: "INSERT INTO `barang` SET `nama_barang` = ? , `harga_awal` = ? , `deskripsi` = ? , `image` = ? ",
                                values: [fields.nama_barang[0], fields.harga_awal[0], fields.deskripsi[0] , files.file[0].originalFilename],
                            });
                            res.status(200).json({ fields, files, coba:files.file[0] , token:fields.token[0] , response:"Berhasil Menambahkan!" })
                        }else{
                            res.status(401).json({response:"Unauthorized"})
                        }
                        }else{
                            res.status(401).json({response:"Token needed!"})
                        }
                 }
                 if (fields.method[0] === "update") {
                    if (fields.token[0]) {
                        const select = await sqlconnect({
                            query: "SELECT `level` FROM user WHERE `token` = ?  ",
                            values: [fields.token[0]],
                        });
                        if (select[0]?.level === "admin" || select[0]?.level === "petugas") {
                            if (files.file) {
                                var oldPath = files.file[0].filepath;
                                var newPath = `./public/upload/${files.file[0].originalFilename}`;
                                mv(oldPath, newPath, function(err) {
                                });
                                   const hasil = await sqlconnect({
                                       query: "UPDATE `barang` SET `nama_barang` = ? , `harga_awal` = ? , `deskripsi` = ? , `image` = ? WHERE id_barang = ? ",
                                       values: [fields.nama_barang[0], fields.harga_awal[0], fields.deskripsi[0] , files.file[0].originalFilename , fields.id_barang[0]],
                                   });
                                   res.status(200).json({ fields, files, coba:files.file[0] , token:fields.token[0] , response:"Berhasil Menambahkan!" })
                            } 
                            else {
                                const hasil = await sqlconnect({
                                    query: "UPDATE `barang` SET `nama_barang` = ? , `harga_awal` = ? , `deskripsi` = ? WHERE id_barang = ? ",
                                    values: [fields.nama_barang[0], fields.harga_awal[0], fields.deskripsi[0] , fields.id_barang[0]],
                                });
                                res.status(200).json({ fields, files , token:fields.token[0] , response:"Berhasil Menambahkan!" })
                            }
                          
                        }else{
                            res.status(401).json({response:"Unauthorized"})
                        }
                        }else{
                            res.status(401).json({response:"Token needed!"})
                        }
                 }
           
             })
         })
         
    }
    
}