  import imgur from 'imgur';
  import dotenv from 'dotenv';
  import fs from 'fs';
  dotenv.config();

  export async function uploadToImgur(path) {
    const clientId = "9f8611934da5e73";
    console.log(clientId); 
    const client = new imgur.ImgurClient({ clientId: clientId });

    const response = await client.upload({
      image: fs.createReadStream(path)
    });
    if(response.success === false) throw new Error("Error uploading image to imgur or type of file is not supported");
    // console.log(response);
    return response.data.link;

  }