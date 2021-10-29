const catchAsync = require('../utils/catchAsync');

// [1] RENDER COVER PAGE
exports.getCoverPage = catchAsync(async (req, res, next) => {
  res.render('coverPage');
});

// [2] Rendering Home Page: The home page displays the stats for the last workout created.
exports.getHomePage = catchAsync(async (req, res, next) => {
  res.render('homePage');
});
