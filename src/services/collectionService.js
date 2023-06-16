import Collection from "../models/collectionModel.js";
import User from "../models/userModel.js";
import connect from "../db/mongoDatabase.js";
import Plant from "../models/PLantModel.js";

export async function createCollectionService(collection, user_id) {
    await connect();
    const user = await User.findById(user_id);
    if (!user) {
        throw new Error("User not found");
    }
    if (!user.collections) {
        user.collections = [];
    }
    const collectionEntity = new Collection({
        name: collection.name,
        description: collection.description,
        user_id: user_id,
        cover_img: "https://fomantic-ui.com/images/wireframe/image.png"
    });

    const createdCollection = await Collection.create(collectionEntity);
    user.collections.push({ _id: createdCollection._id });
    await user.save();

    return "Created collection";
}

export async function getCollectionByIdService(id) {
    await connect();

    const collections = await Collection.find({ user_id: id });
    if (!collections) {
        throw new Error("You don't have any collections");
    }
    for (let collection of collections) {
        if (!collection.cover_img) {
            collection.cover_img = collection.plants.length > 0 ? collection.plants[0].url : "https://fomantic-ui.com/images/wireframe/image.png";
        }
    }
    return collections;
}

export async function addPlantToCollectionService(collection_id, plant_id) {
    await connect();
    const collection = await Collection.findById(collection_id);
    if (!collection) {
        throw new Error("Collection not found");
    }
    if (!collection.plants) {
        collection.plants = [];
    }
    if (collection.plants.some(plant => plant._id.toString() === plant_id.toString())) {
        return "You have already added this plant to the collection";
    }

    collection.plants.push({ _id: plant_id });

    if (collection.cover_img == "https://fomantic-ui.com/images/wireframe/image.png") {
        const plant = await Plant.findById(plant_id);
        collection.cover_img = plant.urls.regular;
    }

    await collection.save();
    return "Added plant to collection";
}

export async function getPlantsByCollectionIdService(collection_id) {
    try {
        await connect();
        const collection = await Collection.findById(collection_id);
        if (!collection) {
            throw new Error("Collection not found");
        }
        const result = await Plant.find({ _id: { $in: collection.plants } });
        const plants = result.map(pic => ({
            _id: pic._id,
            url: pic.urls.regular,
            desc: pic.alt_description
        }));
        console.log(plants[0]);
        return plants;
    } catch (error) {
        console.log(error);
    }
}