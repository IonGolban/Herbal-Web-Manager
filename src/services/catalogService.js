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
            url: pic.urls.regular,
            desc: pic.alt_description
        }));
        console.log(plantsUrl);
        return plantsUrl;
    }
    async getImagesByTag(query) {
        await connect();
        const result = await Plant.find({ tags: query });
        const photos = result.map(pic => ({
            url: pic.urls.regular,
            desc: pic.alt_description
        }));
        return photos;
    }

    async saveImages() {
        await connect();
        const result = await unsplash.photos.getRandom({ query: 'plants', count: 17 });
        const ids = result.response.map(pic => pic.id);
        ids.forEach(async id => {
            try {
                const photo = (await unsplash.photos.get({ photoId: id })).response;
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
                await Plant.create(plant)
                    .then((plant) => {
                        console.log(plant);
                    })
                    .catch(err => {
                        console.log(err);
                    });

            } catch (err) {
                console.log(err);
            }
        });
    }
}

export default new CatalogService();