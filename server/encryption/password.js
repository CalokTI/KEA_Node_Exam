import { compare } from "bcrypt";

export async function comparePassword(password, hashPassword){
    return await compare(password, hashPassword);
}