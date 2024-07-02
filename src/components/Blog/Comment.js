import { useState } from "react";
import API from "../API";

function Comment(props)
{
    let {params} = props
    let {idCmt} = props
    const [comment,setComment] = useState("");

    const hanldeComment = (e) => {
        setComment(e.target.value)
    }
    function hanldeSubmit(e){
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        let url = '/blog/comment/' + params.id;
        let accessToken = user.token;
        let config = {
            headers:{
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        if(user){
            if(comment == ""){
                alert("Vui long nhap cmt")
            }else{
                const formData = new FormData();
                formData.append('id_blog',params.id);
                formData.append('id_user',user.Auth.id);
                if(idCmt){
                    formData.append('id_comment',idCmt);
                }else{
                    formData.append('id_comment',0);
                }
                formData.append('comment',comment);
                formData.append('image_user',user.Auth.avatar);
                formData.append('name_user',user.Auth.name);
                
                API.post(url,formData,config)
                .then(response => {
                    props.getCmt(response.data.data)
                })
            }
        }else{
            alert("Vui long dang nhap")
        }
    }

    return (
        <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12" id="cmt">
                    <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <form action="" onSubmit={hanldeSubmit} >
                                <textarea name="message" onChange={hanldeComment} rows={11} />
                                <button className="btn btn-primary" type="submit">post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Comment;