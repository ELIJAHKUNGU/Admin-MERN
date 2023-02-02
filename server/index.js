const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv');
const nodemon = require('nodemon');
const helmet = require('helmet');
const path = require('path');
// Routes
const ClientRoutes = require("./route/clients")
const GeneralRoutes = require('./route/general')
const ManagementRoutes = require('./route/management')
const SalesRoutes = require('./route/sales')




// CONFIGURATION
dotenv.config({path:"./config.env"});
const app = express();
app.use(express.json)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// ROUTES
app.use("/client", ClientRoutes);
app.use('/general', GeneralRoutes)
app.use('management', ManagementRoutes);
app.use('/sales', SalesRoutes)

// MONGO SETUP
const PORT  = process.env.PORT || 5002
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
}).then(()  =>{
    app.listen(PORT, () =>  console.log(`SERVER CONNECTED ON PORT ${PORT}`))
}).catch((err) => console.log(`Database failed to connect ${err.message}`))