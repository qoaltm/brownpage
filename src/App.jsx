import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import TeknikPage from "./pages/TeknikPage";
import ToolsPage from "./pages/ToolsPage";
import AboutPage from "./pages/AboutPage";
import GlossaryPage from "./pages/GlossaryPage";
import SyaratKetentuanPage from "./pages/SyaratKetentuanPage";
import KebijakanPrivasiPage from "./pages/KebijakanPrivasiPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        <Routes location={location}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/teknik" element={<TeknikPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/kamus" element={<GlossaryPage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/syarat-dan-ketentuan" element={<SyaratKetentuanPage />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
