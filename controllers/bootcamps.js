const Bootcamp = require("../models/Bootcamp");

// @desc      Get bootcamps
// @route     GET "/api/v1/bootcamps"
// @access    Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootccamp.find();

    res.status(200).json({
      success: true,
      results: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc    Get single bootcamp
// @route   GET "/api/v1/bootcamps/:id"
// @access  Public

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create bootcamp
// @route   POST "/api/v1/bootcamps"
// @access  Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: newBootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update bootcamp
// @route   PUT "/api/v1/bootcamps/:id"
// @access  Private

exports.updateBootcamp = async (req, res, next) => {
  try {
    const updateBootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: updatedBootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete bootcamp
// @route   DELETE "/api/v1/bootcamps/:id"
// @access  Private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!deletedBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
