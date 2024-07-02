import { useEffect, useState } from "react";
import API from "../API";
import Errors from "../Errors";

function AddProduct()
{
    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [errors,setErrors] = useState('');
    const [file,setFile] = useState('');
    const [inputs,setInputs] = useState({
        name:"",
        id_category:"",
        id_brand:"",
        image:"",
        price:"",
        status:0,
        sale:"",  
        detail:"",
        company:""
    })

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state=>({...state,[nameInput]:valueInput}))
    }
    
    useEffect(()=>{
        API.get('/category-brand')
        .then(response=>{
            setBrand(response.data.brand);
            setCategory(response.data.category)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])

    function fetchCategory(){
        if(category.length > 0){
            return category.map((value,key)=>{
                return (
                    <option value={value.id}>{value.category}</option>
                )
            })
        }
    }

    function fetchBrand(){
        if(brand.length > 0){
            return brand.map((value,key)=>{
                return (
                    <option value={value.id}>{value.brand}</option>
                )
            })
        }
    }

    function renderSale(){
        if(inputs.status==0){
            return (           
                <>
                    <input type="number" name="sale" onChange={hanldeInput} placeholder="0"/>%
                </>
            )
        }
    }
    function hanldeFile(e){
        setFile(e.target.files);
    }

    function hanldeSubmit(e){
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;
        
        if(inputs.name == ""){
            errorsSubmit.name = "Vui long nhap name";
            flag = false;
        }
        if(inputs.id_category == ""){
            errorsSubmit.id_category = "Vui long chon category";
            flag = false;
        }
        if(inputs.id_brand == ""){
            errorsSubmit.id_brand = "Vui long chon brand";
            flag = false;
        }
        if(inputs.price == ""){
            errorsSubmit.price = "Vui long nhap price";
            flag = false;
        }
        if(file == ""){
            errorsSubmit.file = "Vui long nhap hinh anh";
            flag = false;
        }else{
            if(Object.keys(file).length>0){
                const arr = ['png','jpg','jpeg','PNG','JPG'];
                Object.keys(file).map((key,index)=>{
                    if(file[key].size>1048576){
                        errorsSubmit.file = "Kich thuoc hinh anh "+ key +" qua lon";
                        flag = false;
                    }                   
                    const name = file[key].name;
                    const type = name.split(".")
                    if(arr.includes(type[1])==false){
                        errorsSubmit.type = "Duoi file "+ key +" khong dung dinh dang";
                        flag = false;
                    }
                })
            }
        }
        if(inputs.detail == ""){
            errorsSubmit.detail = "Vui long nhap detail";
            flag = false;
        }
        if(inputs.company == ""){
            errorsSubmit.company = "Vui long nhap company";
            flag = false;
        }

        if(!flag){
            setErrors(errorsSubmit);
        }else{
            inputs['image'] = file;
    
            let url = '/user/product/add';
            let accessToken = user.token;
            let config = {
                headers:{
                    'Authorization': 'Bearer '+accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('id_user',user.Auth.id);
            formData.append('category',inputs.id_category);
            formData.append('brand',inputs.id_brand);
            formData.append('name',inputs.name);
            Object.keys(file).map((key,item)=>{
                formData.append("file[]",file[key]);
            });
            formData.append('price',inputs.price);
            formData.append('status',inputs.status);
            formData.append('sale',inputs.sale);
            formData.append('detail',inputs.detail);
            formData.append('company',inputs.company);
            API.post(url,formData,config)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors);
                }else{
                    alert("Them san pham thanh cong");
                }            
            })
        }
    }

    return (
        <>
            <div className="col-sm-9">
                <div className="signup-form">{/*sign up form*/}
                    <h2>Create product!</h2>
                    <Errors errors={errors}/>
                    <form action="" encType="multipart/form-data" onSubmit={hanldeSubmit}>
                        <input type="text" name="name" onChange={hanldeInput} placeholder="Name"/>
                        <input type="text" name="price" onChange={hanldeInput} placeholder="Price"/>
                        <select name="id_category" onChange={hanldeInput}>
                            <option>Please choose category</option>
                            {fetchCategory()}
                        </select>
                        <select name="id_brand" onChange={hanldeInput}>
                            <option>Please choose brand</option>
                            {fetchBrand()}
                        </select>
                        <select name="status" value={0} onChange={hanldeInput}>                           
                            <option value="0">Sale</option>                      
                            <option value="1">New</option>
                        </select>
                        {renderSale()}
                        <input type="text" name="company" onChange={hanldeInput} placeholder="Company profile"/>  
                        <input type="file" name="file" onChange={hanldeFile} multiple/>
                        <textarea name="detail" onChange={hanldeInput} placeholder="Detail"></textarea>
                        <button type="submit" className="btn btn-default">Add</button>
                    </form>
                </div>{/*/sign up form*/}
            </div>          
        </>
    )
}
export default AddProduct;