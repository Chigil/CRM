import {makeAutoObservable} from "mobx";
import IUser from "../inerfaces/user";

class usersStore {
     users: IUser[] = []
     filter: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    get filterUser() {

        let matchesFilter = new RegExp(this.filter, "i");
        return this.users.filter(users => {
            console.log(users.name)
            return matchesFilter.test(users.name);
        })
    }
}
const store = new usersStore();

export default store;