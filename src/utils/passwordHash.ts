import bcrypt from "bcrypt";

export const comparePassword = async (password, hash) => bcrypt.compare(password, hash);
export const hashPassword = async (password) => bcrypt.hash(password, 5);