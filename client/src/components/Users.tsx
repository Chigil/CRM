import React, {useEffect, useState} from 'react';
import AddUser from "./AddUser";
import {getAllUsers} from "../http/userApi";
import IUser from "../inerfaces/user";
import HEADERS from "./userHeader";

const Users = () => {
    const [initialLoading, setInitialLoading] = useState<boolean>(true)
    const [userList, setUserList] = useState<IUser[]>([])
    const [countUser, setUserCount] = useState<string>('')
    const [active, setActive] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(50)
    const [query, setQuery] = useState<any>({limit})
    useEffect(() => {
        if (initialLoading) {
            getAllUsers(`?limit=${limit.toString()}`).then(data => {
                setUserList(data.users)
                setUserCount(data.count)
            }).finally(() => setInitialLoading(false))
        }
    })

    const showUsers = (queryArr: any) => {
        let queryStr = '?'
        const keys = Object.keys(queryArr)
        keys.forEach((key) => {
            const value = queryArr[key];
            if (value) {
                switch (key) {
                    //sort=age|DESC
                    case 'sort': {
                        const sortKeys = Object.keys(value)
                        if (sortKeys.length) {
                            sortKeys.forEach((sortKey) => {
                                queryStr += queryStr === '?' ? `sort=${sortKey}|${value[sortKey]}` : `&sort=${sortKey}|${value[sortKey]}`
                            })
                        }
                        break
                    }
                    //filter=age|from:15
                    case 'filter': {
                        const filterKeys = Object.keys(value)
                        if (filterKeys.length) {
                            filterKeys.forEach((filterKey) => {
                                const paramsKeys = Object.keys(value[filterKey])
                                paramsKeys.forEach(paramKey => {
                                    const filterValue = value[filterKey][paramKey]
                                    if(filterValue !== ''){
                                        queryStr += queryStr === '?' ? `filter=${filterKey}|${paramKey}:${filterValue}` : `&filter=${filterKey}|${paramKey}:${filterValue}`
                                    }
                                })
                            })
                        }
                        break
                    }
                    default:
                        queryStr += queryStr === '?' ? `${key}=${queryArr[key]}` : `&${key}=${queryArr[key]}`
                }
            }
        })
        getAllUsers(queryStr).then(data => {
                setUserList(data.users)
            }
        )
    }

    const searchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search: string = event.target.value
        const queryObj: any = {...query, search}
        setQuery(queryObj)
        showUsers(queryObj)
    }

    const sortOptions = (paramName: string, sortingType: string) => {
        const queryObj: any = {...query}
        let prevSort
        if (queryObj.sort && queryObj.sort[paramName]) {
            prevSort = queryObj.sort[paramName]
        }
        if (prevSort === sortingType) {
            delete queryObj.sort[paramName]
        } else {
            if (!queryObj.sort) {
                queryObj.sort = {}
            }
            queryObj.sort[paramName] = sortingType
        }
        setQuery(queryObj)
        showUsers(queryObj)
    }


    const showActiveUsers = () => {
        const currentActive = !active;
        setActive(currentActive)
        const queryObj: any = {...query, active: currentActive}
        setQuery(queryObj)
        showUsers(queryObj)
    }

    const addLimit = () => {
        const currentLimit = limit + 50
        const queryObj: any = {...query, limit: currentLimit}
        setLimit(currentLimit)
        setQuery(queryObj)
        showUsers(queryObj)
    }

    const rangeOptions = (paramName: string, key: string, value: string) => {
        const queryObj: any = {...query}
        if (!queryObj.hasOwnProperty('filter')) {
            queryObj.filter = {}
        }
        if (!queryObj.filter.hasOwnProperty(paramName)) {
            queryObj.filter[paramName] = {}
        }
        queryObj.filter[paramName][key] = value;
        setQuery(queryObj)
        console.log(queryObj)
        showUsers(queryObj)
    }


    return (
        <>
            <AddUser count={countUser} limit={limit}/>
            <ul className="right hide-on-med-and-down">
                <li><input id="search"
                           type="search"
                           placeholder="Search Users"
                           onChange={searchUser}
                /></li>
                <li>
                    <div className="row s12">
                        <div className="col s6">
                            <div className="col s3"><h6>Age
                                range:</h6></div>
                            <div className="col s1">from</div>
                            <div className="col s2"><input onChange={(event)=> rangeOptions("age", "from", event.target.value)} type="number" className="validate"/>
                            </div>
                            <div className="col s1">to</div>
                            <div className="col s2"><input onChange={(event)=> rangeOptions("age", "to", event.target.value)} type="number" className="validate"/>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="col s3"><h6>Balance range:</h6></div>
                            <div className="col s1 ">from</div>
                            <div className="col s2"><input onChange={(event)=> rangeOptions("balance", "from", event.target.value)} type="number" className="validate"/></div>
                            <div className="col s1">to</div>
                            <div className="col s2"><input onChange={(event)=> rangeOptions("balance", "to", event.target.value)} type="number" className="validate"/></div>
                        </div>
                    </div>
                </li>
            </ul>

            <table className="striped centered responsive-table">
                <thead>
                <tr>
                    {HEADERS.map(header =>
                        <>
                            {header === "isActive" ?
                                <th>{header}
                                    <i className="material-icons"
                                       onClick={() => sortOptions(header, "DESC")}
                                    >arrow_drop_down</i>
                                    <i className="material-icons"
                                       onClick={() => sortOptions(header, "ASC")}
                                    >
                                        arrow_drop_up
                                    </i>
                                    <label>
                                        <input type="checkbox" className="filled-in"/>
                                        <span onClick={() => showActiveUsers()}></span>
                                    </label>
                                </th>
                                :
                                <th>{header}
                                    <i className="material-icons"
                                       onClick={() => sortOptions(header, "DESC")}
                                    >arrow_drop_down</i>
                                    <i className="material-icons"
                                       onClick={() => sortOptions(header, "ASC")}
                                    >arrow_drop_up</i>
                                </th>
                            }
                        </>
                    )}
                </tr>

                </thead>
                <tbody>
                {userList.map(user =>
                    <tr>
                        <td>{user.isActive.toString()}</td>
                        <td>{"$"+user.balance}</td>
                        <td>{user.age}</td>
                        <td>{user.eyeColor}</td>
                        <td>{user.name}</td>
                        <td>{user.gender}</td>
                        <td>{user.company}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                    </tr>
                )
                }
                </tbody>
            </table>
            <a className="waves-effect waves-light btn right"
               onClick={addLimit}

            ><i className="material-icons right">add_circle</i>Show
                more users</a>

        </>
    );
};

export default Users