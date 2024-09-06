import React from "react";
import Button from "./layouts/Button";
import BackgroundImg from "./img/background.jpeg";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-no-repeat bg-cover opacity-90"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div className="w-full lg:w-4/6 space-y-5 mt-10">
        <h1 className="text-5xl font-bold leading-tight">
          Smart Solutions for Efficient Medicine Supply Chains..
        </h1>
        <div className="w-full lg:w-3/5 space-y-5 mt-10">
          <p>
            AI and ML optimize the medicine supply chain by automating processes, predicting demand, and ensuring timely, safe delivery, resulting in fewer delays and more reliable medication access.
          </p>
        </div>

        <Button  title="Smart Supply" />
      </div>
    </div>
  );
};

export default Home;
