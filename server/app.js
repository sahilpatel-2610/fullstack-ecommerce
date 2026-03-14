const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helper/jwt.js');



app.use(cors());
app.options('*', cors())


//middleware
app.use(bodyParser.json());
app.use(authJwt());

// Routes
const categoryRoutes = require('./routes/categories');
const subCatSchema = require('./routes/subCat.js');
const productRoutes = require('./routes/products');
const imageUploadRoutes = require('./helper/imageUpload.js');
const productWeightRoutes = require('./routes/productWeight.js');
const productRAMSRoutes = require('./routes/productRAMS.js');
const productSIZERoutes = require('./routes/productSIZE.js');
const userRoutes = require('./routes/user');


app.use("/uploads", express.static('uploads'));
app.use(`/api/category`, categoryRoutes);
app.use(`/api/subCat`, subCatSchema);
app.use(`/api/products`, productRoutes);
app.use(`/api/imageUpload`, imageUploadRoutes);
app.use(`/api/productWeight`, productWeightRoutes);
app.use(`/api/productRAMS`, productRAMSRoutes);
app.use(`/api/productSIZE`, productSIZERoutes);
app.use(`/api/user`, userRoutes);

// Error Handler
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: "The user is not authorized" })
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({ message: err })
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message || "Internal Server Error" });
})

//Database
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database Connection is ready...');
        //server
        app.listen(process.env.PORT, () => {
            console.log(`server is running http://localhost:${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })