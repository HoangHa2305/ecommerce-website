import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import API from "../API";

function Rate(props)
{
    let {params} = props;
    const [rating, setRating] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{
      API.get('/blog/rate/'+params.id)
      .then(response=>{
          let rate = response.data.data;
          let sum = 0;
          let count = 0;
          let star = 0;
          if(Object.keys(rate).length>0){
            Object.keys(rate).map((key,index)=>{
              sum += rate[key].rate;
              count++;
            })
            star = sum/count;
            // // star = parseFloat(star).toFixed(1);
            // // setRating(star);
            // star = parseInt(star)
            setRating(star)
          }
      })
      .catch(function(error){
          console.log(error)
      })
    },[]);

    let url = '/blog/rate/' + params.id;
    let accessToken = user.token;
    let config = {
        headers:{
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    function changeRating( newRating, name ) {
      if(user){
        setRating(newRating);

        const formData = new FormData();
        formData.append('blog_id',params.id);
        formData.append('user_id',user.Auth.id);
        formData.append('rate',newRating);
        
        API.post(url,formData,config)
        .then(response=>{
          console.log(response)
        })
      }else{
        alert("Vui long dang nhap")
      }
    }   
       
    // rating = 2;
    return (
      <StarRatings
        rating={rating}
        starRatedColor="#FE980F"
        changeRating={changeRating}
        numberOfStars={5}
        name='rating'
      />
    );
}
export default Rate;