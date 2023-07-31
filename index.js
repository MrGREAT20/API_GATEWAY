const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const BOOKING_PORT = process.env.BOOKING_PORT;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 2 minutes)
});
app.use(morgan('combined'));
app.use(limiter); //pehle rate limit hoga 


// fir yeh middleware call hoga, middleware me pehle humne check kiya ki authorized insaan hai kya
app.use('/bookingservice', async (req, res, next) => {
    console.log(req.headers['x-access-token']);
    try {
        const response = await axios.get('http://localhost:3001/api/v1/isauthenticated', {
            headers : {
                'x-access-token' : req.headers['x-access-token']
            }
        });
        console.log(response.data);
        if(response.data.success){  //agar authorized insaan hai toh next() middleware call hoga
            next();
        }
        else{
            return res.status(401).json({
                message:'Unauthorized',
            });
        }
    } catch (error) {
        return res.status(401).json({
            message:'Unauthorized',
        });
    }
})

//yeh he next middleware
app.use('/bookingservice', createProxyMiddleware({ target: `http://localhost:${BOOKING_PORT}/` }));

/**
 * iska matlab abhi koi user agar "localhost:3004/bookingservice/api/v1/info" pe jayega toh voh redirect hoga 
 *   "localhost:3002/bookingservice/api/v1/info" 
 * 
 * 
 * this is the magic of proxy-middleware
 */
app.get('/home', (req, res) => {
    return res.json({message:'Ok'});
})
app.listen(PORT, () => {
    console.log('Server started at', PORT);
}); 