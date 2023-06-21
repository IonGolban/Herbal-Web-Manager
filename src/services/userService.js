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
                user.profile_img = await uploadToImgur(value);

            }
            else if (key == "profilePhoto"){
                user.cover_img = await uploadToImgur(value);
            }
         
        }


        await user.save();

        return "Data changed";

    } catch (error) {
        console.log(error);
    }

}




