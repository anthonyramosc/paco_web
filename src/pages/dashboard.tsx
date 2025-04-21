import { FC } from "react";
import HeroBanner from "../components/banner.tsx";
import ProfileComponent from "../components/meetme.tsx";
import TikTokSlider from "../components/titktok.tsx";
import DonateComponent from "../components/Principal/donate.tsx";
import Introduction from "../components/Principal/introduction.tsx";
import Contact from "../components/Principal/contact.tsx";

const Dashboard: FC = () => {
  const handleDonationSubmit = (formData: any) => {
    console.log("Datos de donación recibidos:", formData);
  };

  return (
    <div className="flex flex-col align-top">
      <HeroBanner />
      <ProfileComponent />
      <TikTokSlider />
      <DonateComponent onSubmit={handleDonationSubmit} />
      <Introduction />
      <Contact />
      
    </div>
  );
};

export default Dashboard;