import {FC} from "react";
import HeroBanner from "../components/banner.tsx";
import ProfileComponent from "../components/meetme.tsx";
import TikTokSlider from '../components/titktok.tsx';

const Dashboard: FC = () => {



    return (
    <div className="flex flex-col align-top">
       <HeroBanner/>
        <ProfileComponent/>
        <TikTokSlider  />

    </div>
    );
}
export default Dashboard;
