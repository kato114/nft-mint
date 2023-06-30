import React from "react";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { Helmet } from "react-helmet";
import SectionLargeSlider from "./SectionLargeSlider";

function PageMint() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>BATTLEGROUND ONE</title>
      </Helmet>
      <BgGlassmorphism />
      <div className="py-20 lg:py-32">
        <div className="container">
          <SectionLargeSlider />
        </div>
      </div>
    </div>
  );
}

export default PageMint;
