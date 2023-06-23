import User from "../models/userModel.js";
import connect from "../db/mongoDatabase.js";
import Plant from "../models/PLantModel.js";

export async function getAllUsersData() {
    try {
        await connect();
        const users = await User.find();
        const response = users.map(user => ({
            id: user._id,
            imageSrc: user.profile_img,
            name: user.username,
        }));
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllPlantsData(){
    try {
        await connect();
        const plants = await Plant.find();
        const response = plants.map(plant => ({
            id: plant._id,
            imageSrc: plant.urls.regular,
            name: plant.name,
        }));
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUserById(id){
    try{
        await connect();
        await User.deleteOne({_id: id});
        return "User deleted";
    }catch(error){
        console.log(error);
    }

}

export async function deletePlantById(id){
    try{
        await connect();
        await Plant.deleteOne({_id: id});
        return "Plant deleted";
    }catch(error){
        console.log(error);
    }

}