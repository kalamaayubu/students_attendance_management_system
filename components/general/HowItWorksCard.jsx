const HowItWorksCard = ({ image, heading, description }) => {
  return (
    <div className="flex items-center shadow-md p-4 rounded-xl border border-purple-100">
      <div className="">
        <div className="flex gap-4">
          <img src={`${image}`} alt={heading} className="max-w-8" />
          <h4 className="text-[18px] font-bold"> {heading}</h4>
        </div>
        <p className="ml-10 text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
