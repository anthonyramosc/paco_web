import {FC} from "react";
import HeroBanner from "../components/banner.tsx";
import ProfileComponent from "../components/meetme.tsx";
import TikTokSlider from '../components/titktok.tsx';

const Dashboard: FC = () => {


        const videos = [
            {
                id: '1',
                videoUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7353728401980673286',
                username: 'usuario1',
                caption: '¡Mi primer TikTok! #viral',
                likes: 1200,
                comments: 45,
                shares: 23
            },
        ];

    return (
    <div className="flex flex-col align-top">
       <HeroBanner/>
        <ProfileComponent/>
        <TikTokSlider videos={videos} />
    </div>
    );
}
export default Dashboard;
