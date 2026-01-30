import React from 'react'

function GanttChart({ gantt }) {
  return (
    <div className="mt-6 pl-2">
      <h3 className="text-cyan-300 font-semibold mb-2">Gantt Chart</h3>

      <div className="flex h-11 items-center   border-cyan-500/40  rounded-lg">
        {gantt.map((g, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* block */}
            <div className="px-4 py-2 border border-cyan-400 text-cyan-300">
              {g.pid}
            </div>

            {/* time labels */}
            <div className="absolute -bottom-5 left-0 text-xs text-gray-400">
              {g.start}
            </div>

            {i === gantt.length - 1 && (
              <div className="absolute -bottom-5 right-0 text-xs text-gray-400">
                {g.end}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default GanttChart