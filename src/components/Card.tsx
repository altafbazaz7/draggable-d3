import { GoogleSVG } from "../data/Google";

interface ICardProps {
  img?: string | any;
  title?: string;
  isMainCard?: boolean;
  svg : React.ReactNode | any;
}

const Card = ({ img, title, isMainCard, svg }: ICardProps) => {
  return (
    <div className="relative w-[200px] h-[150px]  bg-[#e4e8f5]">
      <div className="absolute top-0 left-0 flex justify-center items-center">
        <div className="w-[20px] h-[20px] rounded-tl-[6px] rounded-br-[4px] bg-[#003366]" />
        <span className="font-[600] text-sm ml-[3px] color-[#003366] mb-[4px]">
          {title}
          
        </span>
      </div>
      <div className="inner_content flex w-[full] h-[70%] justify-center items-center">
        {svg}
      </div>
    </div>
  );
};

export default Card;
