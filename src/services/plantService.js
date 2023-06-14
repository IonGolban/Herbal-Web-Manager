import connect from "../db/mongoDatabase.js";
import Plant from '../models/PLantModel.js';
import User from '../models/userModel.js';
import TokenUtils from "../util/tokenUtils.js";
class PlantService {

    async searchByKey(key) {
        try {
            console.log(key);
            await connect();
            const plants = await Plant.find({
                $or: [
                    { tags: { $regex: key , $options: 'i' } }
                ]
            }).sort({ likes: -1 }).limit(10);

            if (plants.length === 0) {
                return ["No results found"];
            }

            const response = plants.flatMap(plant => plant.tags.filter(tag => new RegExp(key).test(tag) ));
            const uniqueTags = [...new Set(response)]; 
            return uniqueTags;

        } catch (error) {
            console.log(key);

           console.error(error);
        };
    }

    async viewPlantPhoto(url, user_id) {
        try{
            await connect();

            const plant = await Plant.findOne({"urls.regular" : url.url});

            plant.views++;
            //console.log(plant);

            await plant.save();

        } catch (error) {
            console.log(error);
        }
    }

    async likePlant(url,user_id) {
        try {
            await connect();
            const user = await User.findOne({ _id:user_id.id });
            const plant = await Plant.findOne({ "urls.regular": url.url });
        
            if (user && user.liked_photos.some(photo => photo._id.toString() === plant._id.toString())) {
                return "You have already liked this photo";
            }
            
            console.log(plant);
            plant.likes++;

            await plant.save();
           
            if (user) {
                if (!user.liked_photos) {
                  user.liked_photos = [];
                }
                user.liked_photos.push(plant._id);
                await user.save();
            }            

            return plant.likes;
        } catch (error) {
            console.error(error);
        }
            
    }
    async getLikedPlants(_id){
        await connect();
        const user = await User.findById(_id);
        let photos = [];

        for(const id of user.liked_photos){
            const plant = await Plant.findOne({_id : id});
            photos.push({url:id.urls.regular,description: plant.description}); 
        }

        return photos;

    }
}

export default new PlantService();