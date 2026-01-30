import React, { useEffect, useState } from "react";
import { Cpu, Trash2, Plus, Play } from "lucide-react";
import InputProcessTable from "../components/scheduling/InputProcessTable";
import ExecutionVisualizer from "../components/scheduling/ExecutionVisualizer";
import { useRef } from "react";
import "./Cpu.css";
function CPUScheduling() {
  
  const isValid = () =>
    arrivalInput !== "" &&
    burstInput !== "" &&
    Number(arrivalInput) >= 0 &&
    Number(burstInput) > 0;

  const goNextProcess = () => {
    if (!isValid()) return;

    setProcesses((prev) => {
      const nextIndex = currentIndex + 1;

      // If next process already exists → just move index
      if (prev[nextIndex]) {
        setCurrentIndex(nextIndex);
        setTimeout(() => arrivalRef.current?.focus(), 0);
        return prev;
      }

      // Else create new process
      const newList = [...prev, { id: Date.now(), arrival: "", burst: "" }];

      setCurrentIndex(nextIndex);
      setTimeout(() => arrivalRef.current?.focus(), 0);

      return newList;
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const arrivalRef = useRef(null);
  const burstRef = useRef(null);

  const [processes, setProcesses] = useState([]);
  const [arrivalInput, setArrivalInput] = useState("");
  const [burstInput, setBurstInput] = useState("");
  const [algo, setAlgo] = useState("FCFS");

  const descriptions = {
    FCFS: "First Come First Serve",
    SJF: "Shortest Job First",
    Priority: "Priority-based scheduling",
    "Round Robin": "Time-sliced Round Robin scheduling",
  };

  const addProcess = () => {
    if (!isValid()) return;

    setProcesses((prev) => {
      const updated = [
        ...prev,
        {
          id: Date.now(),
          arrival: Number(arrivalInput),
          burst: Number(burstInput),
        },
      ];

      // move index to newly added process
      setCurrentIndex(updated.length);

      return updated;
    });

    // reset inputs
    setArrivalInput("");
    setBurstInput("");

    // focus back to arrival
    requestAnimationFrame(() => {
      arrivalRef.current?.focus();
    });
  };

  const deleteProcess = (id) => {
    setProcesses((prev) => {
      const updated = prev.filter((p) => p.id !== id);

      // fix currentIndex if needed
      if (currentIndex >= updated.length) {
        setCurrentIndex(Math.max(updated.length - 1, 0));
      }

      return updated;
    });
  };

  const [simulationRun, setSimulationRun] = useState(false);

  const [readyQueue, setReadyQueue] = useState([]);
  useEffect(() => {
  if (!simulationRun) return;

  const sorted = [...processes]
    .map((p, index) => ({
      ...p,
      pid: `P${index + 1}`,
      arrival: Number(p.arrival),
      burst: Number(p.burst),
      order: index, // tie-breaker
    }))
    .sort((a, b) => {
      if (a.arrival !== b.arrival) {
        return a.arrival - b.arrival; // FCFS
      }
      return a.order - b.order; // same arrival → PID order
    });

  setReadyQueue(sorted);
}, [simulationRun, processes]);

  return (
    <div className="min-h-screen p-6 lg:p-8 flex ">
      {/* left */}
      <div>
        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-sm bg-cyan-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Cpu className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                CPU Scheduling Algorithms
              </h1>
              <p className="text-muted-foreground text-sm">
                Simulate and visualize CPU scheduling strategies
              </p>
            </div>
          </div>
        </div>

        {/* Process Configuration */}
        <div className="glass-panel max-w-sm p-5 rounded-2xl space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-foreground">
              Process Configuration
            </h2>
            <span className="text-xs text-muted-foreground">
              {processes.length} process{processes.length > 1 && "es"}
            </span>
          </div>

          {/* Algorithm Selection */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">
              Scheduling Algorithm
            </label>

            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value)}
              className="
              w-full rounded-2xl px-5 py-3 text-sm
              bg-gray-900 text-white
              border border-cyan-400/30
              focus:outline-none focus:ring-2 focus:ring-cyan-400/60
              
            "
            >
              <option>FCFS</option>
              <option>SJF</option>
              <option>Priority</option>
              <option>Round Robin</option>
            </select>

            <p className="text-xs text-cyan-300/80">{descriptions[algo]}</p>
          </div>

          {/* Input Table Header */}
          <div className="grid grid-cols-[80px_100px_100px_40px] gap-3 text-[11px] text-stone-300 font-bold uppercase tracking-wide pt-2">
            <span>Process</span>
            <span>Arrival</span>
            <span>Burst</span>
            <span></span>
          </div>

          {/* Input Rows */}
          <div className="grid grid-cols-[70px_100px_100px_40px] gap-3 items-center">
            {/* PID */}
            <div className="bg-cyan-100/20 rounded-lg px-3 py-2 text-cyan-100 text-sm font-medium text-center">
              P{currentIndex + 1}
            </div>

            {/* Arrival */}
            <input
              ref={arrivalRef}
              type="number"
              value={arrivalInput}
              onChange={(e) => setArrivalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && arrivalInput !== "") {
                  burstRef.current?.focus();
                }
              }}
              className="no-spinner w-20 text-center bg-cyan-100/10 text-cyan-100 rounded-lg px-3 py-2 text-sm"
            />

            {/* Burst */}
            <input
              ref={burstRef}
              type="number"
              value={burstInput}
              onChange={(e) => setBurstInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addProcess();
                }
              }}
              className="no-spinner w-20 text-center bg-cyan-100/10 text-cyan-100 rounded-lg px-3 py-2 text-sm"
            />

            {/* PLUS ICON */}
            <button
              onClick={addProcess}
              disabled={!isValid()}
              className="
    cursor-pointer
    text-cyan-500
    hover:text-cyan-200
    disabled:text-gray-500
    transition
  "
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        {/* Input process table */}
        {processes.length > 0 && (
          <InputProcessTable
            processes={processes}
            onDelete={deleteProcess}
            setSimulationRun={setSimulationRun}
          />
        )}
      </div>
      {/* right */}
      <div>
        {simulationRun && (
          <ExecutionVisualizer readyQueue={readyQueue} />
        )}
      </div>
    </div>
  );
}

export default CPUScheduling;
