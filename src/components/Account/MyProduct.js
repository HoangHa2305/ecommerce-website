import { useEffect, useState } from "react";
import API from "../API";
import { Link } from "react-router-dom";

function MyProduct ()
{
    const [product,setProduct] = useState('');
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let url = '/user/my-product';
    let accessToken = user.token;
    let config = {
        headers:{
            'Authorization': 'Bearer '+accessToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    };
    useEffect(()=>{
        API.get(url,config)
        .then(res=>{
            setProduct(res.data.data)
        })
    },[])

    function getIdProduct(e){
        let id = e.target.id;
        let url = '/user/product/delete/'+id;
        API.get(url,config)
        .then(res=>{
            setProduct(res.data.data)
        })
    }

    function fetchData(){
        if(Object.keys(product).length>0){
            return Object.keys(product).map((key,index)=>{
                const image = JSON.parse(product[key].image)
                return (
                    <tr>
                            <td className="cart_quantity">1</td>
                            <td className="cart_description">
                                <p><a href>{product[key].name}</a></p>
                            </td>
                            <td className="cart_product">
                                <a href><img src={"http://localhost/laravel8/public/upload/product/"+product[key].id_user+"/"+image[0]} width={50} alt="" /></a>
                            </td>                           
                            <td className="cart_price">
                                <p>${product[key].price}</p>
                            </td>
                            <td>
                                <Link className="cart_quantity_delete" to={"/account/user/product/"+product[key].id}><i className="fa fa-edit"></i></Link>
                            </td>
                            <td>
                                <a className="cart_quantity_delete" id={product[key].id} onClick={getIdProduct}><i className="fa fa-times"></i></a>
                            </td>
                    </tr>
                )
            })
        }
    }

    return (
        <section id="cart_items">
            <div class="container">
                <div className="col-sm-9">
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Image</td>
                                    <td>Price</td>            
                                    <td colSpan={2}>Action</td>   
                                </tr>           
                            </thead>
                            <tbody>
                                {fetchData()}
                            </tbody>
                        </table>
                        <Link className="btn btn-primary pull-right" to='/account/user/product/add'>Add New</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MyProduct;