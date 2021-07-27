import {NextFunction, query, Request, Response} from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    let {isActive, balance, age, eyeColor, name, gender, company, email, phone, address} = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        isActive,
        balance,
        age,
        eyeColor,
        name,
        gender,
        company,
        email,
        phone,
        address
    });

    return user
        .save()
        .then((result) => {
            return res.status(201).json({
                user: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
        let {search, active} = req.query
        const sort:any = req.query.sort
        const filter:any = req.query.filter
        const sortOpts: any = {}
        let options:any = {}
        const limit: number = parseInt(req.query.limit as any) || 50;

        if (typeof sort==="string") {
            const values = sort.split("|");
            sortOpts[values[0]] = values[1];
        }else if(typeof sort === "object"){
            sort.forEach((item: string) => {
                const values = item.split("|");
                sortOpts[values[0]] = values[1];
            })
        }

        if (typeof filter==="string") {
            const firstValues = filter.split("|");
            const secondValues = firstValues[1].split(":");
            const operator = secondValues[0] === 'to' ? '$lte' : '$gte'
            options[firstValues[0]] = { [operator]: secondValues[1]}
        }else if(typeof filter === "object"){
            filter.forEach((item: string) => {
                const firstValues = item.split("|");
                const secondValues = firstValues[1].split(":");
                const operator = secondValues[0] === 'to' ? '$lte' : '$gte'
                options[firstValues[0]] = { [operator]: secondValues[1] }
            })
        }

        if (search) {
            options = {
                ...options,
                $or: [
                    {name: new RegExp(search.toString(), 'i')},
                    {email: new RegExp(search.toString(), 'i')},
                    {company: new RegExp(search.toString(), 'i')}
                ],
            }
        }

        if (active) {
            options = {
                isActive: active.toString()
            }
        }

        User.find(options).sort(sortOpts).limit(limit)
            .exec()
            .then((result) => {
                return res.status(200).json({
                    users: result,
                    count: result.length
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
};

export default {createUser, getAllUsers};
