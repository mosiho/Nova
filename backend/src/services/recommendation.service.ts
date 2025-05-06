import mongoose from 'mongoose';
import LabTest from '../models/labTest.model';
import Supplement from '../models/supplement.model';
import Recommendation from '../models/recommendation.model';

// Generate recommendations for a given lab test
export const generateTestRecommendations = async (labTestId: mongoose.Types.ObjectId) => {
  try {
    const labTest = await LabTest.findById(labTestId);
    
    if (!labTest) {
      throw new Error('Lab test not found');
    }
    
    // Delete any existing recommendations for this lab test
    await Recommendation.deleteMany({ labTestId });
    
    // Get abnormal results that need attention
    const abnormalResults = labTest.results.filter(result => result.isAbnormal);
    
    if (abnormalResults.length === 0) {
      console.log('No abnormal results found for this lab test');
      return [];
    }
    
    // Find supplement recommendations for each abnormal result
    // This is a simplified mock implementation
    // In a real app, this would use a more sophisticated algorithm or AI service
    const recommendations: any[] = [];
    
    for (const result of abnormalResults) {
      // This is a simplified logic for demonstration
      // In real implementation, this would be more complex and based on specific health markers
      const condition = {
        low: result.value < (result.referenceRangeLow || 0),
        high: result.value > (result.referenceRangeHigh || 100),
        name: result.name
      };
      
      // Mock query based on condition
      const query: any = {};
      
      // Add text search on condition name to find related supplements
      query.$text = { $search: result.name };
      
      // Find supplements that could help with this condition
      const supplements = await Supplement.find(query).limit(3);
      
      for (const supplement of supplements) {
        const priority = calculatePriority(result, supplement);
        
        // Create recommendation
        const recommendation = new Recommendation({
          userId: labTest.userId,
          labTestId: labTest._id,
          supplementId: supplement._id,
          reason: generateRecommendationReason(result, condition),
          priority,
          dosage: supplement.recommendedDosage,
          isAccepted: false
        });
        
        await recommendation.save();
        recommendations.push(recommendation);
      }
    }
    
    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};

// Get all recommendations for a user
export const getUserRecommendations = async (userId: mongoose.Types.ObjectId) => {
  try {
    return await Recommendation.find({ userId })
      .populate('supplementId')
      .populate('labTestId')
      .sort({ priority: -1 });
  } catch (error) {
    console.error('Error fetching user recommendations:', error);
    throw error;
  }
};

// Accept/reject a recommendation
export const updateRecommendationStatus = async (
  recommendationId: mongoose.Types.ObjectId,
  isAccepted: boolean
) => {
  try {
    return await Recommendation.findByIdAndUpdate(
      recommendationId,
      { isAccepted },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating recommendation status:', error);
    throw error;
  }
};

// Helper functions for recommendation generation

// Calculate priority of a recommendation (1-10)
const calculatePriority = (result: any, supplement: any): number => {
  // This is a simplified priority calculation
  // In a real app, this would use more sophisticated algorithm
  
  let priority = 5; // Default medium priority
  
  // If the result is significantly out of range, increase priority
  if (result.referenceRangeLow && result.referenceRangeHigh) {
    const lowRange = result.referenceRangeLow;
    const highRange = result.referenceRangeHigh;
    const value = result.value;
    
    // Calculate how far out of range the result is
    if (value < lowRange) {
      const percentBelowRange = ((lowRange - value) / lowRange) * 100;
      // Increase priority based on how far below range
      if (percentBelowRange > 50) priority += 4;
      else if (percentBelowRange > 25) priority += 3;
      else if (percentBelowRange > 10) priority += 2;
      else priority += 1;
    } else if (value > highRange) {
      const percentAboveRange = ((value - highRange) / highRange) * 100;
      // Increase priority based on how far above range
      if (percentAboveRange > 50) priority += 4;
      else if (percentAboveRange > 25) priority += 3;
      else if (percentAboveRange > 10) priority += 2;
      else priority += 1;
    }
  }
  
  // Ensure priority is within 1-10 range
  return Math.max(1, Math.min(10, priority));
};

// Generate a reason for the recommendation
const generateRecommendationReason = (result: any, condition: any): string => {
  const { name } = result;
  
  if (condition.low) {
    return `Your ${name} level is below the reference range. This supplement may help increase your levels.`;
  } else if (condition.high) {
    return `Your ${name} level is above the reference range. This supplement may help regulate your levels.`;
  } else {
    return `This supplement may help optimize your ${name} levels.`;
  }
}; 