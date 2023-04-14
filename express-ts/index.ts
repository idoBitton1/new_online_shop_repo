import express, { Express, Request, Response, response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./postgraphile";
import pool from "./postgres";
import jwt from "jsonwebtoken";

const port = 8000;
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(config);

app.get('/getToken', (request, response) => {
  const { id, email, isManager } = request.query;

  let is_manager: boolean = isManager === "true" ? true : false;

  const token = jwt.sign(
    {user_id: id, email: email, is_manager},
    "TEMP_STRING",
    {
        //the token will expire in 2 hours
        expiresIn: "2h"
    }
  );

  response.json(token)
});

app.get('/deleteFromWishlist', async(request, response) => {
  const { user_id, product_id } = request.query;

  try {
    const delete_product = await pool.query(
    "DELETE FROM wishlist WHERE user_id=$1 AND product_id=$2",
    [user_id, product_id]);
  } catch (err: any) {
    console.error(err.message)
  }
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

//npm run serve