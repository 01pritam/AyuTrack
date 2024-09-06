import React from "react";

const BlogCard = ({ img, headlines }) => {
  let description;
  
  switch (headlines) {
    case "Ensuring Optimal Product Quantity":
      description = "Learn how we ensure the right quantity of medicine is available through advanced inventory management.";
      break;
    case "Accuracy in Medicine Delivery":
      description = "Discover our methods for ensuring the right medicine reaches the right place with pinpoint accuracy.";
      break;
    case "Timely Delivery for Better Health":
      description = "Explore our strategies for timely medicine delivery to meet critical health needs promptly.";
      break;
    case "Maintaining Medicine Quality":
      description = "Understand how we maintain the right condition of medicines throughout storage and transport.";
      break;
    case "Cost Efficiency in Supply Chain":
      description = "See how we provide medicines at the right cost, optimizing the overall supply chain expenses.";
      break;
    case "Targeted Distribution Solutions":
      description = "Learn about our targeted distribution approach to ensure medicines reach the right people efficiently.";
      break;
    default:
      description = "Explore our comprehensive approach to optimizing the medicine supply chain.";
  }

  return (
    <div className="w-full p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] space-y-4 rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <img
        className="h-80 md:h-96 lg:h-56 w-full rounded-lg"
        src={img}
        alt="Blog Image"
      />
      <h2 className="text-xl text-center font-semibold">{headlines}</h2>
      <p className="text-center text-sm">
        {description}
      </p>
    </div>
  );
};

export default BlogCard;
