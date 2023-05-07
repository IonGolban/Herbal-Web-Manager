import unsplash from "../api/unsplash.js";

class CatalogService{
    async getRandomImages(count){
        const result = await unsplash.photos.getRandom({ query: 'plants', count });
        const getByResult = await unsplash.photos.get({ photoId: 'EaPV5Z7VTY4' });
        const photos = result.response.map(pic => ({ url : pic.urls.regular , desc : pic.atl_description }));
        console.log(getByResult.response);
        // console.log(result.response.tags);
        // console.log(photo.response);
        return photos;
    }
    async getImagesByTag(query){
        const result = await unsplash.search.getPhotos({query, count});
        const photos = result.response.results.map(pic => pic.urls.regular);
        return photos;
    }
}

export default new CatalogService();