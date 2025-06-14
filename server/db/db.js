
const Pool=require("pg").Pool

const pool=new Pool({
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT,
    database:process.env.DATABASE_NAME,
})
// const pool=new Pool({
//     connectionString:process.env.DATABASE_URL,
//     ssl:{
//         rejectUnautharized:false
//     }
// })

module.exports=pool


