import React from "react";

function InputProcessTable({ processes }) {
  if (!processes || processes.length === 0) return null;

  return (
    <div className="mt-8 max-w-sm">
      <h3 className="text-white text-sm font-semibold mb-3">
        Input Process Table
      </h3>

      <div className="border border-cyan-400/30 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-white">
          <thead className="bg-cyan-400/10">
            <tr>
              <th className="px-4 py-2 text-left font-medium">PID</th>
              <th className="px-4 py-2 text-left font-medium">Arrival</th>
              <th className="px-4 py-2 text-left font-medium">Burst</th>
            </tr>
          </thead>

          <tbody>
            {processes.map((p, index) => (
              <tr
                key={p.id}
                className="border-t border-cyan-400/20"
              >
                <td className="px-4 py-2">P{index + 1}</td>
                <td className="px-4 py-2">{p.arrival}</td>
                <td className="px-4 py-2">{p.burst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InputProcessTable;
