import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import LabTest, { LabTestType, LabTestStatus } from '../models/labTest.model';
import { generateTestRecommendations } from '../services/recommendation.service';

// Get all lab tests for a user
export const getUserLabTests = async (req: Request, res: Response) => {
  try {
    const { type, limit = 10, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    
    const query: any = { userId: req.user._id };
    
    // Filter by type if provided
    if (type) {
      query.type = type;
    }
    
    const labTests = await LabTest.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const total = await LabTest.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: labTests.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: labTests
    });
  } catch (error) {
    console.error('Get lab tests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lab tests'
    });
  }
};

// Get a single lab test by ID
export const getLabTestById = async (req: Request, res: Response) => {
  try {
    const labTest = await LabTest.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: 'Lab test not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: labTest
    });
  } catch (error) {
    console.error('Get lab test error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lab test'
    });
  }
};

// Create a new lab test
export const createLabTest = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const {
      type,
      name,
      provider,
      date,
      results,
      rawFileUrl,
      notes
    } = req.body;
    
    // Calculate next test date (6 months from current test date)
    const testDate = new Date(date);
    const nextTestDate = new Date(testDate);
    nextTestDate.setMonth(nextTestDate.getMonth() + 6);
    
    const labTest = new LabTest({
      userId: req.user._id,
      type,
      name,
      provider,
      date: testDate,
      status: LabTestStatus.COMPLETED,
      results,
      rawFileUrl,
      nextTestDate,
      notes
    });
    
    await labTest.save();
    
    // Generate recommendations based on new lab test
    await generateTestRecommendations(labTest._id);
    
    res.status(201).json({
      success: true,
      data: labTest,
      message: 'Lab test created successfully'
    });
  } catch (error) {
    console.error('Create lab test error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating lab test'
    });
  }
};

// Update a lab test
export const updateLabTest = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const {
      type,
      name,
      provider,
      date,
      results,
      rawFileUrl,
      nextTestDate,
      notes
    } = req.body;
    
    let labTest = await LabTest.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: 'Lab test not found'
      });
    }
    
    labTest = await LabTest.findByIdAndUpdate(
      req.params.id,
      {
        type,
        name,
        provider,
        date,
        results,
        rawFileUrl,
        nextTestDate,
        notes,
        status: LabTestStatus.COMPLETED
      },
      { new: true }
    );
    
    // Regenerate recommendations based on updated lab test
    await generateTestRecommendations(labTest._id);
    
    res.status(200).json({
      success: true,
      data: labTest,
      message: 'Lab test updated successfully'
    });
  } catch (error) {
    console.error('Update lab test error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating lab test'
    });
  }
};

// Delete a lab test
export const deleteLabTest = async (req: Request, res: Response) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const labTest = await LabTest.findOne({
        _id: req.params.id,
        userId: req.user._id
      }).session(session);
      
      if (!labTest) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: 'Lab test not found'
        });
      }
      
      await LabTest.deleteOne({ _id: req.params.id }).session(session);
      
      // Delete related recommendations (this would be in a separate collection)
      // await Recommendation.deleteMany({ labTestId: req.params.id }).session(session);
      
      await session.commitTransaction();
      session.endSession();
      
      res.status(200).json({
        success: true,
        message: 'Lab test deleted successfully'
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Delete lab test error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting lab test'
    });
  }
};

// Upload a lab test file (handle file upload and parsing)
export const uploadLabTestFile = async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would handle file upload, storage,
    // and potentially parsing of lab test results from PDF/images
    
    // Mock implementation returning success
    res.status(200).json({
      success: true,
      fileUrl: 'https://storage.example.com/lab-tests/sample.pdf',
      message: 'Lab test file uploaded successfully'
    });
  } catch (error) {
    console.error('Upload lab test file error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading lab test file'
    });
  }
};

// Get test history metrics for charts
export const getLabTestHistory = async (req: Request, res: Response) => {
  try {
    const { testName, metric, startDate, endDate } = req.query;
    
    if (!testName || !metric) {
      return res.status(400).json({
        success: false,
        message: 'Test name and metric parameters are required'
      });
    }
    
    const query: any = {
      userId: req.user._id,
      'results.name': testName
    };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    const tests = await LabTest.find(query).sort({ date: 1 });
    
    // Extract the specific metric from each test's results
    const historyData = tests.map(test => {
      const result = test.results.find(r => r.name === testName);
      return {
        date: test.date,
        value: result ? result.value : null,
        referenceRangeLow: result ? result.referenceRangeLow : null,
        referenceRangeHigh: result ? result.referenceRangeHigh : null,
        isAbnormal: result ? result.isAbnormal : false
      };
    });
    
    res.status(200).json({
      success: true,
      testName,
      metric,
      data: historyData
    });
  } catch (error) {
    console.error('Get lab test history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lab test history'
    });
  }
}; 