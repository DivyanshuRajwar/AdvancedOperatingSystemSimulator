import React, { useEffect, useRef, useState } from "react";
import Cpu2 from "../../assets/cpu3.png";
import { Play, Cpu } from "lucide-react";
import GanttChart from "./GanttChart";
import { motion, AnimatePresence } from "framer-motion";
import "./execution.css";
function ExecutionVisualizer({ readyQueue }) {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [gantt, setGantt] = useState([]);
  // global clock
  const [currentTime, setCurrentTime] = useState(0);

  // CPU status: IDLE | P1  | COMPLETED
  const cpuStatus = !isRunning
    ? "STOPPED"
    : current
      ? `${current.pid} EXECUTING`
      : "IDLE";

  //cpu state
  const [cpuState, setCpuState] = useState({
    pid: "IDLE",
    start: 0,
  });

  const remainingBT =
    current && cpuState.pid === current.pid
      ? Math.max(0, current.burst - (currentTime - cpuState.start))
      : 0;
  //reverse
  const visible = [...queue].reverse();
  //start the execution
  const startExecution = () => {
    setIsRunning(true);
  };
  //rest  the execution
  useEffect(() => {
    setQueue([...readyQueue]);
    setGantt([]);
    setCompleted([]);
    setCurrent(null);
    // setTimeLeft(null);
    setCurrentTime(0);
    setIsRunning(false);
  }, [readyQueue]);

  //move one process
  useEffect(() => {
    if (!isRunning) return;
    if (current) return;
    if (queue.length === 0) return;
    if (queue[0].arrival > currentTime) return;

    setQueue((prev) => {
      const [next, ...rest] = prev;

      setCurrent(next);
      // setTimeLeft(next.burst);

      setCpuState({
        pid: next.pid,
        start: currentTime,
      });

      return rest;
    });
  }, [isRunning, current, currentTime]);

  //brust countdown
  useEffect(() => {
    if (!current) return;

    const executed = currentTime - cpuState.start;

    if (executed >= current.burst) {
      setCompleted((prev) => [...prev, current]);
      setCurrent(null);

      if (queue.length === 0 || queue[0].arrival > currentTime) {
        setCpuState({
          pid: "IDLE",
          start: currentTime,
        });
      }
    }
  }, [currentTime, current, queue, cpuState.start]);


  // global timer
  useEffect(() => {
    if (!isRunning) return;

    // 🛑 stop clock when CPU is done
    if (queue.length === 0 && current === null) return;

    const timer = setInterval(() => {
      setCurrentTime((t) => t + 1);
    }, 800);

    return () => clearInterval(timer);
  }, [isRunning, queue.length, current]);

  //gantt chart
  // useEffect(() => {
  //   if (!isRunning) return;

  //   setGantt((prev) => {
  //     const last = prev[prev.length - 1];

  //     // first block
  //     if (!last) {
  //       return [
  //         {
  //           pid: cpuState.pid,
  //           start: cpuState.start,
  //           end: currentTime,
  //         },
  //       ];
  //     }

  //     // same CPU state → extend
  //     if (last.pid === cpuState.pid) {
  //       if (last.end === currentTime) return prev; // 
  //       return prev.map((g, i) =>
  //         i === prev.length - 1 ? { ...g, end: currentTime } : g,
  //       );
  //     }

  //     // CPU changed → new block
  //     return [
  //       ...prev,
  //       {
  //         pid: cpuState.pid,
  //         start: cpuState.start,
  //         end: currentTime,
  //       },
  //     ];
  //   });
  // }, [cpuState, currentTime, isRunning]);
//gantt chart
useEffect(() => {
  if (!isRunning) return;

  // 🛑 STOP adding blocks after everything is done
  if (queue.length === 0 && current === null) return;

  setGantt((prev) => {
    const last = prev[prev.length - 1];

    // first block
    if (!last) {
      return [
        {
          pid: cpuState.pid,
          start: cpuState.start,
          end: currentTime,
        },
      ];
    }

    // same CPU state → extend
    if (last.pid === cpuState.pid) {
      if (last.end === currentTime) return prev;
      return prev.map((g, i) =>
        i === prev.length - 1 ? { ...g, end: currentTime } : g,
      );
    }

    // CPU changed → new block
    return [
      ...prev,
      {
        pid: cpuState.pid,
        start: cpuState.start,
        end: currentTime,
      },
    ];
  });
}, [cpuState, currentTime, isRunning, queue.length, current]);



  return (
    <div className="mt-1 w-full ">
      <div className="flex items-center justify-between mb-3 px-1">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white mb-6">
          Process Execution
        </h2>
        {/* Generate Button */}
        <button
          onClick={startExecution}
          className=" hover:cursor-pointer
        flex items-center gap-2
        px-4 py-1.5
        text-md font-medium
        border border-cyan-400/40
        rounded-lg
        text-cyan-200
        hover:bg-cyan-400/10
        hover:text-cyan-100
        transition
        "
        >
          <Cpu size={14} />
          Start Execution
        </button>
      </div>
      {/* Main Layout */}
      <div className="w-full  bg-accent border border-cyan-400/50 rounded-2xl px-6 py-5 flex items-center justify-between gap-10">
        {/* Ready Queue + Current Time */}
        <div className="w-64 h-60  flex flex-col   gap-3 ">
          <p className="font-semibold text-cyan-300 mb-10 text-md align-left ">
            Current Time : {currentTime}
          </p>

          <Queue title="Ready Queue">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <ProcessBox key={p.id} label={p.pid} />
              ))}
            </AnimatePresence>
          </Queue>
        </div>
        {/* CPU Section */}
        <div className="relative w-64 flex flex-col items-center">
          <img src={Cpu2} alt="CPU" className="w-[40.2rem] select-none" />

          {/* Overlay inside CPU */}
          <div className="absolute mt-11 inset-0 flex flex-col items-center justify-center">
            {current ? (
              <>
                <div className="px-2 py-1 rounded-md border-3 border-cyan-600 text-cyan-600 font-extrabold text-xl">
                  {current.pid}
                </div>
                <div className="text-sm font-bold text-cyan-800">
                  BT: {remainingBT}
                </div>
              </>
            ) : (
              <div className="animate-pulse px-3 py-1 rounded-md border-3 border-dashed border-gray-500 text-gray-500 font-extrabold text-xl">
                IDLE
              </div>
            )}
          </div>
        </div>

        {/* Completed Queue + CPU Status */}
        <div className=" w-64 h-60  flex flex-col  gap-3">
          <p className="font-semibold text-cyan-300 mb-10 text-md">
            CPU Status :{" "}
            <span
              className={
                cpuStatus === "RUNNING"
                  ? "text-green-400"
                  : cpuStatus === "IDLE"
                    ? "text-gray-400"
                    : "text-cyan-300"
              }
            >
              {cpuStatus}
            </span>
          </p>

          <Queue title="Completed">
            {completed.map((p) => (
              <ProcessBox key={p.id} label={p.pid} done />
            ))}
          </Queue>
        </div>
      </div>
      {/* Gantt chart */}
      <GanttChart gantt={gantt} />
    </div>
  );
}

export default ExecutionVisualizer;

function Queue({ title, children }) {
  const isCompleted = title === "Completed";
  const ref = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  //  SET DEFAULT POSITION
  useEffect(() => {
    if (!ref.current) return;

    if (isCompleted) {
      // completed → start from left
      ref.current.scrollLeft = 0;
    } else {
      // ready → stick to right
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }, [children, isCompleted]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <div className="w-64">
      <div className="text-lg text-cyan-300 mb-2">{title}</div>

      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="
          flex items-center justify-end gap-2
          border border-cyan-400/40 rounded-lg
          px-3 py-2 min-h-12
          overflow-x-auto scrollbar-hide
          cursor-grab active:cursor-grabbing select-none
        "
        style={{ maxWidth: "250px" }}
      >
        {React.Children.count(children) > 0 ? (
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
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        min-w-10 h-7 flex items-center justify-center
        rounded-md text-xs font-medium
        ${
          done
            ? "bg-cyan-200/20 text-cyan-200 border border-cyan-300/50"
            : "bg-cyan-200/10 text-white border border-cyan-400"
        }
      `}
    >
      {label}
    </motion.div>
  );
}
