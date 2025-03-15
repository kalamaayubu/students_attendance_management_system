import HowItWorksCard from "./HowItWorksCard";

const HowItWorks = () => {
  return (
    <div className="flex flex-col gap-4">
      <HowItWorksCard
        image={`/assets/time.svg`}
        heading={`Check time`}
        description={`Verify  if the current time falls within the scheduled attendance window.`}
      />
      <HowItWorksCard
        image={`/assets/location.svg`}
        heading={`Proximity`}
        description={`Confirm the student's location relative to the instructor's.`}
      />
      <HowItWorksCard
        image={`/assets/check.svg`}
        heading={`Mark attendance`}
        description={`If both time and location match the requirements, allow attendance marking.`}
      />
      <HowItWorksCard
        image={`/assets/report.svg`}
        heading={`Reports`}
        description={`Generate detailed attendance reports for each course.`}
      />
    </div>
  );
};

export default HowItWorks;
