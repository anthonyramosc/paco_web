import { lazy, Suspense, useEffect } from "react";

const HeroBanner = lazy(() => import("../components/banner.tsx"));
const ProfileComponent = lazy(() => import("../components/meetme.tsx"));
const TikTokSlider = lazy(() => import("../components/titktok.tsx"));
const DonateComponent = lazy(() => import("../components/donate.tsx"));
const Contact = lazy(() => import("../components/contact.tsx"));
const Prothesis = lazy(() => import("../components/prothesis.tsx"));
const SegmentacionDashboard = lazy(() => import("../components/donationMetrics.tsx"));

const LoadingFallback = () => (
    <div className="flex items-center justify-center w-full h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

// Component wrapper to handle scroll offset
const ScrollTarget = ({ id, children, className = "" }) => {
    return (
        <div id={id} className={`scroll-mt-28 ${className}`}>
            {children}
        </div>
    );
};

const Dashboard = () => {
    useEffect(() => {
        // This effect will handle any hash changes in the URL
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {

                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {

                        const navHeight = 112;
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                            top: elementPosition - navHeight,
                            behavior: "smooth"
                        });
                    }
                }, 100);
            }
        };


        if (window.location.hash) {
            handleHashChange();
        }


        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return (
        <div className="flex flex-col align-top">
            <Suspense fallback={<LoadingFallback />}>
                <HeroBanner />
            </Suspense>

            <ScrollTarget id="profileComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <ProfileComponent />
                </Suspense>
            </ScrollTarget>

            <Suspense fallback={<LoadingFallback />}>
                <TikTokSlider />
            </Suspense>


            <ScrollTarget id="prothesisComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <Prothesis />
                </Suspense>
            </ScrollTarget>

            <ScrollTarget id="segmentationComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <SegmentacionDashboard />
                </Suspense>
            </ScrollTarget>

            <ScrollTarget id="contactComponent">
                <Suspense fallback={<LoadingFallback />}>
                    <Contact />
                </Suspense>
            </ScrollTarget>
        </div>
    );
};

export default Dashboard;