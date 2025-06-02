import Category from '../models/category.model.js';

export const addCategory = async (req, res) => {
  try {
    const { category, link } = req.body; 

    if(!category || !link){
      return res.status(400).json({message: "Bad Request"});
    }
    const newCat = new Category({
      category,
      link
    });

    await newCat.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCat,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getCategories = async (req, res) =>{
  try {
    const categories = await Category.find();
    if(!categories){
      return res.status(404).json({message: "No Categories Found"});
    }
    res.json({
      categories
    })
  } catch (error) {
    console.log(error);
  }
}
