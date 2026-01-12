import yup from "yup";

export const todoValidateSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "title must be atleast 3 characters")
    .max(10, "title must be atmost 10 characters")
    .required(),
});

export const validateTodo = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};
