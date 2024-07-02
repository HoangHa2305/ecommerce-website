import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail()
{
    let params = useParams();
    const [data,setData] = useState("");
    const [item,setItem] = useState([]);
    const [idCmt,setIdCmt] = useState("");

    useEffect(()=>{
        API.get('/blog/detail/'+params.id)
        .then(response=>{
            setData(response.data.data);
            setItem(response.data.data.comment)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])

    function fetchData()
    {
        if(Object.keys(data).length>0){
            return (
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        {/* <span>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star-half-o"></i>
                                            </span> */}
                    </div>
                    <a href>
                    <img src={"http://localhost/laravel8/public/upload/Blog/image/"+data.image} alt="" />
                    </a>
                    <p>
                    {data.content}.</p>
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    function getCmt(value){
        let arr = item.concat(value);
        setItem(arr)
    }

    function getIdCmt(value){
        setIdCmt(value)
    }

    return (
        <>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {fetchData()}
                </div>{/*/blog-post-area*/}
                <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <li>
                        <Rate params={params}/>
                    </li>
                    <li className="color">(6 votes)</li>
                </ul>
                <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href>Pink <span>/</span></a></li>
                    <li><a className="color" href>T-Shirt <span>/</span></a></li>
                    <li><a className="color" href>Girls</a></li>
                </ul>
                </div>{/*/rating-area*/}
                <div className="socials-share">
                <a href><img src="images/blog/socials.png" alt="" /></a>
                </div>{/*/socials-share*/}
                
                <div className="response-area">
                <h2>3 RESPONSES</h2>
                <ListComment item={item} getIdCmt={getIdCmt}/>					
                </div>{/*/Response-area*/}
                <Comment params={params} getCmt={getCmt} idCmt={idCmt}/>
            </div>
        </>
    );
}
export default Detail;
