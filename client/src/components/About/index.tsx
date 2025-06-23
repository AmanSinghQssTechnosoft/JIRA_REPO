import AboutSection from "../../global/AboutSection";
import BarData from "../../global/Chart";
import MultiPort from "../../global/MutliPart";
import PaymentCard from "../../global/PaymentCard";
import ResultCard from "../../global/ResultCard";
import "./about.scss";

const About = () => {
  return (
    <div className="main_about">
      <AboutSection />

      <div className="bar-data">
        <div className="bar-wrapper">
          <BarData />
        </div>
      </div>

      <div className="main-payment">
        <PaymentCard />
        <ResultCard />
        <MultiPort />
      </div>
    </div>
  );
};

export default About;
