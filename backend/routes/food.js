const express = require('express');
const Food = require('../models/Food');

const router = express.Router();

// @desc    Get all food items
// @route   GET /api/food
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, available, search } = req.query;
    
    // Build query object
    const query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (available !== undefined) {
      query.available = available === 'true';
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const foods = await Food.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get food categories
// @route   GET /api/food/categories/list
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Food.distinct('category');
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get today's specials
// @route   GET /api/food/specials/today
// @access  Public
router.get('/specials/today', async (req, res) => {
  try {
    const specials = await Food.find({ 
      isSpecial: true, 
      available: true 
    }).limit(10);
    
    res.status(200).json({
      success: true,
      count: specials.length,
      data: specials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get food item by ID
// @route   GET /api/food/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: food
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;