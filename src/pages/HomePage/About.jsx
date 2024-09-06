import React from "react";
import img from "./img/about.jpeg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
        The website utilizes AI and ML technologies to streamline the medicine supply chain. It offers real-time tracking of shipments, ensuring transparency and timely responses to any issues that may arise.
        </p>
        <p className="text-justify lg:text-start">
        Predictive analytics are employed to forecast demand and identify potential disruptions before they occur. This proactive approach allows for effective management and mitigation of potential problems.
        </p>
        <p className="text-justify lg:text-start">
        Automated inventory management optimizes stock levels and distribution processes. This results in fewer delays and ensures more reliable access to medications, enhancing overall efficiency.
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
