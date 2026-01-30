import React from "react";
import { Play, Plus, Trash2 } from "lucide-react";

function InputProcessTable({ processes, onDelete, setSimulationRun }) {
  if (!processes || processes.length === 0) return null;

  return (
    <div className="mt-8 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        {/* Heading */}
        <h3 className="text-white text-sm font-semibold">
          Input Process Table
        </h3>

        {/* Generate Button */}
        <button
          onClick={() => setSimulationRun(true)}
          className=" hover:cursor-pointer
      flex items-center gap-2
      px-4 py-1.5
      text-xs font-medium
      border border-cyan-400/40
      rounded-lg
      text-cyan-200
      hover:bg-cyan-400/10
      hover:text-cyan-100
      transition
    "
        >
          <Play size={14} />
          Generate
        </button>
      </div>
      <div className="border border-cyan-400/30 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-white">
          <thead className="bg-cyan-400/10">
            <tr>
              <th className="px-4 py-2 text-left font-medium">PID</th>
              <th className="px-4 py-2 text-left font-medium">Arrival</th>
              <th className="px-4 py-2 text-left font-medium">Burst</th>
              <th className="px-4 py-2 text-left font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {processes.map((p, index) => (
              <tr key={p.id} className="border-t border-cyan-400/20">
                <td className="px-4 py-2">P{index + 1}</td>
                <td className="px-4 py-2">{p.arrival}</td>
                <td className="px-4 py-2">{p.burst}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-gray-400 cursor-pointer hover:text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InputProcessTable;
