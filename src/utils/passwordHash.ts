import bcrypt from "bcrypt";

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);
export const hashPassword = (password) => bcrypt.hash(password, 5);