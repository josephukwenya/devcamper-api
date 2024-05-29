const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get bootcamps
// @route     GET "/api/v1/bootcamps"
// @access    Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    success: true,
    results: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Get single bootcamp
// @route   GET "/api/v1/bootcamps/:id"
// @access  Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Create bootcamp
// @route   POST "/api/v1/bootcamps"
// @access  Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const newBootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: newBootcamp,
  });
});

// @desc    Update bootcamp
// @route   PUT "/api/v1/bootcamps/:id"
// @access  Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const updateBootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: updateBootcamp });
});

// @desc    Delete bootcamp
// @route   DELETE "/api/v1/bootcamps/:id"
// @access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!deletedBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
