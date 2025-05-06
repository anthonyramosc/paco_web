import { FC } from "react";
import HeroBanner from "../components/banner.tsx";
import ProfileComponent from "../components/meetme.tsx";
import TikTokSlider from "../components/titktok.tsx";
import DonateComponent from "../components/donate.tsx";
import Contact from "../components/contact.tsx";
import Prothesis from "../components/prothesis.tsx";
import SegmentacionDashboard from "../components/donationMetrics.tsx";

const Dashboard: FC = () => {
    const handleDonationSubmit = (formData: any) => {
        console.log("Datos de donación recibidos:", formData);
    };

    return (
        <div className="flex flex-col align-top">
            <HeroBanner />
            <div id="profileComponent">
                <ProfileComponent />
            </div>
            <TikTokSlider />

            <div id="prothesisComponent">
                <Prothesis />
            </div>
            <div id="segmentationComponent" >
                <SegmentacionDashboard />
            </div>
            <div id="contactComponent">
                <Contact />
            </div>
        </div>
    );
};

export default Dashboard;