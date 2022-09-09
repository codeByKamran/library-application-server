import dotenv from "dotenv";

dotenv.config();

let environment = process.env.NODE_ENV;

export default {
  MONGO_URI:
    environment === "production"
      ? process.env.ATLAS_URI
      : process.env.LOCAL_MONGO_URL,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  PUSHER_ID: process.env.PUSHER_ID,
  PUSHER_KEY: process.env.PUSHER_KEY,
  PUSHER_SECRET: process.env.PUSHER_SECRET,
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
};
