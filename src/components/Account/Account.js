import { useEffect, useState } from "react";
import Errors from "../Errors";
import API from "../API";

function Account()
{
    const [image,setImage] = useState("");
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        phone:"",
        address:"",
    })

    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    useEffect(()=>{
        setImage(user.Auth.avatar);
        setInputs({
            name:user.Auth.name,
            email:user.Auth.email,
            phone:user.Auth.phone,
            address:user.Auth.address,
        })
    },[])
   
    const [errors,setErrors] = useState({})
    const [avatar,setAvatar] = useState("")
    const [file,setFile] = useState("")
    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state=>({...state,[nameInput]:valueInput}))
    }

    function hanldeFile(e){
        const file = e.target.files;

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file[0]);
        };
        reader.readAsDataURL(file[0]);
    }

    function hanldeSubmit(e){
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        if(inputs.name == ""){
            errorsSubmit.name = "Vui long nhap name";
            flag = false;
        }
        if(inputs.phone == ""){
            errorsSubmit.phone = "Vui long nhap so dien thoai";
            flag = false;
        }
        if(inputs.address == ""){
            errorsSubmit.address = "Vui long nhap email";
            flag = false;
        }
        if(file){
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
            let url = '/user/update/'+user.Auth.id;
            let accessToken = user.token;
            let config = {
                headers:{
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('name',inputs.name);
            formData.append('email',inputs.email);
            if(file){
                formData.append('avatar',avatar);
            }
            formData.append('phone',inputs.phone);
            formData.append('address',inputs.address);
            formData.append('password',inputs.password ?  inputs.password : "");
            API.post(url,formData,config)
            .then((res) => {
                console.log(res)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
    return (
        <>
            <div className="col-sm-9">
                <div className="signup-form">{/*sign up form*/}
                    <h2>User Update!</h2>
                    <Errors errors={errors}/>
                    <form action="" onSubmit={hanldeSubmit} encType="multipart/form-data">
                        <input type="text" name="name" onChange={hanldeInput} value={inputs.name}/>
                        <input type="email" name="email" value={inputs.email} readOnly/>
                        <input type="number" name="phone" onChange={hanldeInput} value={inputs.phone}/>
                        <input type="text" name="address" onChange={hanldeInput} value={inputs.address}/>                
                        <img src={"http://localhost/laravel8/public/upload/user/avatar/"+image} width={100} />
                        <input type="file" name="avatar" onChange={hanldeFile}/>
                        <button type="submit" className="btn btn-default">Update</button>
                    </form>
                </div>{/*/sign up form*/}
            </div>          
        </>
    )
}
export default Account;