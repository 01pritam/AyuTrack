import React, { useState } from "react";

const QualityCheckImages = ({ item }) => {
  // State to handle preview modal visibility and the selected image
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Function to handle opening the preview modal
  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewOpen(true);
  };

  // Function to close the preview modal
  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewImage(null);
  };
  
  const hasQualityImages =
    item && item.qualityCheckImages && item.qualityCheckImages.length > 0;

  return (
    <td className="py-2 flex items-center justify-center">
      {hasQualityImages ? (
        <div className="flex items-center space-x-4">
          {/* Image Thumbnail */}
          <img
            src={item.qualityCheckImages[0].url}
            alt="Quality Check"
            className="w-12 h-12 object-cover rounded-lg cursor-pointer"
            onClick={() => handlePreview(item.qualityCheckImages[0].url)} // Pass only the image URL
          />

          {/* Checkmark */}
          <svg
            className="w-6 h-6 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
        {/* Crossmark */}
        <svg
          className="w-6 h-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
    
        <span>Awaited</span>
      </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closePreview}
            >
              Close
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </td>
  );
};

export default QualityCheckImages;