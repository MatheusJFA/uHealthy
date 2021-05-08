import { env } from "process";

export default {
  secret: env.SESSION_SECRET,
  expiresIn: '7d',
};