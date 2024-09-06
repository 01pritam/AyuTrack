import React from "react";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="bg-teal-700 text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-12 px-5">
        <div className="w-full md:w-1/3">
          <h1 className="font-semibold text-3xl pb-4">AyuTrack</h1>
          <p className="text-sm">
            We optimize the medicine supply chain with precision, ensuring the Right Quantity of the Right Product is delivered to the Right Place at the Right Time. Our focus is on enhancing accuracy, timeliness, and quality.
          </p>
        </div>
        <div className="w-full md:w-1/4 mx-5 md:ml-20 px-4"> {/* Adjusted margin */}
          <h1 className="font-medium text-xl pb-2 pt-4 mb-2 md:pt-0">About Us</h1>
          <nav className="flex flex-col gap-5">
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="feature"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Features
            </Link>
          </nav>
        </div>
        <div className="w-full md:w-3/5 mt-4 md:mt-0 md:-ml-28"> {/* Adjusted margin */}
          <h1 className="font-medium text-xl pb-1 text-center mb-3">Our Services</h1>
          <div className="grid grid-cols-2 gap-2 text-center px-12"> {/* Reduced gap */}
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Real-Time Tracking
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Predictive Analytics
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Automated Inventory
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              AI-Driven Sorting
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Advanced Packaging
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Seamless Integration
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Efficient Delivery
            </Link>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Quality Monitoring
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/4 mt-2 md:mt-2">
          <h1 className="font-medium text-xl pb-2">Contact Us</h1>
          <nav className="flex flex-col gap-2">
            <Link to="/" spy={true} smooth={true} duration={500}>
              123 Elm Street, Suite 456, Springfield, IL 62701, USA
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
              support@wellnessvista.com
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
              +123-456-7890
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
