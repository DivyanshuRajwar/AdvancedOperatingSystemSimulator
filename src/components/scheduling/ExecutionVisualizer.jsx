import React, { useEffect, useState } from "react";
import Cpu from "../../assets/cpu3.png";

function ExecutionVisualizer({ processes, run }) {
  const [readyQueue, setReadyQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);

  /* ---------------- Init on Run ---------------- */
  useEffect(() => {
    if (run) {
      const queue = processes.map((p, i) => ({
        ...p,
        pid: `P${i + 1}`,
        burst: Number(p.burst),
      }));

      setReadyQueue(queue);
      setCompleted([]);
      setCurrent(null);
      setTimeLeft(null);
    }
  }, [run, processes]);

  /* -------- Ready → CPU -------- */
  useEffect(() => {
    if (!current && readyQueue.length > 0) {
      const next = readyQueue[0];
      setReadyQueue((q) => q.slice(1));
      setCurrent(next);
      setTimeLeft(next.burst);
    }
  }, [readyQueue, current]);

  /* -------- CPU countdown -------- */
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      setCompleted((prev) => [...prev, current]);
      setCurrent(null);
      setTimeLeft(null);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [timeLeft, current]);

  return (
    <div className="mt-1 w-full ">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-white mb-6">
        Process Execution
      </h2>

      {/* Main Layout */}
      <div
        className="w-full  bg-accent border border-cyan-400/50 rounded-2xl px-6 py-5 flex items-center justify-between gap-10"
      >
        {/* Ready Queue */}
        <Queue title="Ready Queue">
          {readyQueue.slice(0, 4).map((p) => (
            <ProcessBox key={p.id} label={p.pid} />
          ))}
        </Queue>

        {/* CPU Section */}
        <div className="relative w-64 flex flex-col items-center">
          <img src={Cpu} alt="CPU" className="w-full select-none" />

          {/* Process inside CPU */}
          {current && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="px-4 py-1 rounded-md bg-green-500 text-black text-sm font-semibold">
                {current.pid}
              </div>
              <div className="mt-1 text-xs text-cyan-200">BT: {timeLeft}</div>
            </div>
          )}
        </div>

        {/* Completed Queue */}
        <Queue title="Completed">
          {completed.map((p) => (
            <ProcessBox key={p.id} label={p.pid} done />
          ))}
        </Queue>
      </div>
    </div>
  );
}

export default ExecutionVisualizer;
function Queue({ title, children }) {
  return (
    <div className="w-64">
      <div className="text-lg text-cyan-300 mb-2">{title}</div>

      <div className="flex items-center gap-2 border border-cyan-400/40 rounded-lg px-3 py-2 min-h-[48px]">
        {children.length ? (
          children
        ) : (
          <span className="text-xs text-gray-500">Empty</span>
        )}
      </div>
    </div>
  );
}

function ProcessBox({ label, done = false }) {
  return (
    <div
      className={`min-w-10 h-7 flex items-center justify-center
        rounded-md text-xs font-medium transition-all
        ${
          done
            ? "bg-cyan-200/20 text-cyan-200 border border-cyan-300/50"
            : "bg-cyan-200/10 text-white border border-cyan-400"
        }
      `}
    >
      {label}
    </div>
  );
}
