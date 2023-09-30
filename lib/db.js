import mysql from "mysql2/promise";

export async function sqlconnect ({query , values=[]}){
const dbconnect = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE
})

try {
    const [results] = await dbconnect.execute(query , values);
    dbconnect.end();
    return results;
} catch (error) {
    throw Error(error.message);
    return {error};
}
}