import connect from "../db/mongoDatabase.js";
import User from '../models/userModel.js';

class EditService{

    async editInformation(newData, user_id){

        try{

            await connect();
            
            const user = await User.findOne({_id: user_id.id});
            const data = JSON.parse(newData);

            for (const key in data) {
                const value = data[key];
                if(key == "email"){
                    user.email = value;
                }
                else if(key == "description"){
                    user.description = value;
                }
                else if(key == "profile_img"){
                    console.log("TODO");
                }
                else if(key == "cover_img"){
                    console.log("TODO");
                }
            }

            await user.save();

            console.log("Datele au fost schimbate");
            return user;

        } catch (error) {
            console.log(error);
        }

    }

}

export default new EditService();