import connect from "../db/mongoDatabase.js";
import User from '../models/userModel.js';
import Plant from '../models/PLantModel.js';
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





