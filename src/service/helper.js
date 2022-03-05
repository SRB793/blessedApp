import bcrypt from 'bcryptjs';
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