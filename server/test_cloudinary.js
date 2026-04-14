require('dotenv/config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

async function testCloudinaryUpload() {
    try {
        const fs = require('fs');
        fs.writeFileSync('dummy_vid.mp4', Buffer.alloc(2 * 1024 * 1024)); // 2MB dummy

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
            resource_type: "auto"
        };
        console.log("Uploading with upload()...");
        const result = await cloudinary.uploader.upload('dummy_vid.mp4', options);
        console.log("Success:", result.secure_url);
        process.exit(0);
    } catch (error) {
        console.error("Cloudinary Error:", error);
        process.exit(1);
    }
}

testCloudinaryUpload();
