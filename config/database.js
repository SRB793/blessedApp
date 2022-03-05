// const database={
//     production :{
//         password: process.env.password,
//         database: process.env.database,
//         host     : process.env.host,
//         user     : process.env.user
//     },
//     default : {
//         host     : 'localhost',
//         user     : 'root',
//         password : 'root',
//         database : 'blessed_app'
//     }
// }
// exports.get = function get(env){
//     return database[env] || database.default;
// }


import mysql from 'mysql';
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'blessed_app'
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
export default conn;