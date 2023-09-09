import mongoose from 'mongoose';

export async function mongoInstance () {
    console.log('trying to connect...');
    await mongoose.connect('mongodb://localhost:27017');
    console.log('connected to mongoDb');
}
