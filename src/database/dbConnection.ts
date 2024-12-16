import postgres from 'postgres'

let sql;
try{
  const sql = postgres({
    host: process.env.HOST,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5432,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });
  console.log("Connected to database");
}catch(error){
  console.error("Error connecting to database", error);
}

export default sql