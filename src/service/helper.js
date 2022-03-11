import bcrypt from 'bcryptjs';
import db from "../../config/database.js";
// exports.jwtVerifyToken = function(token, secret, callback) {
//     jwt.verify(token, secret, function(err, decoded) {
//         if (err) {
//             return callback(err);
//         }
//         return callback(null, decoded);
//     });
// };

export const generatePassword = function(password) {
    return bcrypt.hashSync(password, 10);
};

export const getUser = (identifier, callback) => {
    db.query(`SELECT * FROM users WHERE apple_id = '${identifier}'`, (error, results) => {
       if (error) {
          callback(null, error.message);
       } else {
          if (results.rowCount > 0) {
             callback(results.rows[0]);
          } else {
             callback(null);
          }
       }
    });
 };

 export const updateUser = (identifier, data, callback) => {
    db.query(`UPDATE users SET ${data} WHERE apple_id = '${identifier}'`, (error, results) => {
       if (error) {
          callback(null, error.message);
       } else {
          callback(results.rows[0]);
       }
    });
 };

 export const addUser = (identifier, data, callback) => {
    db.query(`INSERT INTO users (${data}) VALUES ('${identifier}')`, (error, results) => {
       if (error) {
          callback(null, error.message);
       } else {
          callback(results.rows[0]);
       }
    });
 }
