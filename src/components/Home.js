import { useContext, useEffect, useState } from "react";
import API from "./API";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from "react-redux";
import { addNewHobby } from "../actions/hobby";

function Home()
{
    const [getItem,setItem] = useState('');
    useEffect(()=>{
        API.get('/product')
        .then(response=>{
            setItem(response.data.data)
        })
    },[]);

    let obj = new Object();
    let user = useContext(UserContext)
    let dispatch = useDispatch();

    function addtoCart(e){   
        let id = e.target.id;
        let xx = 1; 
        let cart = localStorage.getItem("cart");   
        if(cart){
            obj = JSON.parse(cart);
            Object.keys(obj).map((key,index)=>{
                if(id==key){
                    obj[key] += 1;
                    xx = 2;
                }
            })
        }
        if(xx==1){
            obj[id] = 1;
        }  
        localStorage.setItem("cart",JSON.stringify(obj));
        let qty = Object.keys(obj).length;
        user.Soluongqty(qty);
        // console.log(qty)
        const action = addNewHobby(qty);
        dispatch(action);
    }

    // function tinhTongQty(){
    //     let cart = localStorage.getItem("cart");
    //     if(cart){
    //         cart = JSON.parse(cart);
    //         user.Soluongqty(Object.keys(cart).length);
    //     }
    // }

    function fetchData(){
        if(Object.keys(getItem).length>0){
            return Object.keys(getItem).map((value,key)=>{
                let image = JSON.parse(getItem[key].image);
                return (
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost/laravel8/public/upload/product/"+getItem[key].id_user+"/"+image[0]} alt="" />
                                    <h2>$56</h2>
                                    <p>{getItem[key].name}</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>$56</h2>
                                        <Link to={'/product/detail/'+getItem[key].id}>
                                            <p>{getItem[key].name}</p>
                                        </Link>
                                        <a id={getItem[key].id} onClick={addtoCart} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
            <h2 className="title text-center">Features Items</h2>
            {fetchData()}
            </div>{/*features_items*/}
            <div className="category-tab">{/*category-tab*/}
            <div className="col-sm-12">
                <ul className="nav nav-tabs">
                <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                <li><a href="#kids" data-toggle="tab">Kids</a></li>
                <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                </ul>
            </div>
            <div className="tab-content">
                <div className="tab-pane fade active in" id="tshirt">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="blazers">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="sunglass">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="kids">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="poloshirt">
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
            <h2 className="title text-center">recommended items</h2>
            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                <div className="item active">	
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="item">	
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                <i className="fa fa-angle-left" />
                </a>
                <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                <i className="fa fa-angle-right" />
                </a>			
            </div>
            </div>{/*/recommended_items*/}
        </div>
    )
}
export default Home;