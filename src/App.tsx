/* import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Importa los componentes utilizando lazy
const Layout = lazy(() => import("./components/Principal/Layout"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Suspense fallback={<div>Cargando...</div>}><Dashboard /></Suspense>} />
                <Route path="/dashboard" element={<Suspense fallback={<div>Cargando...</div>}><Dashboard /></Suspense>} />
                <Route path="/layout" element={<Suspense fallback={<div>Cargando...</div>}><Layout>{null}</Layout></Suspense>} />
                <Route path="*" element={<Navigate to="/" />} /> 




        
           
            </Routes>

        </BrowserRouter>
    );
};

export default App; */

import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Principal/Layout.tsx";
import Dashboard from "./pages/dashboard.tsx";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;