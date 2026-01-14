import todoSchema from "../model/todoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const data = await todoSchema.create({
      title: title,
      userId: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Todo created",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const data = await todoSchema.find({
      userId: req.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Todo fetched",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await todoSchema.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (data) {
      return res.status(200).json({
        success: true,
        message: "Todo deleted",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const user = await todoSchema.findOne({ _id: id, userId: req.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    user.title = title;
    await user.save();
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Todo Updated",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//paginated todo
export const paginateTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // 5 todo per page

    // Calculating the skip value
    const skip = (page - 1) * limit;

    // Getting todos with pagination
    const todos = await todoSchema
      .find({ userId: req.userId })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Todos fetched as per query",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};
