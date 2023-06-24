import connect from "../db/mongoDatabase.js";
import Plant from '../models/PLantModel.js';
import User from '../models/userModel.js';
import TokenUtils from "../util/tokenUtils.js";
import {uploadToImgur} from "../services/uploadService.js";
class PlantService {

    async searchByKey(key) {
        try {
            console.log(key);
            await connect();
            const plants = await Plant.find({
                $or: [
                    { tags: { $regex: query, $options: 'i' } },
                    { name: { $regex: query, $options: 'i' } }
                ]
            }).sort({ likes: -1 }).limit(42);

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
        console.log(_id);
        const user = await User.findById(_id.id);
        let photos = [];
        for(const id of user.liked_photos){
            const plant = await Plant.findOne({_id : id});
            photos.push({url:plant.urls.regular,description: plant.description, _id: plant._id}); 
        }
        console.log(photos);
        return photos;

    }

    async savePlant(fields,imagePath,user_id){
        try {
            await connect();
            const link = await uploadToImgur(imagePath);
            console.log(link);

            console.log("fileds : ",fields);


            const plant = new Plant({
                name: fields.name[0],
                description: fields.description[0],
                alt_description: fields.altDescription[0],
                tags: fields.tags,
                urls: {
                    regular: link
                },
                likes: 0,
                views: 1,
                created_at: new Date(),
                updated_at: new Date(),
                downloads: 0,
                user_id: user_id.id
            });
            console.log(plant);
            const savedPlant = await plant.save();
            const user = await User.findById(user_id.id);
            if(!user.uploaded_plants)user.uploaded_plants = [];
            user.uploaded_plants.push(savedPlant._id);
            await user.save();

            return link;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPlantsByUser(user_id){
        try {
            await connect();
            let response = [];
            const user = await User.findById(user_id.id);
            if(!user.uploaded_plants)user.uploaded_plants = [];
            console.log(user.uploaded_plants);
            for(const id of user.uploaded_plants){
                const plant = await Plant.findById(id);
                response.push(plant);
            }

            const plants = response.map(plant => ({
                _id: plant._id,
                name: plant.name,
                url: plant.urls.regular,
                desc: plant.alt_description
            }));

            return plants;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTags(){

        try {
            await connect();
            const tagCounts = await Plant.aggregate([
                { $unwind: "$tags" },
                {
                  $group: {
                    _id: "$tags",
                    count: { $sum: 1 }
                  }
                },
                { $sort: { count: -1 } }
              ]).limit(15);
              
            const popularTags = tagCounts.map(tagCount => tagCount._id);
          

            return popularTags;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async searchByTags(tags){
        try {
            await connect();
            tags = tags.split(",");
            const plants = await Plant.find({
                $or: [
                    { tags: { $in: tags } }
                ]
            }).sort({ likes: -1 }).limit(63);

            if (plants.length === 0) {
                return ["No results found"];
            }

            const response = plants.map(plant => ({
                _id: plant._id,
                name: plant.name,
                url: plant.urls.regular,
                desc: plant.alt_description
            }));

            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new PlantService();