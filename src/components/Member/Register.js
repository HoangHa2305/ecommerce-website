import { useState } from "react";
import Errors from "../Errors";
import API from "../API";

function Register()
{
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        level:0,
    })

    const [errors,setErrors] = useState({})
    const [avatar,setAvatar] = useState("")
    const [file,setFile] = useState("")

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state=>({...state,[nameInput]:valueInput}))
    }

    function hanldeFile(e)
    {
        const file = e.target.files;

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file[0])
        };
        reader.readAsDataURL(file[0]);
    }

    function hanldeSubmit(e){
        e.preventDefault();

        let errorsSubmit= {};
        let flag = true;

        if(inputs.name == ""){
            errorsSubmit.name = "Vui long nhap Name";
            flag = false;
        }
        if(inputs.email == ""){
            errorsSubmit.email = "Vui long nhap Email";
            flag = false;
        }
        if(inputs.password == ""){
            errorsSubmit.password = "Vui long nhap Password";
            flag = false;
        }     
        if(inputs.phone == ""){
            errorsSubmit.phone = "Vui long nhap Phone";
            flag = false;
        }
        if(inputs.address == ""){
            errorsSubmit.address = "Vui long nhap Address";
            flag = false;
        }
        if(file == ""){
            errorsSubmit.avatar = "Vui long chon hinh anh";
        }else{
            const size = file.size;
            if(size>1048576){
                errorsSubmit.size = "Kich thuoc anh qua lon";
                flag = false;
            }
            const arr = ['png','jpg','jpeg','PNG','JPG'];
            const name = file.name;
            const type = name.split(".")
            if(arr.includes(type[1])==false){
                errorsSubmit.type = "Duoi file khong dung dinh dang";
                flag = false;
            }
        }
        if(!flag){
            setErrors(errorsSubmit);
        }else{    
            inputs['avatar']=avatar;

            API.post("/register",inputs)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors);
                }else{
                    alert("Dang ki thanh cong")
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }

    return (
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <Errors errors={errors}/>
                <form action="" onSubmit={hanldeSubmit} encType="multipart/form-data">
                <input type="text" name="name" placeholder="Name" onChange={hanldeInput} />
                <input type="email" name="email" placeholder="Email Address" onChange={hanldeInput}/>
                <input type="password" name="password" placeholder="Password" onChange={hanldeInput}/>
                <input type="number" name="phone" placeholder="Phone" onChange={hanldeInput}/>
                <input type="text" name="address" placeholder="Address" onChange={hanldeInput}/>
                <input type="file" name="avatar" onChange={hanldeFile}/>
                <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    );
}
export default Register;