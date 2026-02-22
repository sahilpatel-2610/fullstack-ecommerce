const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');



app.use(cors());
app.options('*', cors())


//middleware
app.use(bodyParser.json());

// Routes
const categoryRoutes = require('./routes/categories');
const subCatSchema = require('./routes/subCat.js');
const productRoutes = require('./routes/products');
const imageUploadRoutes = require('./helper/imageUpload.js');
const productWeightRoutes = require('./routes/productWeight.js');
const productRAMSRoutes = require('./routes/productRAMS.js');

app.use("/uploads", express.static('uploads'));
app.use(`/api/category`, categoryRoutes);
app.use(`/api/subCat`, subCatSchema);
app.use(`/api/products`, productRoutes);
app.use(`/api/imageUpload`, imageUploadRoutes);
app.use(`/api/productWeight`, productWeightRoutes);
app.use(`/api/productRAMS`, productRAMSRoutes);


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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