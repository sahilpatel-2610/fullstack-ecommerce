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
const productsRoutes = require('./routes/products');

app.use(`/api/category`, categoryRoutes);
app.use(`/api/products`, productsRoutes);


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


// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');


// app.use(cors());
// app.options('*', cors());

// // Middleware
// app.use(bodyParser.json());


// // Routes
// const categoryRoutes = require('./routes/categories');
// const productRoutes = require('./routes/products');

// app.use(`/api/category`, categoryRoutes);
// app.use(`/api/products`, productRoutes);

// // Database
// mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Database Connecttion is ready...');

//     const PORT = process.env.PORT || 4000;
//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     });
// })
// .catch((err) => {
//     console.log(err);
// });



// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');



// app.use(cors());
// app.options('*', cors())

// // Middleware
// app.use(bodyParser.json());

// //Routes
// const categoryRoutes = require('./routes/categories');
// const productRoutes = require('./routes/products');

// app.use(`/api/category`, categoryRoutes);
// app.use(`/api/products`, productRoutes);

// // Database Connection
// mongoose.connect(process.env.CONNECTION_STRING)
//     .then(() => {
//         console.log('Database Connection is ready...');

//         // Start Server
//         const PORT = process.env.PORT || 4000;
//         app.listen(PORT, () => {
//             console.log(`Server is running http://localhost:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Database connection failed:', err.message);
//     });


// // Handle Unhandled Promise Rejections

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);

//   // Production ma process exit karavvu better che
//   // process.exit(1);
// });



// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');

// import cors from "cors";

// // Middleware 
// app.use(cors({
//   origin: "http://localhost:3001",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(bodyParser.json());

// // Routes
// const categoriesRoutes = require('./routes/categories');
// const productsRoutes = require('./routes/products');

// app.use('/api/category', categoriesRoutes);
// app.use('/api/products', productsRoutes);

// // Database Connection
// mongoose.connect(process.env.CONNECTION_STRING)
//   .then(() => {
//     console.log('Database Connection is ready...');

//     const PORT = process.env.PORT || 4000;
//     app.listen(PORT, () => {
//       console.log(`Server is running http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err.message);
// });