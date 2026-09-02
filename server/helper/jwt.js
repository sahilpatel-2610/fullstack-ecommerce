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
            { url: /\/api\/imageUpload(.*)/, methods: ['GET', 'DELETE', 'OPTIONS'] },
            { url: /\/api\/productWeight(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productRAMS(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productSIZE(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/homeBanner(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/homeSideBanners(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/homeBottomBanners(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/sidebarBanners(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/newsletter(.*)/, methods: ['GET', 'POST', 'OPTIONS'] },
            { url: /\/api\/search(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/productReviews(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/category\/upload(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/products\/upload(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/homeBanner\/upload(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/homeSideBanners\/upload(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/homeBottomBanners\/upload(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/sidebarBanners\/upload(.*)/, methods: ['POST', 'OPTIONS'] },
            { url: /\/api\/user\/get\/count(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/orders\/get\/count(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            `/api/user/signin`,
            `/api/user/signup`,
            `/api/user/authWithGoogle`,
        ]
    })
}

module.exports = authJwt;
