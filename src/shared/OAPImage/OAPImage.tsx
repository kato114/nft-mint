import React, {
  FC,
  ImgHTMLAttributes,
} from "react";

export interface OAPImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src_origin: string;
  src_character?: string;
  src_weapon?: string;
  src_clothes?: string;
  src_battlepass?: string;
  className?: string;
  alt?: string;
}

const OAPImage: FC<OAPImageProps> = ({
  src_origin = "",
  src_character = "",
  src_weapon = "",
  src_clothes = "",
  src_battlepass = "",
  className = "object-cover w-full h-full",
  alt = "title"
}) => {
  
  return (
    <div className={``}>
      <div className={`flex flex-col w-full ${className}`}>
        <img src={src_origin} className="inset-0 object-cover rounded-3xl sm:rounded-[40px] border-none sm:border-[5px] border-white dark:border-neutral-800" alt={alt} />
        <div className="flex">
          {src_character && <img src={src_character} className="w-[25%] h-[25%] inset-0 object-cover rounded-xl sm:rounded-[20px] border-2 sm:border-[5px] border-white dark:border-neutral-800" alt={alt} />}
          {src_weapon && <img src={src_weapon} className="w-[25%] h-[25%] inset-0 object-cover rounded-xl sm:rounded-[20px] border-2 sm:border-[5px] border-white dark:border-neutral-800" alt={alt} />}
          {src_clothes && <img src={src_clothes} className="w-[25%] h-[25%] inset-0 object-cover rounded-xl sm:rounded-[20px] border-2 sm:border-[5px] border-white dark:border-neutral-800" alt={alt} />}
          {src_battlepass && <img src={src_battlepass} className="w-[25%] h-[25%] inset-0 object-cover rounded-xl sm:rounded-[20px] border-2 sm:border-[5px] border-white dark:border-neutral-800" alt={alt} />}
        </div>
      </div>
    </div>
  );
};

export default OAPImage;
