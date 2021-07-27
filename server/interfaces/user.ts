import { Document } from 'mongoose';

export default interface IUser extends Document {
    "isActive": boolean,
    "balance": string,
    "age": number,
    "eyeColor": string,
    "name": string,
    "gender": string,
    "company": string,
    "email": string,
    "phone": string,
    "address": string
}
