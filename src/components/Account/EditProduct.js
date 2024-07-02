import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import Errors from "../Errors";

function EditProduct()
{
    let params = useParams();
    const [inputs,setInputs] = useState({
        name:"",
        price:"",
        id_category:"",
        id_brand:"",
        status:1,
        company:"",
        detail:"",
        sale:""
    });

    const [category,setCategory] = useState('');
    const [brand,setBrand] = useState('');
    const [image,setImage] = useState('');
    const [file,setFile] = useState('');
    const [errors,setErrors] = useState('');
    const [avatarCheckBox,setAvatarCheckBox] = useState('');
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let accessToken = user.token;
    let config = {
        headers:{
            'Authorization': 'Bearer '+accessToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    };
    let url = '/user/product/'+params.id;

    useEffect(()=>{
        API.get(url,config)
        .then(res=>{
            setInputs({
                name:res.data.data.name,
                price:res.data.data.price,
                company:res.data.data.company_profile,
                detail:res.data.data.detail,
                id_category:res.data.data.id_category,
                id_brand:res.data.data.id_brand,
                status:res.data.data.status,
                sale:res.data.data.sale
            });
            setImage(res.data.data.image)
        })
    },[]);

    useEffect(()=>{
        API.get('/category-brand')
        .then(res=>{
            setCategory(res.data.category);
            setBrand(res.data.brand);
        })
    },[]);

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state=>({...state,[nameInput]:valueInput}))
    }

    function fetchCategory(){
        if(category.length>0){
            return category.map((value,key)=>{
                return (
                    <option value={value.id} selected={inputs.id_category == value.id ? true : false}>{value.category}</option>
                )
            })
        }
    }

    function fetchBrand(){
        if(brand.length>0){
            return brand.map((value,key)=>{
                return (
                    <option value={value.id} selected={inputs.id_brand == value.id ? true : false}>{value.brand}</option>
                )
            })
        }
    }

    function renderImage(){
        if(image.length>0){
            return image.map((value,key)=>{
                return (
                    <>
                        <label for={value}><img src={"http://localhost/laravel8/public/upload/product/"+user.Auth.id+"/"+value} width={60}/></label>
                        <input type="checkbox" name={value} onChange={hinhxoaCheckbox}/>
                    </>
                )
            })
        }
    }

    function renderSale(){
        if(inputs.status==0){
            return (           
                <>
                    <input type="number" name="sale" value={inputs.sale}/>%
                </>
            )
        }
    }

    function hinhxoaCheckbox(e){
        let img = e.target.name;
        
        if(avatarCheckBox.includes(img)){
            const newAvatarCheckBox = avatarCheckBox.filter(function(elem){
                return elem != img; 
             })
            setAvatarCheckBox(newAvatarCheckBox);
        }else{               
            setAvatarCheckBox(state=>([...state,img]))
        }
    }

    function hanldeFile(e){
        setFile(e.target.files)
    }

    function hanldeSubmit(e){
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        if(inputs.name == ""){
            errorsSubmit.name = "Vui long nhap name";
            flag = false;
        }
        if(inputs.price == ""){
            errorsSubmit.price = "Vui long nhap price";
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
        if(inputs.company == ""){
            errorsSubmit.company = "Vui long nhap company";
            flag = false;
        }
        if(inputs.detail == ""){
            errorsSubmit.detail = "Vui long nhap detail";
            flag = false;
        }
        if(file==""){
            errorsSubmit.file = "Vui long chon hinh anh";
            flag = false;
        }else{
            if((image.length-avatarCheckBox.length)+file.length > 3){
                errorsSubmit.length = "Tong so hinh anh chon vao va hinh anh xoa phai <=3";
                flag = false;
            }
        }

        if(!flag){
            setErrors(errorsSubmit);
        }else{
            let url1 = '/user/product/update/'+params.id;

            const formData = new FormData();
            formData.append('id_user',user.Auth.id);
            formData.append('category',inputs.id_category);
            formData.append('brand',inputs.id_brand);
            formData.append('name',inputs.name);
            formData.append('price',inputs.price);
            formData.append('status',inputs.status);
            formData.append('sale',inputs.sale);
            formData.append('detail',inputs.detail);
            formData.append('company',inputs.company);
            Object.keys(file).map((key,item)=>{
                formData.append("file[]",file[key]);
            });
            Object.keys(avatarCheckBox).map((key,item)=>{
                formData.append("avatarCheckBox[]",avatarCheckBox[key]);
            });
            API.post(url1,formData,config)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors);
                }else{
                    alert("Cap nhat san pham thanh cong");
                }
            })
        }
    }
    
    return (
        <>
            <div className="col-sm-9">
                <div className="signup-form">
                    <h2>Update product!</h2>
                    <Errors errors={errors}/>
                    <form action="" onSubmit={hanldeSubmit} encType="multipart/form-data">
                        <input type="text" name="name" value={inputs.name} onChange={hanldeInput}/>
                        <input type="text" name="price" value={inputs.price} onChange={hanldeInput}/>
                        <select name="id_category" onChange={hanldeInput}>
                            <option>Please choose category</option>
                            {fetchCategory()}
                        </select>
                        <select name="id_brand" onChange={hanldeInput}>
                            <option>Please choose brand</option>
                            {fetchBrand()}
                        </select>
                        <select name="status" value={inputs.status} onChange={hanldeInput}>                           
                            <option value="0">Sale</option>                      
                            <option value="1">New</option>
                        </select>
                        {renderSale()}
                        <input type="text" name="company"onChange={hanldeInput} value={inputs.company}/>  
                        <input type="file" name="file" onChange={hanldeFile} multiple/>
                        {renderImage()}
                        <textarea name="detail" onChange={hanldeInput} value={inputs.detail}></textarea>
                        <button type="submit" className="btn btn-default">Add</button>
                    </form>
                </div>
            </div>          
        </>
    )
}
export default EditProduct;