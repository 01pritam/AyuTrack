import React from "react";
import Button from "./layouts/Button";
import ServicesCard from "./layouts/ServicesCard";
import { FaSatellite, FaChartLine, FaWarehouse, FaRobot, FaBox, FaLink, FaTruck, FaCheckCircle } from "react-icons/fa";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
          <p className="mt-2 text-center lg:text-start">
          We provide real-time tracking and automation for efficient medicine delivery.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button title="See Services" />
        </div>
      </div>
      <div className="pt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 justify-items-center">
        <ServicesCard
          icon={<FaSatellite size={35} className="text-backgroundColor" />}
          title="Real-Time Tracking"
          description="Live updates on shipment status and location."
          content="Monitor now"
        />
        <ServicesCard
          icon={<FaChartLine size={35} className="text-backgroundColor" />}
          title="Predictive Analytics"
          description="Forecast demand and identify potential issues."
          content="Learn more"
        />
        <ServicesCard
          icon={<FaWarehouse size={35} className="text-backgroundColor" />}
          title="Automated Inventory"
          description="Optimize stock levels and manage inventory."
          content="Explore features"
        />
        <ServicesCard
          icon={<FaRobot size={35} className="text-backgroundColor" />}
          title="AI-Driven Sorting"
          description="Efficiently handle and sort medicinal components."
          content="See in action"
        />
        <ServicesCard
          icon={<FaBox size={35} className="text-backgroundColor" />}
          title="Advanced Packaging"
          description="Streamline packaging processes with automation."
          content="Discover how"
        />
        <ServicesCard
          icon={<FaLink size={35} className="text-backgroundColor" />}
          title="Seamless Integration"
          description="Connect tracking, inventory, and delivery systems."
          content="Find out more"
        />
        <ServicesCard
          icon={<FaTruck size={35} className="text-backgroundColor" />}
          title="Efficient Delivery"
          description="Ensure timely and accurate delivery of medications."
          content="Check details"
        />
        <ServicesCard
          icon={<FaCheckCircle size={35} className="text-backgroundColor" />}
          title="Quality Monitoring"
          description="Maintain high standards with real-time checks."
          content="Learn about it"
        />
      </div>
    </div>
  );
};

export default Services;
