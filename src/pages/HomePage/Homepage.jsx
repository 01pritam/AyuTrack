import React from "react";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Feature from "./Feature";
import Blogs from "./Blogs";
import Footer from "./Footer";


function Homepage() {
  return (
    <div className="overflow-auto">

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="feature">
          <Feature />
        </div>

        <div id="blog">
          <Blogs />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Homepage
