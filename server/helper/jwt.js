var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
    return jwt({
        secret: secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            // List all public routes that do NOT require a token
            { url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/products\/recentlyViewed(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/category(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/subCat(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/imageUpload(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productWeight(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productRAMS(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productSIZE(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            `/api/user/signin`,
            `/api/user/signup`,
        ]
    })
}

module.exports = authJwt;
