import Goal from "../models/goal.model.js";

export const addGoal = async (req, res) =>{
    try {
        const {goal ,year, category} = req.body;
        const newGoal = new Goal({
            goal,
            year,
            category
    });
    if(!newGoal){
        console.log('Failed for errors');
    } 
    await newGoal.save();
    res.status(200).json({
        message: "Goal created successfullt"
    })
    } catch (error) {
        
    }
}
export const getGoalForClass = async (req, res) =>{
    try {
        const goalsForClass = await Goal.find({category: "Class"});
        res.status(200).json(
            {
                goalsForClass
            }
        )
    } catch (error) {
        
    }
}