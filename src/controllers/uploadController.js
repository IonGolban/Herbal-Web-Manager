import formidable from "formidable";
import {uploadToImgur} from "../services/uploadService.js";
export async function uploadPhoto(req, res) {
    console.log("a intrat in uploadPhoto");

    const { description, altDescription, tags, imageFile } = await getFormDataFromRequest(req);

    console.log('Description:', description);
    console.log('Alt Description:', altDescription);
    console.log('Tags:', tags);
    console.log('Image:', imageFile);

    const imageLink = await uploadToImgur(imageFile);
    console.log('Image link:', imageLink);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Upload complete!' }));
}

async function getFormDataFromRequest(req) {
    return new Promise((resolve, reject) => {
        const formData = formidable({ multiples: true });

        formData.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const { description, altDescription, tags } = fields;
            const imageFile = files.image;

            resolve({ description, altDescription, tags, imageFile });
        });
    });

}