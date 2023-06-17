import imgur from 'imgur';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

export async function uploadToImgur(imageFile) {
  const clientId = "9f8611934da5e73";
  console.log(clientId); 
  const client = new imgur.ImgurClient({ clientId: clientId });
  console.log(imageFile[0].filepath); 
  
  const response = await client.upload({
    image: fs.createReadStream(imageFile[0].filepath)
  });
  console.log(response.data.link);
  return response.data.link;

}