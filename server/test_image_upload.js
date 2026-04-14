const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv/config');

async function testImageUpload() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, { family: 4 });
        const { User } = require('./models/user');
        
        const user = await User.findOne();
        if(!user) {
            console.log("No user found");
            return;
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        const fs = require('fs');
        // create a tiny dummy image (single pixel or just some bytes)
        fs.writeFileSync('dummy.jpg', Buffer.alloc(1024)); 
        
        const boundary = 'MyAppBoundary12345';
        const fileContent = fs.readFileSync('dummy.jpg');
        const crlf = "\r\n";
        const postDataStart = Buffer.from(
            `--${boundary}${crlf}Content-Disposition: form-data; name="images"; filename="dummy.jpg"${crlf}Content-Type: image/jpeg${crlf}${crlf}`
        );
        const postDataEnd = Buffer.from(`${crlf}--${boundary}--${crlf}`);
        const bodyContent = Buffer.concat([postDataStart, fileContent, postDataEnd]);

        const response = await fetch('http://localhost:4000/api/user/upload', {
            method: 'POST',
            body: bodyContent,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Data:", data);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}
testImageUpload();
