import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate} from 'react-router-dom';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
        console.log(loginState);
    }


    //Handle Login API Integration here
    const authenticateUser = () =>{
        fetch("https://secure-web-dev.fly.dev/users/login", {
          //  fetch("http://localhost:3000/users/login",{

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: loginState.username,
                password: loginState.password,
            })
        }).then(async (response) => {

            if(response.ok){
                localStorage.setItem('token',(await response.json()).jwt);
                navigate('/location');
            }else{
                alert("Your account does not exist or username/password is not correct.")
            }

        })
    }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} text="Login"/>

        </form>
    )
}