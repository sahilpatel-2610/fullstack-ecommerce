const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv/config');

async function testVideoUpload() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, { family: 4 });
        const { User } = require('./models/user');
        
        const user = await User.findOne();
        if(!user) {
            console.log("No user found");
            return;
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        console.log("Token:", token);

        const fs = require('fs');
        fs.writeFileSync('dummy.mp4', Buffer.alloc(10 * 1024 * 1024)); // 10MB dummy file
        
        const boundary = 'MyAppBoundary12345';
        const fileContent = fs.readFileSync('dummy.mp4');
        const crlf = "\r\n";
        const postDataStart = Buffer.from(
            `--${boundary}${crlf}Content-Disposition: form-data; name="images"; filename="dummy.mp4"${crlf}Content-Type: video/mp4${crlf}${crlf}`
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
testVideoUpload();
