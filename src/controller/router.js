import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../config/database.js";
import express from "express";
import { generatePassword, addUser, updateUser, getUser } from "../service/helper.js";
import {verify as tokenService} from "../service/token.js";
export const router = express.Router();

//Login
router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          message: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              message: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1h" }
            );
            delete result[0].password;
            return res.status(200).send({
              message: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            message: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

// Register
router.post("/register", async (req, res) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        // username is available
        if (
          req.body &&
          req.body.firstname &&
          req.body.email &&
          req.body.username &&
          req.body.password
        ) {
          const password = generatePassword(req.body.password);
          db.query(
            `INSERT INTO users (firstname, lastname, role_id, username, email, password, subscribed) VALUES (${db.escape(
              req.body.firstname
            )}, ${db.escape(req.body.lastname)}, '1', ${db.escape(
              req.body.username
            )}, ${db.escape(req.body.email)}, "${password}" , 0)`,
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  message: err,
                });
              }
              return res.status(200).send({
                message: "User registered successfully!",
              });
            }
          );
        }
      }
    }
  );
});

// Authenticate
router.post("/authenticate", (req, res) => {
  const { token, email, apple_id, firstName, lastName } = req.body;
  const registeredUser = { apple_id, email, firstName, lastName };
  getUser(apple_id, (user, err) => {
    if (err) {
      res.status(401).send(err.message);
    } else if (!isEmpty(user)) {
      if (email && email !== user.email) {
        updateUser(req.body);
        user.email = req.body.email;
      }
      res.status(200).send(user);
    } else {
      tokenService.verify(req.body, (err) => {
        if (err) {
          res.status(401).send(err.message);
        } else {
          addUser(req.body, (success, err) => {
            if (err) {
              res.status(401).send(err.message);
            } else {
              res.status(200).send(registeredUser);
            }
          });
        }
      });
    }
  });
});
