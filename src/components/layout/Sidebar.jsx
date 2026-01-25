import { useState } from "react";
import { NavLink, useLocation,useNavigate } from "react-router-dom";

import {
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Layers,
  FileX,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  {
    title: "CPU Scheduling",
    path: "/cpu-scheduling",
    icon: Cpu,
    description: "FCFS, SJF, SRTF, Round Robin",
  },
  {
    title: "Page Replacement",
    path: "/page-replacement",
    icon: MemoryStick,
    description: "FIFO, LRU, Optimal",
  },
  {
    title: "Disk Scheduling",
    path: "/disk-scheduling",
    icon: HardDrive,
    description: "FCFS, SSTF, SCAN, C-SCAN",
  },
  {
    title: "Deadlock Detection",
    path: "/deadlock",
    icon: Network,
    description: "Banker's Algorithm",
  },
  {
    title: "Memory Allocation",
    path: "/memory-allocation",
    icon: Layers,
    description: "First Fit, Best Fit, Worst Fit",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}` }>
      {/* Header */}
      <div className=" cursor-pointer sidebar-header clickable" onClick={() => navigate("/")}>
        <div className="logo-box">
          <Terminal size={18} />
        </div>

        {!collapsed && (
          <div className="logo-text">
            <h1>OS Simulator</h1>
            <p>Advanced</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${active ? "active" : ""}`}
            >
              <Icon size={20} className="nav-icon" />

              {!collapsed && (
                <div className="nav-text">
                  <span>{item.title}</span>
                  <small>{item.description}</small>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse */}
      <div className="sidebar-footer">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <>
              <ChevronLeft size={20} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
