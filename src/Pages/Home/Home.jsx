import React from "react";
import HomeHeader from "./Header/Header.jsx";
import HomeFooter from "src/Components/global/Footer/Footer.jsx";
import HeroSection from "./HoreSection/HeroSection";
import FindYourRequiredBusiness from "./FindYourRequiredBusiness/FindYourRequiredBusiness";
import SignUpNow from "./SignUpNow/SignUpNow.jsx";
import TakeTheRightDecision from "./TakeTheRightDecision/TakeTheRightDecision.jsx";
import GetWhateverWherever from "./GetWhateverWherever/GetWhateverWherever.jsx";
import WorldWide from "./WorldWide/WorldWide.jsx";
import FindServices from "./FindServices/FindServices.jsx";
import GlobalCustomers from "./GlobalCustomers/GlobalCustomers.jsx";
import StartYouBusiness from "./StartYouBusiness/StartYouBusiness.jsx";
import JobOffer from "./JobOffer/JobOffer.jsx";
import NewsLetter from "./NewsLetter/NewsLetter.jsx";

const Home = () => {
  return (
    <>
      <HomeHeader />
      <HeroSection />
      <FindYourRequiredBusiness />
      <SignUpNow />
      <TakeTheRightDecision />
      <GetWhateverWherever />
      <WorldWide />
      <FindServices />
      <GlobalCustomers />
      <StartYouBusiness />
      <JobOffer />
      <NewsLetter />
      <HomeFooter />
    </>
  );
};

export default Home;
