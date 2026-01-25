import { useNavigate, useLocation } from "react-router-dom";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Layers,
  ArrowRight,
} from "lucide-react";
import "./index.css";

const features = [
  {
    icon: Cpu,
    title: "CPU Scheduling",
    description: "FCFS, SJF, SRTF, Round Robin with animated Gantt charts",
    path: "/cpu-scheduling",
    ready: true,
  },
  {
    icon: MemoryStick,
    title: "Page Replacement",
    description: "FIFO, LRU, Optimal algorithms with visualization",
    path: "/page-replacement",
    ready: false,
  },
  {
    icon: HardDrive,
    title: "Disk Scheduling",
    description: "FCFS, SSTF, SCAN, C-SCAN with head movement animation",
    path: "/disk-scheduling",
    ready: false,
  },
  {
    icon: Network,
    title: "Deadlock Detection",
    description: "Banker’s Algorithm for deadlock avoidance",
    path: "/deadlock",
    ready: false,
  },
  {
    icon: Layers,
    title: "Memory Allocation",
    description: "First Fit, Best Fit, Worst Fit strategies",
    path: "/memory-allocation",
    ready: false,
  },
];

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page-container ">
      {/* Hero */}
      <div className="hero">
        <h1>
          Advanced Operating System{" "}
          <span className="highlight">Simulator</span>
        </h1>
        <p>
          Visualize and understand core OS concepts through interactive
          simulations and animations.
        </p>
      </div>

      {/* Cards */}
      <div className="card-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = location.pathname === feature.path;

          return (
            <div
              key={feature.path}
              className={`glass-card ${isActive ? "active" : ""}`}
              onClick={() => navigate(feature.path)}
            >
              <div className="card-header">
                <div className="icon-box">
                  <Icon size={22} />
                </div>

                <span
                  className={`status ${
                    feature.ready ? "ready" : "soon"
                  }`}
                >
                  {feature.ready ? "Ready" : "Soon"}
                </span>
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <div className="explore">
                Explore <ArrowRight size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
