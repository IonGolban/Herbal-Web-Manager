
export default async function getBodyFromReq(req) {
    let data = "";
    await req.on("data", (chunk) => {
        data += chunk;
    });
    data = JSON.parse(data);
    return data;
}