import CardLarge1 from "components/CardLarge1/CardLarge1";
import React, { FC } from "react";

export interface SectionLargeSliderProps {
  className?: string;
}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  className = "",
}) => {
  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      <CardLarge1 />
    </div>
  );
};

export default SectionLargeSlider;
