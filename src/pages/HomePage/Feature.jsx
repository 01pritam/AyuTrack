import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Import images
import rightQuantityImg from "./img/rightquantity.jpeg";
import rightProductImg from "./img/rightproduct.jpeg";
import rightTimeImg from "./img/righttime.jpeg";
import rightConditionImg from "./img/rightcondition.jpeg";
import rightCostImg from "./img/rightcost.jpeg";
import rightPeopleImg from "./img/rightpeople.jpeg";
import supplyChainImg from "./img/supplychain.jpeg";

const Feature = () => {
  const slider = useRef(null);

  const data = [
    {
      img: rightQuantityImg,
      name: "Optimal Product Quantity",
      specialties: "Ensuring the Right Quantity of product.",
    },
    {
      img: rightProductImg,
      name: "Product Accuracy",
      specialties: "Delivering the Right Product to the Right Place.",
    },
    {
      img: rightTimeImg,
      name: "Timely Delivery",
      specialties: "Ensuring delivery at the Right Time.",
    },
    {
      img: rightConditionImg,
      name: "Condition Monitoring",
      specialties: "Maintaining Right Condition during delivery.",
    },
    {
      img: rightCostImg,
      name: "Cost Efficiency",
      specialties: "Providing products at the Right Cost.",
    },
    {
      img: rightPeopleImg,
      name: "Targeted Distribution",
      specialties: "Reaching the Right People with accurate deliveries.",
    },
    {
      img: supplyChainImg,
      name: "Integrated Solutions",
      specialties: "Combining elements for optimal supply chain management.",
    },
  ];

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  // Function to handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      slider.current.slickPrev();
    } else if (event.key === "ArrowRight") {
      slider.current.slickNext();
    }
  };

  // Adding and cleaning up event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Features
          </h1>
          <p className="mt-3 text-center lg:text-start mb-2">
            Ensuring precise and efficient medicine delivery with real-time tracking and optimized supply chain solutions.
          </p>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Slider ref={slider} {...settings}>
          {data.map((e, index) => (
            <div
              className="h-[350px] text-black rounded-xl shadow-[1px_2px_2px_rgba(0,_0,_0,_0.3),_2px_4px_4px_rgba(0,_0,_0,_0.3),_3px_6px_6px_rgba(0,_0,_0,_0.3)] mb-2 cursor-pointer flex flex-col"
              key={index}
            >
              <img
                src={e.img}
                alt="img"
                className="h-56 rounded-t-xl w-full object-cover"
              />
              <div className="flex flex-col justify-center items-center p-4 flex-grow">
                <h1 className="font-semibold text-xl text-center">{e.name}</h1>
                <h3 className="pt-2 text-center">{e.specialties}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Feature;
