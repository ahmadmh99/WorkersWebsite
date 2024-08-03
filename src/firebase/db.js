import { db } from "./firebase";

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = ( id, name, email,age ) =>{
   // problem here with creating a new user there is no default of favorites value 
  
  var personFavorites = "";
  db.ref(`users/${id}`).set({
    name,
    email,
    age,
    personFavorites
  })};

//returns all users from firebase realtime db
export const onceGetUsers = () => db.ref("users").once("value");
export const doGetAnUnser = uid => db.ref(`users/${uid}`).once("value");


export const updateFavorites = (userId, userData, favoriteToDeleteId) => {
  var newPersonFavorites = [];
  
  
    if(userData){
      for (let index = 0; index < userData.personFavorites.length; index++) {
        const element = userData.personFavorites[index];
          if(element.id.value !== favoriteToDeleteId) {
            newPersonFavorites.push(element);
          }
        }
        
    
    }  
    db.ref(`users/${userId}`).update({
      personFavorites : newPersonFavorites.length == 0 ? "" : newPersonFavorites
  
    })
    
    return {personFavorites : newPersonFavorites.length == 0 ? "" : newPersonFavorites
  };
  
}


export const addToFavorite = ( id, favorites, oldPersonFavorites) =>{
  
  var favoritesArray = [];
  

  if(favorites){
    console.log("getting here");

        
    
    
      if(oldPersonFavorites !== ""){
        favoritesArray = mergeOldAndNewFavorites(oldPersonFavorites, favorites);
      }else{
        favoritesArray[0] = favorites;
      }
      if(favoritesArray){
        db.ref(`users/${id}`).update({
          personFavorites : favoritesArray
        })      }

    
   
  function mergeOldAndNewFavorites(oldArray, newData){
    var dataExist = false;
    if(oldArray && oldArray.length != 0){
      for (let index = 0; index < oldArray.length; index++) {
        const element = oldArray[index];
        console.log(element);
        if(element.cell == newData.cell){
          dataExist = true;
        }
      }
      if(!dataExist){
        oldArray[oldArray.length] = newData;
        console.log("added to Your Favorites")
        alert(newData.name.first + ' '+newData.name.last + " added to Your Favorites");
      }else{
        console.log("already exist in your Favorites list")
        alert(newData.name.first + ' '+ newData.name.last + " already exist in your Favorites list");
      }
    }
    
    
    return oldArray;
  }

  

};


}