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

        let csv = "name,likes,description\n";
        plants.forEach(plant => {
            let description = plant.description;
            if(description == null){
                if(plant.alt_description != null) description = plant.alt_description;
                else description = "";
            } 
            csv += `${plant.name},${plant.likes},${description}\n`;
        });

        return csv;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getStatsViewsPlantsCSV(){
    try{
        await connect();
        const plants = await Plant.find().sort({views: -1}).limit(100);

        let csv = "name,views,description\n";
        plants.forEach(plant => {
            let description = plant.description;

            if(description == null){
                if(plant.alt_description != null) description = plant.alt_description;
                else description = "";
            } 
            csv += `${plant.name},${plant.views},${description}\n`;
        });

        return csv;
    }catch (error) {
        console.log(error);
        throw error;
    }

}

export async function getStatLikedPlantsPDF(){
    try{
        await connect();
        const plants = await Plant.find().sort({likes: -1}).limit(100);
        let stats = [];

        plants.forEach((plant) => {
            let description = plant.description;

            if(description == null){
                if(plant.alt_description != null) description = plant.alt_description;
                else description = "";
            } 
            let stat = {
                name: plant.name,
                value: `${plant.views} views, ${plant.likes} likes,  ${description}`
            };
            stats.push(stat);
        });

        return stats;
    } catch (error) {
        console.log(error);
    }
}

export async function getStatsViewsPlantsPDF(){
    try{
        await connect();
        const plants = await Plant.find().sort({views: -1}).limit(100);
        let stats = [];

        plants.forEach((plant) => {
            let description = plant.description;
            if(description == null){
                if(plant.alt_description != null) description = plant.alt_description;
                else description = "";
            } 
            let stat = {
                name: plant.name,
                value: `${plant.views} views,${plant.likes} likes, ${description}`
            };
            stats.push(stat);
        });

        return stats;
    } catch (error) {
        console.log(error);
    }
}

export async function getStatsTagsCSV(){
    try{
        await connect();
        const popularTags = await Plant.aggregate([
            { $unwind: "$tags" },
            {
              $group: {
                _id: "$tags",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]).limit(100);
          
        
        let csv = "name,count\n";
        popularTags.forEach(tag => {
            csv += `${tag._id},${tag.count}\n`;
        });


        return csv;
    } catch (error) {
        console.log(error);
    }
}

export async function getStatsTagsPDF(){
    try{
        await connect();
        const popularTags = await Plant.aggregate([
            { $unwind: "$tags" },
            {
              $group: {
                _id: "$tags",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]).limit(100);
          
        let stats = [];

        popularTags.forEach((tag) => {
            let stat = {
                name: tag._id,
                value: `${tag.count} plants with this tag`
            };
            stats.push(stat);
        });

        return stats;
    }catch  (error) {
        console.log(error);
        throw error;
    }
}

export async function getStatsByType(type){
    try{
        
        if(type == "like"){
            return await getStatLiked();
        }else if(type == "view"){
            return await getStatViewed();
        }else if(type == "tag"){
            return await getStatTagged();
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getStatLiked(){
    try{
        await connect();
        const plants = await Plant.find().sort({likes: -1}).limit(20);
        let stats = [];
        plants.forEach((plant) => {
            let stat = {
                key: plant.name,
                value: plant.likes
            };
            stats.push(stat);
        });

        return stats;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getStatViewed(){
    try{
        await connect();
        const plants = await Plant.find().sort({views: -1}).limit(20);
        let stats = [];
        plants.forEach((plant) => {
            let stat = {
                key: plant.name,
                value: plant.views
            };
            stats.push(stat);
        });

        return stats;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getStatTagged(){

    try{
        await connect();
        const popularTags = await Plant.aggregate([
            { $unwind: "$tags" },
            {
              $group: {
                _id: "$tags",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]).limit(20);
          
        let stats = [];

        popularTags.forEach((tag) => {
            let stat = {
                key: tag._id,
                value: tag.count
            };
            stats.push(stat);
        });

        return stats;
    }catch  (error) {
        console.log(error);
        throw error;
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



