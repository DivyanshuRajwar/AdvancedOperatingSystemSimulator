import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";

// Import your pages
import Index from "./pages/Index";
import CPUScheduling from "./pages/CPUScheduling";
import PageReplacement from "./pages/PageReplacement";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Sidebar */}
      
        <Sidebar />
   

      {/* Main content area */}
      <main className="flex-1  overflow-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cpu-scheduling" element={<CPUScheduling />} />
          <Route path="/page-replacement" element={<PageReplacement />} />
          <Route path="/disk-scheduling" element={<ComingSoon />} />
          <Route path="/deadlock" element={<ComingSoon />} />
          <Route path="/memory-allocation" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
