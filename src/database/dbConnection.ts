import postgres from 'postgres'

let sql;
try{
  sql = postgres({
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });
  console.log("Connected to database");
}catch(error){
  console.error("Error connecting to database", error);
}

export default sql