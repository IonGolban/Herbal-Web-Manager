import formidable from "formidable";
import fs from "fs";
import PDFDocument from "pdfkit";
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
            resolve({ fields, files });
        });
    });

}

export function parseToCSV(csvData,path) {
    fs.writeFileSync(path, csvData, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export async function parseToPDF(category, statistics, path) {
    const doc = new PDFDocument;
    const stream = fs.createWriteStream(path);
    doc.pipe(stream);

    doc.fontSize(20).text('Statistics', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`By ${category}s`, { align : "center",underline: true });
    doc.moveDown();

    statistics.forEach((statistic, index) => {
        doc.text(`${index + 1}. ${statistic.name}: ${statistic.value}`);
        doc.moveDown();
    });

    doc.end();

}