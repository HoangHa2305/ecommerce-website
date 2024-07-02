import { useState } from "react";
import Errors from "../Errors";
import API from "../API";
import { useNavigate } from "react-router-dom";

function Login()
{
    const [inputs,setInputs] = useState({
        email:"",
        password:"",
        level:0
    })
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state=>({...state,[nameInput]:valueInput}))
    }

    function hanldeSubmit(e){
        e.preventDefault();

        let errorsSubmit= {};
        let flag = true;

        if(inputs.email==""){
            errorsSubmit.email = "Vui long nhap email";
            flag = false;
        }
        if(inputs.password==""){
            errorsSubmit.password = "Vui long nhap mat khau";
            flag = false;
        }
        if(!flag){
            setErrors(errorsSubmit);
        }else{
            API.post('/login',inputs)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors);
                }else{
                    alert("dang nhap thanh cong");
                    
                    localStorage.setItem("user",JSON.stringify(res.data));
                    navigate("/")
                }
            })
        }
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">{/*login form*/}
                <h2>Login to your account</h2>
                <Errors errors={errors}/>
                <form action="" onSubmit={hanldeSubmit}>
                <input type="text" name="email" onChange={hanldeInput} placeholder="Email Address" />
                <input type="password" name="password" onChange={hanldeInput} placeholder="Password" />
                <span>
                    <input type="checkbox" className="checkbox" /> 
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>{/*/login form*/}
        </div>
    );
}
export default Login;