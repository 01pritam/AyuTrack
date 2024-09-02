import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const FeedbackButton = ({ item }) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const {token} =useContext(AuthContext);
  const handleFeedbackSubmit = async () => {
    try {
      // Send feedback to analyze and get rating
      const feedbackResponse = await fetch('https://feedback-18k6.onrender.com/analyze-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: feedback }), // Send feedback comment
      });

      if (!feedbackResponse.ok) {
        throw new Error('Error analyzing feedback');
      }

      const feedbackData = await feedbackResponse.json();

      // Map numerical rating to string
      const ratingMap = {
        1: 'Very Poor',
        2: 'Poor',
        3: 'Neutral',
        4: 'Good',
        5: 'Excellent',
      };

      const ratingString = ratingMap[feedbackData.rating] || 'Neutral'; // Default to 'Neutral' if rating is not found
        console.log("ratingString: ",ratingString);
      // Submit feedback with the string rating to the final URL
      const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/${item._id}/feedback`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
           authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: feedback, // Feedback comment
          rating: ratingString, // Rating string
        }),
      });

      if (!response.ok) {
        throw new Error('Error submitting feedback');
      }

      // Set feedback comment and update state
      setFeedbackComment(feedback);
      setFeedbackSubmitted(true);
      setFeedback(''); // Clear feedback input field
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <div>
      {feedbackSubmitted ? (
        <div className="bg-gray-200 p-2 rounded">
          <p><strong>Your Feedback:</strong> {feedbackComment}</p>
        </div>
      ) : (
        <div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border rounded p-2 mb-2 w-full"
            placeholder="Write your feedback here..."
            rows="3"
          />
          <button
            onClick={handleFeedbackSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Give Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackButton;