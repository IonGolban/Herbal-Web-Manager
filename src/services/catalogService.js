import { get } from "http";
import unsplash from "../api/unsplash.js";
import Plant from "../models/PLantModel.js";
import connect from "../db/mongoDatabase.js";
import mongoose from "mongoose";

class CatalogService {


    async getRandomImages(count) {
        await connect();
        const result = await Plant.aggregate([{ $sample: { size: count } }]);
        const plantsUrl = result.map(pic => ({
            _id: pic._id,
            url: pic.urls.regular,
            desc: pic.alt_description
        }));
        
        //console.log(plantsUrl);
        return plantsUrl;
    }
    async getImagesByTag(query) {
        // await this.deleteDuplicatesFromDB();
        await connect();
        const result = await Plant.find({
            $or: [
                { tags: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } }  
            ]
        }).sort({ likes: -1 }).limit(42);

        console.log(result.length + result[0]);
        console.log(result[0]);
        const photos = result.map(pic => ({
            _id: pic._id,
            url: pic.urls.regular,
            desc: pic.alt_description
        }));
        return photos;
    }

    async deleteDuplicatesFromDB() {

        await connect();
        const result = await Plant.find();
        const ids = result.map(pic => pic.id);

        const duplicates = await Plant.aggregate([
            {
                $group: {
                    _id: { id: "$id" },
                    dups: { $push: "$_id" },
                    count: { $sum: 1 },
                    doc: { $first: "$$ROOT" },
                },
            },
            { $match: { count: { $gt: 1 } } },
        ]).allowDiskUse(true);
        console.log(duplicates.length);
        duplicates.forEach(async (doc) => {
            doc.dups.shift();
            await Plant.deleteMany({ _id: { $in: doc.dups } });
        });

    }

    async saveImages() {
        await connect();
        const result = await unsplash.photos.getRandom({ query: 'flower', count: 30 });
        console.log(result.response.length);
        result.response.forEach((pic) => console.log(pic.id));
        const filteredResult = await Promise.all(
            result.response.map(async (pic) => {
                const docs = await Plant.find({ id: pic.id }).exec();
                if (docs.length) {
                    console.log('Found:', docs.length);
                    return false;
                }
                console.log('Not found:', docs.length);
                return true;
            })
        );

        const filteredResponse = result.response.filter((_, index) => filteredResult[index]).map(pic => ({
            id: pic.id,
        }));

        console.log('Final length:', filteredResponse.length);
        for (const id of filteredResponse) {
            try {

                const photo = (await unsplash.photos.get({ photoId: id.id })).response;
                const plant = new Plant({
                    id: photo.id,
                    slug: photo.slug,
                    created_at: photo.created_at,
                    updated_at: photo.updated_at,
                    promoted_at: photo.promoted_at,
                    color: photo.color,
                    description: photo.description,
                    alt_description: photo.alt_description,
                    urls: {
                        full: photo.urls.full,
                        regular: photo.urls.regular,
                        small: photo.urls.small
                    },
                    links: {
                        self: photo.links.self,
                        html: photo.links.html,
                        download: photo.links.download,
                        download_location: photo.links.download_location
                    },
                    likes: photo.likes,
                    tags: photo.tags.map(tag => tag.title),
                    tags_preview: photo.tags.map(tag => tag.title),
                    views: photo.views,
                    downloads: photo.downloads
                });

                const createdPlant = await Plant.create(plant);
            } catch (err) {
                console.log(err);
            }
        }
    }
    async getImagesByTagFromDB(query) {
        await connect();
        const result = await Plant.find({ tags: query });
        const photos = result.map(pic => ({
            _id: pic._id,
            url: pic.urls.regular,
            desc: pic.alt_description
        }));
        return photos;
    }
}

export default new CatalogService();