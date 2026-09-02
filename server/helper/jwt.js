var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
    return jwt({
        secret: secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            // Management and Public API Routes
            { url: /\/api\/products(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/category(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/subCat(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/imageUpload(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/productWeight(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/productRAMS(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/productSIZE(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/homeBanner(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/homeSideBanners(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/homeBottomBanners(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/sidebarBanners(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/newsletter(.*)/, methods: ['GET', 'POST', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/search(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productReviews(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/cart(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/my-list(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/checkout(.*)/, methods: ['GET', 'POST', 'OPTIONS'] },
            { url: /\/api\/orders(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/user(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            `/api/user/signin`,
            `/api/user/signup`,
            `/api/user/authWithGoogle`,
        ]
    })
}

module.exports = authJwt;
