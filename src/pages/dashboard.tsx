import { FC, lazy, Suspense } from "react";


const HeroBanner = lazy(() => import("../components/banner.tsx"));
const ProfileComponent = lazy(() => import("../components/meetme.tsx"));
const TikTokSlider = lazy(() => import("../components/titktok.tsx"));
const DonateComponent = lazy(() => import("../components/donate.tsx"));
const Contact = lazy(() => import("../components/contact.tsx"));
const Prothesis = lazy(() => import("../components/prothesis.tsx"));
const SegmentacionDashboard = lazy(() => import("../components/donationMetrics.tsx"));


const LoadingFallback: FC = () => (
    <div className="flex items-center justify-center w-full h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const Dashboard: FC = () => {
    const handleDonationSubmit = (formData: any) => {
        console.log("Datos de donación recibidos:", formData);
    };

    return (
        <div className="flex flex-col align-top">
            <Suspense fallback={<LoadingFallback />}>
                <HeroBanner />
            </Suspense>

            <div id="profileComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <ProfileComponent />
                </Suspense>
            </div>

            <Suspense fallback={<LoadingFallback />}>
                <TikTokSlider />
            </Suspense>

            <div id="prothesisComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <Prothesis />
                </Suspense>
            </div>

            <div id="segmentationComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <SegmentacionDashboard />
                </Suspense>
            </div>

            <div id="contactComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <Contact />
                </Suspense>
            </div>
        </div>
    );
};

export default Dashboard;