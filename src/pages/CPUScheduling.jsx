import React, { useState } from "react";
import { Cpu, Trash2, Plus, Play } from "lucide-react";
import InputProcessTable from "../components/scheduling/InputProcessTable";
import ExecutionVisualizer from "../components/scheduling/ExecutionVisualizer";
import { useRef } from "react";
import "./Cpu.css";
function CPUScheduling() {
  const arrivalRefs = useRef([]);
  const burstRefs = useRef([]);
  const [processes, setProcesses] = useState([
    { id: Date.now(), arrival: "", burst: "", new: false },
  ]);

  const [algo, setAlgo] = useState("FCFS");

  const descriptions = {
    FCFS: "First Come First Serve",
    SJF: "Shortest Job First",
    Priority: "Priority-based scheduling",
    "Round Robin": "Time-sliced Round Robin scheduling",
  };

  const addProcess = () => {
    setProcesses((prev) => [
      ...prev,
      { id: Date.now(), arrival: "", burst: "", new: true },
    ]);

    setTimeout(() => {
      setProcesses((prev) => prev.map((p) => ({ ...p, new: false })));
    }, 300);
  };

  const deleteProcess = (id) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  };
  const [simulationRun, setSimulationRun] = useState(false);

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
          {processes.map((p, index) => (
            <div
              key={p.id}
              className={`grid grid-cols-[70px_100px_100px_40px] gap-3 items-center ${
                p.new ? "animate-slide-in" : ""
              }`}
            >
              <div className="bg-cyan-100/20 rounded-lg px-3 py-2 text-cyan-100 text-sm font-medium text-center">
                P{index + 1}
              </div>

              {/* Arrival Time */}
              <input
                type="number"
                ref={(el) => (arrivalRefs.current[index] = el)}
                value={p.arrival}
                onChange={(e) =>
                  setProcesses((prev) =>
                    prev.map((x) =>
                      x.id === p.id ? { ...x, arrival: e.target.value } : x
                    )
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    burstRefs.current[index]?.focus();
                  }
                }}
                className="
    w-20 text-center
    bg-cyan-100/10 text-cyan-100
    rounded-lg px-3 py-2 text-sm
    focus:outline-none focus:ring-1 focus:ring-cyan-400
    no-spinner
  "
                placeholder="0"
              />

              {/* Burst Time */}
              <input
                type="number"
                ref={(el) => (burstRefs.current[index] = el)}
                value={p.burst}
                onChange={(e) =>
                  setProcesses((prev) =>
                    prev.map((x) =>
                      x.id === p.id ? { ...x, burst: e.target.value } : x
                    )
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setProcesses((prev) => {
                      const newList = [
                        ...prev,
                        { id: Date.now(), arrival: "", burst: "" },
                      ];

                      // focus arrival of new process
                      setTimeout(() => {
                        arrivalRefs.current[newList.length - 1]?.focus();
                      }, 0);

                      return newList;
                    });
                  }
                }}
                className="
    w-20 text-center
    bg-cyan-100/10 text-cyan-100
    rounded-lg px-3 py-2 text-sm
    focus:outline-none focus:ring-1 focus:ring-cyan-400
    no-spinner
  "
                placeholder="0"
              />

              <button
                onClick={() => deleteProcess(p.id)}
                className="cursor-pointer hover:scale-120 text-muted-foreground hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={addProcess}
              className="
              flex-1 flex items-center justify-center gap-2
              border border-border/50 rounded-xl py-2.5 text-sm
              hover:bg-secondary/40 cursor-pointer text-white transition hover:scale-[1.02]
            "
            >
              <Plus size={18} /> Add
            </button>

            <button
              onClick={() => setSimulationRun(true)}
              className="
    flex-1 flex cursor-pointer items-center justify-center gap-2
    bg-cyan-400 text-black rounded-xl py-2.5 text-sm font-semibold
    shadow-[0_0_25px_rgba(34,211,238,0.6)]
    hover:bg-cyan-300 transition
  "
            >
              <Play size={18} /> Run
            </button>
          </div>
        </div>
        {/* Input process table */}
        {simulationRun && <InputProcessTable processes={processes} />}
      </div>
      {/* right */}
      <div>
        {simulationRun && (
          <ExecutionVisualizer processes={processes} run={simulationRun} />
        )}
      </div>
    </div>
  );
}

export default CPUScheduling;
