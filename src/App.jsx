import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Lazy-load tiap halaman jadi chunk terpisah. Terutama penting untuk
// ToolsPage karena dia menarik Firebase SDK (~450KB) yang cuma perlu
// dimuat kalau orang benar-benar buka halaman Tools, bukan di semua halaman.
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TeknikPage = lazy(() => import("./pages/TeknikPage"));
const JurnalPage = lazy(() => import("./pages/JurnalPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage"));
const SyaratKetentuanPage = lazy(() => import("./pages/SyaratKetentuanPage"));
const KebijakanPrivasiPage = lazy(() => import("./pages/KebijakanPrivasiPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/teknik" element={<TeknikPage />} />
            <Route path="/jurnal" element={<JurnalPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/kamus" element={<GlossaryPage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/syarat-dan-ketentuan" element={<SyaratKetentuanPage />} />
            <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-kertas text-tinta font-body antialiased min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <div className="max-w-[1180px] mx-auto px-7 w-full">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
