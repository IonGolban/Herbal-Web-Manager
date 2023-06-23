import connect from "../db/mongoDatabase.js";
import User from '../models/userModel.js';
import Plant from '../models/PLantModel.js';
import Collection from "../models/collectionModel.js";
import {uploadToImgur} from "../services/uploadService.js";

export async function editInfo(fields, user_id){

    try{

        await connect();
        
        const user = await User.findOne({_id: user_id.id});

        for (const key in fields) {
            const value = fields[key];
            if(key == "email"){
                user.email = value;
            }
            else if(key == "description"){
                user.description = value;
            }
            else if (key == "coverPhoto"){
                user.cover_img = await uploadToImgur(value);

            }
            else if (key == "profilePhoto"){
                user.profile_img = await uploadToImgur(value);
            }
         
        }


        await user.save();

        return "Data changed";

    } catch (error) {
        console.log(error);
    }
}

export async function getData(user_id){

    try {

        await connect();
        const user = await User.findOne({_id: user_id.id});
        const { description, cover_img, profile_img, liked_photos, uploaded_plants, collections } = user;

        const newUserObject = {
            description,
            cover_img,
            profile_img,
            liked_photos,
            uploaded_plants,
            collections
          };


        console.log(newUserObject);
        await user.save();

        return newUserObject;

    } catch (error) {
        console.log(error);
    }

}

export async function getStatLikedPlantsCSV(){
    try{
        await connect();
        const plants = await Plant.find().sort({likes: -1}).limit(100);

        let csv = "name,likes\n";
        plants.forEach(plant => {
            csv += `${plant.name},${plant.likes}\n`;
        });

        return csv;
    } catch (error) {
        console.log(error);
    }
}

export async function getStatLikedPlantsJSON(){
    try{
        await connect();
        const plants = await Plant.find().sort({likes: -1}).limit(100);

        return plants;
    } catch (error) {
        console.log(error);
    }
}

export async function deletePlantFromUser(user_id, plant_id){

    try {

        await connect ();

        let user = await User.findOne({_id: user_id.id});

        const index = user.liked_photos.findIndex((photo) => photo._id === plant_id);

        if (index !== -1) {
        user.liked_photos.splice(index, 1);
        }

        await user.save();

        return "Stergere din liked cu succes!";

    } catch (error) {
        console.log(error);
    }

}

export async function deletePlantFromUserCollection(collection_id, plant_id){

    try{

        await connect();

        const colectie = await Collection.findOne({_id: collection_id});


        const plantIndex = colectie.plants.findIndex((plant) => plant._id === plant_id);

        if(plantIndex != -1){
            colectie.plants.splice(plantIndex, 1);
        }

        await colectie.save();

        return "Stergere din colectie cu succes!";


    } catch (error) {
        console.log(error);
    }

}

export async function deletePhotoUpdated(user_id, plant_id){

    try{
        console.log(plant_id);

        await connect();

        let user = await User.findOne({_id: user_id.id});

        await Plant.deleteOne({_id: plant_id});

        const uploadIndex = user.uploaded_plants.findIndex((photo) => photo.id === plant_id);

        if(uploadIndex != -1) 
        {
            user.uploaded_plants.splice(uploadIndex, 1);
        }

        await user.save();

        return "Stergere din upload cu succes!";

    } catch (error) {
        console.log(error);
    }

}

export async function deleteUserCollection(collection_id, user_id){

    try {

        await connect();

        await Collection.deleteOne({_id: collection_id});
        
        let user = await User.findOne({_id: user_id.id});

        const uploadIndex = user.collections.findIndex((colection) => colection._id === collection_id);

        if(uploadIndex != -1) 
        {
            user.collections.splice(uploadIndex,1);
        }
      

        user.save();

        return "Colectia a fost stearsa cu succes!";

    } catch (error) {
        console.log(error);
    }


}





