import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import {useNavigate} from 'react-router-dom';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
    const [signupState,setSignupState]=useState(fieldsState);

    const navigate = useNavigate();

    const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(signupState.password===signupState.confirmPassword){
            createAccount();
        }else{
            alert("The password and the confirm password does not match")
        }

    }

    const createAccount=()=> {
        fetch("https://secure-web-dev.fly.dev/users/register", {
        //    fetch("http://localhost:3000/users/register",{

            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    username: signupState.username,
                    password: signupState.password,
                    role:signupState.role,
            })
        }).then((response) => {
            if(response.ok){
                alert("Your account has been created, you will be redirected to the login page.");
                navigate('/');
            }else{
                alert("The username is already taken.")
            }
        })
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
    )
}