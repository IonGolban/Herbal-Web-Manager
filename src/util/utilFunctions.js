import formidable from "formidable";
export async function getBodyFromReq(req) {
    let data = "";
    await req.on("data", (chunk) => {
        data += chunk;
    });
    data = JSON.parse(data);
    return data;
}

export async function getFormDataFromRequest(req) {
    return new Promise((resolve, reject) => {
        const formData = formidable({ multiples: true });

        formData.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            // console.log(fields,files);
            console.log(files);
            resolve({ fields,files });
        });
    });

}