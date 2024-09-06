import React from "react";
import Button from "./layouts/Button";
import BlogCard from "./layouts/BlogCard";
import img1 from "./img/blog1.jpeg";
import img2 from "./img/blog2.jpeg";
import img3 from "./img/blog3.jpeg";
import img4 from "./img/blog4.jpeg";
import img5 from "./img/blog5.jpeg";
import img6 from "./img/blog6.jpeg";

const Blogs = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Latest Insights
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Discover how we optimize the medicine supply chain with precision and efficiency.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button title="Read Our Articles" />
        </div>
      </div>
      <div className="my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <BlogCard img={img1} headlines="Ensuring Optimal Product Quantity" />
          <BlogCard img={img2} headlines="Accuracy in Medicine Delivery" />
          <BlogCard img={img3} headlines="Timely Delivery for Better Health" />
          <BlogCard img={img4} headlines="Maintaining Medicine Quality" />
          <BlogCard img={img5} headlines="Cost Efficiency in Supply Chain" />
          <BlogCard img={img6} headlines="Targeted Distribution Solutions" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
