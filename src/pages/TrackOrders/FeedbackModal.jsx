// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';

// const FeedbackButton = ({ item }) => {
//   const [feedback, setFeedback] = useState('');
//   const [feedbackComment, setFeedbackComment] = useState('');
//   const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false); // Added loading state
//   const { token } = useContext(AuthContext);

//   const handleFeedbackSubmit = async () => {
//     if (!feedback.trim()) {
//       alert('Please provide feedback');
//       return;
//     }
    
//     setLoading(true); // Set loading state to true
//     try {
//       const feedbackResponse = await fetch('https://feedback-18k6.onrender.com/analyze-feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: feedback }),
//       });

//       if (!feedbackResponse.ok) {
//         throw new Error('Error analyzing feedback');
//       }

//       const feedbackData = await feedbackResponse.json();
//       const ratingMap = {
//         1: 'Very Poor',
//         2: 'Poor',
//         3: 'Neutral',
//         4: 'Good',
//         5: 'Excellent',
//       };

//       const ratingString = ratingMap[feedbackData.rating] || 'Neutral';
//       console.log("ratingString: ", ratingString);

//       const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/${item._id}/feedback`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           comment: feedback,
//           rating: ratingString,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Error submitting feedback');
//       }

//       setFeedbackComment(feedback);
//       setFeedbackSubmitted(true);
//       setFeedback(''); // Clear feedback input field
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to submit feedback');
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p> // Loading indicator
//       ) : feedbackSubmitted ? (
//         <div className="bg-gray-200 p-2 rounded">
//           <p><strong>Your Feedback:</strong> {feedbackComment}</p>
//         </div>
//       ) : (
//         <div>
//           <textarea
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             className="border rounded p-2 mb-2 w-full"
//             placeholder="Write your feedback here..."
//             rows="3"
//           />
//           <button
//             onClick={handleFeedbackSubmit}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Give Feedback
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackButton;
import React, { useState } from 'react';

const FeedbackModal = ({ feedback, setFeedback, onSubmit, onClose, loading }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          className="w-full border rounded p-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

