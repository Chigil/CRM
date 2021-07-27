import React, {useState} from 'react';
import HEADERS from "./userHeader";
import {createUser} from "../http/userApi";

const AddUserForm:React.FC<{close():void}> = props => {
    let type = "text"
    const [values,setValues] = useState<object>({})
    const changeValues = (value:any,key:string) => {
        key === "balance" ?  setValues({...values,[key]:"$"+value}) : setValues({...values,[key]:value})
        console.log(values)
    }
    const addUser = () => {
        createUser(values).then(()=>{
            setValues({})
            props.close()
        })
    }
    return (
        <div className="container">
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        {HEADERS.map((header) => {
                            //swich case
                            if (header === "age" || header === "balance") {
                                type = "number"
                            }
                            else if(header === "email") {
                                type = "email"
                            }
                            else{
                                type = "text"
                            }
                            return(
                                <>
                                <h6>{header}</h6>
                                <input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeValues(event.target.value, header)}
                                    id={header}
                                    type={type}
                                    className="validate"/>
                                </>
                            )
                        })}
                    </div>
                    <a onClick={()=>addUser()}className="waves-effect waves-light btn-large">Add</a>
                </form>
            </div>
        </div>
    );
};

export default AddUserForm;