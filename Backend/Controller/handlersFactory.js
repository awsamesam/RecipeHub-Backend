const asyncHandler = require("../Middleware/asyncHandler");
const ApiFeatures = require("../utils/apiFeatures");
// desc    Create a new Recipe
//  route   POST /api/recipe
// @access
module.exports.post = (Model) =>
  asyncHandler(async (req, res) => {
    // إذا كان هناك ملف مرفوع عبر multer، نضيفه إلى الـ req.body
    if (req.file) {
      req.body.coverImage = req.file.filename; // أو المسار الذي ترغب بحفظه في قاعدة البيانات
    }
    req.body.user = req.user.id;
    const model = new Model(req.body);
    await model.save();
    res.status(201).json({ message: "Added successfully", model });
  });
// desc    Get recipe
//  route   GET /api/recipe
// @access
module.exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .search();

    const totalDocuments = await Model.countDocuments(
      apiFeatures.mongooseQuery.getFilter(),
    );
    apiFeatures.sort().fields().paginate(totalDocuments);
    const model = await apiFeatures.mongooseQuery.populate("user", "email");
    res.status(200).json({
      message: "successful",
      result: model.length,
      paginationResult: apiFeatures.paginationResult,
      model,
    });
  });
// desc    Get recipe with user
//  route   GET /api/recipe/my-recipes
// @access
module.exports.getMyRecipes = (Model) =>
  asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(
      Model.find({ user: req.user.id }),
      req.query,
    )
      .filter()
      .search();
    const totalDocuments = await Model.countDocuments(
      apiFeatures.mongooseQuery.getFilter(),
    );
    apiFeatures.sort().fields().paginate(totalDocuments);
    const model = await apiFeatures.mongooseQuery;
    res.status(200).json({
      message: "successful",
      user: {
        id: req.user.id,
        email: req.user.email,
      },
      result: model.length,
      paginationResult: apiFeatures.paginationResult,
      model,
    });
  });
// desc    Get recipe
//  route   Get /api/recipe/:Id
// @access
module.exports.getOne = (Model) =>
  asyncHandler(async (req, res) => {
    const model = await Model.findById(req.params.Id);
    if (!model) {
      return res
        .status(404)
        .json({ message: `Not Found This ID ${req.params.Id}` });
    }
    res.status(200).json({ message: "successful", model });
  });
// desc    UPDATE a new recipe
//  route   Put /api/recipe/:Id
// @access
module.exports.update = (Model) =>
  asyncHandler(async (req, res) => {
    const recipe = await Model.findById(req.params.Id);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: `Not Found This ID ${req.params.Id}` });
    }
    if (recipe.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this recipe" });
    }

    // إذا قام المستخدم برفع صورة جديدة أثناء التحديث، نضيفها للبيانات المُحدثة
    if (req.file) {
      req.body.coverImage = req.file.filename;
    }

    const model = await Model.findByIdAndUpdate(
      req.params.Id,
      {
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        coverImage: req.body.coverImage,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({ message: "successful Update", model });
  });
// desc    DELETE a new recipe
//  route   DELETE /api/recipe/:Id
// @access
module.exports.delete = (Model) =>
  asyncHandler(async (req, res) => {
    const recipe = await Model.findById(req.params.Id);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: `Not Found This ID ${req.params.Id}` });
    }
    if (recipe.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this recipe" });
    }
    const model = await Model.findByIdAndDelete(req.params.Id);

    res.status(200).json({ message: "successful Delete", model });
  });
