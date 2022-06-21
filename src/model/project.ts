import mongoose, { model } from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    }, 
    description: {
        type: String, 
    },
    status : {
        type: String, 
        enum: ['Not started', 'In progress', ' Completed']
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId ,
    }
});

module.exports = mongoose.model('Project', ProjectSchema)