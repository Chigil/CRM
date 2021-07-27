import faker from 'faker';
import mongoose from "mongoose";
import User from "../models/User";

const showUsers = async () => {
    const eyeColors = ["brown", "green", "blue", "green", "black"]
    const genders = ["male", "female"]
    const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
    for (let i = 0; i <= 100; i++) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            isActive: faker.datatype.boolean(),
            balance: faker.datatype.number({
                "min":10,
                "max":10000
            }),
            age: faker.datatype.number({
                "min":10,
                "max":90
            }),
            eyeColor: random(eyeColors),
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            gender: random(genders),
            company: faker.company.companyName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress() + faker.address.country()
        });
         user
            .save()
            .then(()=>console.log("success add"))
            .catch((error) => {
                console.log(error)
            })
    }
}

export default showUsers