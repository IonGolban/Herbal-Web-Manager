import connect from "../db/mongoDatabase.js";
import Plant from '../models/PLantModel.js';


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

}

export default new PlantService();