import { useContext, useEffect, useState } from "react";
import API from "../API";
import { UserContext } from "../../UserContext";

function Cart()
{
    const [data,setData] = useState('');
    const cart = localStorage.getItem("cart");
    let subtotal = 0;
    
    useEffect(()=>{
        API.post('product/cart',cart)
        .then((response)=>{
            setData(response.data.data)
        })
    },[]);

    function hanldePlus(e){
        let id = e.target.id;
        console.log(id);

        if(cart){
            let obj = JSON.parse(cart);
            Object.keys(obj).map((key,index)=>{
                if(id==key){
                    obj[key]++;
                }
            })
            localStorage.setItem("cart",JSON.stringify(obj));

            // copy data ra 1 data moi 
            let newData = [...data]
            newData.map((value,key)=>{
                if(id==value.id){
                    newData[key].qty++;
                }
            })
            setData(newData);
        }
    }

    function hanldeDetrimental(e){
        let id = e.target.id;

        if(cart){
            let obj = JSON.parse(cart);
            Object.keys(obj).map((key,index)=>{
                if(id==key){
                    obj[key]--;
                }
                if(obj[key]==0){
                    delete obj[key];
                }
            })
            localStorage.setItem("cart",JSON.stringify(obj));

            let newData = [...data];
            newData.map((value,key)=>{
                if(id==value.id){
                    newData[key].qty--;
                }
                if(newData[key].qty==0){
                    delete newData[key];
                }
            })
            setData(newData);
        }
    }

    function hanldeDelete(e){
        let id = e.target.id;

        if(cart){
            let obj = JSON.parse(cart);
            Object.keys(obj).map((key,index)=>{
                if(id==key){
                    delete obj[key];
                }
            })
            localStorage.setItem("cart",JSON.stringify(obj));

            let newData = [...data];
            newData.map((value,key)=>{
                if(id==value.id){
                    delete newData[key];
                }
            })
            setData(newData);
        }
    }

    function renderData(){
        return (
            Object.keys(data).map((key,value)=>{
                let image = JSON.parse(data[key].image);
                let total = data[key].price * data[key].qty;
                subtotal += total;
               return (
                    <tr>
                        <td className="cart_product">
                            <a href><img src={"http://localhost/laravel8/public/upload/product/"+data[key].id_user+"/small_"+image[0]} alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{data[key].name}</a></h4>
                            <p>Web ID: 1089772</p>
                        </td>
                        <td className="cart_price">
                            <p>${data[key].price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" id={data[key].id} onClick={hanldePlus}> + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value={data[key].qty} autoComplete="off" size={2} />
                                <a className="cart_quantity_down" id={data[key].id} onClick={hanldeDetrimental}> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${total}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete"><i className="fa fa-times" id={data[key].id} onClick={hanldeDelete} /></a>
                        </td>
                    </tr>
                )
            })
        )
    }
    return (
        <div className="col-sm-9 padding-right">
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                    </div>
                    <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description" />
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td />
                        </tr>
                        </thead>
                        <tbody>
                            {renderData()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </section> {/*/#cart_items*/}
            <section id="do_action">
            <div className="container">
                <div className="heading">
                <h3>What would you like to do next?</h3>
                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <div className="chose_area">
                    <ul className="user_option">
                        <li>
                        <input type="checkbox" />
                        <label>Use Coupon Code</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Use Gift Voucher</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Estimate Shipping &amp; Taxes</label>
                        </li>
                    </ul>
                    <ul className="user_info">
                        <li className="single_field">
                        <label>Country:</label>
                        <select>
                            <option>United States</option>
                            <option>Bangladesh</option>
                            <option>UK</option>
                            <option>India</option>
                            <option>Pakistan</option>
                            <option>Ucrane</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field">
                        <label>Region / State:</label>
                        <select>
                            <option>Select</option>
                            <option>Dhaka</option>
                            <option>London</option>
                            <option>Dillih</option>
                            <option>Lahore</option>
                            <option>Alaska</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field zip-field">
                        <label>Zip Code:</label>
                        <input type="text" />
                        </li>
                    </ul>
                    <a className="btn btn-default update" href>Get Quotes</a>
                    <a className="btn btn-default check_out" href>Continue</a>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>$59</span></li>
                        <li>Eco Tax <span>$2</span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span>${subtotal}</span></li>
                    </ul>
                    <a className="btn btn-default update" href>Update</a>
                    <a className="btn btn-default check_out" href>Check Out</a>
                    </div>
                </div>
                </div>
            </div>
            </section>{/*/#do_action*/}
        </div>
    )
}
export default Cart;