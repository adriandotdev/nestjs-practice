import * as mysql2 from 'mysql2';


const options: mysql2.PoolOptions = {
    host: 'localhost',
    user: 'root',
    password: '4332wurx',
    database: 'nestjs-simple-database',
    connectionLimit: 10,
}

const pool = mysql2.createPool(options)

pool.on('release', (connection) => {
    console.log(`Connection ${connection.threadId} is released`)
})

export default pool;