import Category from '../models/category.model.js';

export const addCat = async (req, res) => {
  try {
    const { category } = req.body; 

    const newCat = new Category({
      category
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
