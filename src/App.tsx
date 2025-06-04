import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";


const Layout = lazy(() => import("./components/Principal/Layout"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const LoadingFallback = () => (
    <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-lg">Cargando...</p>
    </div>
);

const App: React.FC = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    } />
                    <Route path="/Paquito" element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    } />

                    <Route path="/login" element={<Login />} />

                    <Route path="*" element={<Navigate to="/" replace />} />

                </Routes>
            </Suspense>
        </BrowserRouter> </AuthProvider>
    );
};

export default App;