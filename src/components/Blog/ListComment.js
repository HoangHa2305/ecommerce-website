import { useState } from "react";

function ListComment(props)
{
    let {item} = props;
    function repCmt(e)
    {
        props.getIdCmt(e.target.id);
    }

    function listComment()
    {
        if(item.length>0){
            return item.map((value,key)=>{
                if(value.id_comment==0){
                    return (
                        <>
                            <li className="media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" />{value.name_user}</li>
                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <a className="btn btn-primary" id={value.id} href="#cmt" onClick={repCmt}><i className="fa fa-reply" />Replay</a>
                                </div>
                            </li>
                            {
                                item.map((child,key)=>{
                                    if(child.id_comment==value.id){
                                        return (
                                            <li className="media second-media">
                                                <a className="pull-left" href="#">
                                                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                                                </a>
                                                <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user" />{child.name_user}</li>
                                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                    </ul>
                                                    <p>{child.comment}</p>
                                                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </>
                    )
                }
               
            })
        }
    }
    
    return (
        <ul className="media-list">
            {listComment()}
        </ul>
    )
}
export default ListComment;