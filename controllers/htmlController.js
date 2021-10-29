const catchAsync = require('../utils/catchAsync');

// [1] RENDER COVER PAGE
exports.getCoverPage = catchAsync(async (req, res, next) => {
  res.render('coverPage');
});
