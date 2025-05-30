import mongoose from 'mongoose';

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('connectiion occured successfully');
    }
    catch(error){
        console.log('connection error occured'+ error);
    }
}