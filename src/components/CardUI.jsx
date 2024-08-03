import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { auth} from '../firebase/firebase';
import { db } from '../firebase';

const CardUI = props => {

    var [favoritesObject, setFavoritesObject] = useState({});
    
    
    
    
    function addToFavorites(){

        return new Promise(async (resolve, reject) => {
                console.log("card",props.card);
                console.log(props.userDetails);
                db.addToFavorite(auth.currentUser.uid, props.card, props.userDetails.personFavorites);
          
                        
 
 
           resolve();
           })
           
        
        
    }
    
    function deleteFavorites(id){
        return new Promise(async (resolve, reject) => {
            
            const newValues = await db.updateFavorites(auth.currentUser.uid, props.userDetails, id)
                        
           resolve(newValues);
           }).then((e)=>{
            window.location.href = 'home';
            props.updateFavoritesObject(e);
           }
           )
           
        
    }
    console.log("asdasd",props);
    return (
        
        
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.image} alt="image1" className="card-img-top"/>
            </div>
          <div className="card-body text-dark">
           <h4 className="card-title">{props.title}</h4>
           <p className ="card-text text-secondary">
               Age : {props.card.dob.age}
           </p>
           <p className ="card-text text-secondary">
               Country : {props.card.location.country}
           </p>
        {
            props.isFavorite ?
             <div className='d-flex justify-content-around'>
           
            <Button onClick={() => deleteFavorites(props.cardId)}>Delete</Button>
            </div>
            :
           <Button onClick={addToFavorites}>Add To Favorites</Button>
           
           }
           
          </div>
          <Link className="btn btn-outline-primary" to={{pathname:'/card/' + props.cardId, card: props.card}}>
             more details
            </Link>
        </div>
    )
}

export default CardUI;
