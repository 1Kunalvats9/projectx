import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dzjlp82fv',
    api_key: '174566875532991',
    api_secret: 'RACsBVyaFCNlKcI4RyT_eU_QUvM'
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64File}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
    });
    console.log(uploadResponse.secure_url)
    return Response.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
