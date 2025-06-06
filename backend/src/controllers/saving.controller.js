import UserSaving from "../models/saving.model.js";

export const addOrUpdateMonthlySaving = async (req, res) => {
  try {
    const { categoryName, year, month, amount } = req.body;
    const userId = req.user._id;
    if (!userId || !categoryName || !year || !month || amount === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let userSaving = await UserSaving.findOne({ userId });

    if (!userSaving) {
      userSaving = new UserSaving({ userId, categories: [] });
    }

    let category = userSaving.categories.find(cat => cat.name === categoryName);

    if (!category) {
      category = {
        name: categoryName,
        goal: 1000,
        yearlySavings: [],
      };
      userSaving.categories.push(category);
    }

    let yearSaving = category.yearlySavings.find(y => y.year === year);

    if (!yearSaving) {
      yearSaving = {
        year,
        months: Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "long" }),
          saved: 0,
        })),
      };
      category.yearlySavings.push(yearSaving);
    }


    const monthSaving = yearSaving.months.find(m => m.month === month);
    if (monthSaving) {
      monthSaving.saved = amount;
    } else {
      yearSaving.months.push({ month, saved: amount });
    }

    await userSaving.save();

    res.status(200).json({ message: "Monthly saving updated successfully.", userSaving });
  } catch (error) {
    console.error("Error updating monthly saving:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const deleteUserSavingById = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const deleted = await UserSaving.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found." });
    }

    res.status(200).json({ message: "User savings record deleted successfully." });
  } catch (error) {
    console.error("Error deleting user saving record:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const updateSpecificMonthSaving = async (req, res) => {
    try {
      const userId = req.user._id; 
      const { id } = req.params;  
      const { categoryName, year, month, amount } = req.body;
  
      if (!id || !categoryName || !year || !month || amount === undefined) {
        return res.status(400).json({ message: "id, categoryName, year, month, and amount are required." });
      }
  
      const updated = await UserSaving.findOneAndUpdate(
        { _id: id, userId },
        {
          $set: {
            "categories.$[cat].yearlySavings.$[ys].months.$[m].saved": amount,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "cat.name": categoryName },
            { "ys.year": year },
            { "m.month": month },
          ],
        }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Record not found or update failed." });
      }
  
      res.status(200).json({ message: "Month saving updated successfully.", updated });
    } catch (error) {
      console.error("Error updating specific month saving:", error);
      res.status(500).json({ message: "Server error. Please try again." });
    }
};

export const getSavingsForClass = async (req, res) => {
  try {
    const userId = req.user._id;

    const savings = await UserSaving.find({
      userId,
      "categories.name": "Class Service",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      savings,
    });
  } catch (error) {
    console.error("Error fetching savings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getSavingsForLand = async (req, res) => {
  try {
    const userId = req.user._id;

    const savings = await UserSaving.find({
      userId,
      "categories.name": "Land",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      savings,
    });
  } catch (error) {
    console.error("Error fetching savings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getSavingsForDriving = async (req, res) => {
  try {
    const userId = req.user._id;

    const savings = await UserSaving.find({
      userId,
      "categories.name": "Driving Licence",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      savings,
    });
  } catch (error) {
    console.error("Error fetching savings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getSavingsForBussiness = async (req, res) => {
  try {
    const userId = req.user._id;

    const savings = await UserSaving.find({
      userId,
      "categories.name": "Bussiness Enterpreneur",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      savings,
    });
  } catch (error) {
    console.error("Error fetching savings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
