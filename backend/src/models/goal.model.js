import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    goal:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }
});
const Goal = mongoose.model('Goal', goalSchema);
export default Goal;