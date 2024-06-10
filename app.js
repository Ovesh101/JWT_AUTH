import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import notFoundMiddleware from "./middleware/not-found.js"
import mainRouter from "./routes/main.js"
import cors from "cors"

const app = express();
dotenv.config();



// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cors())
app.use('/api/v1', mainRouter);



app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


const port = process.env.PORT || 3000;
const URL = "mongodb+srv://jwt:123@cluster0.zze3gjn.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URL)
.then(()=>{
    console.log('Database connected successfully');
    app.listen(port, () => { console.log(`Server is running on port ${port} `); });

}).catch((error) => {

    console.log(error);


})
