import mongoose, { Schema } from 'mongoose';
import logging from '../config/lodding';
import IUser from '../interfaces/user';
import showUsers from "../commands/users";

const UserSchema: Schema = new Schema(
    {
        isActive: {type: Boolean, required: true},
        balance: {type: Number, required: true},
        age: {type: Number, required: true},
        eyeColor: {type: String, required: true},
        name: {type: String, required: true},
        gender: {type: String, required: true},
        company: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

UserSchema.post<IUser>('save', function () {
    logging.info('Mongo', 'Checkout the user we just saved: ', this);
});


export default mongoose.model<IUser>('User', UserSchema);