import React, { useEffect } from "react";
import "./execution.css";

function GanttChart({ gantt }) {
  if (!gantt || gantt.length === 0) {
    return (
      <div className="mt-2 glass-panel p-6 text-muted-foreground">
        Run the algorithm to see Gantt chart
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 mt-2 pb-6">
      <h3 className="text-lg font-semibold mb-6 text-foreground">
        Gantt Chart
      </h3>

      <div className="gantt-track">
        {gantt.map((g, i) => (
          <div key={i} className="gantt-item group">
            {/* Process block */}
            <div className="gantt-block">{g.pid}</div>

            {/* Time labels */}
            <span className="gantt-time start">{g.start}</span>

            {i === gantt.length - 1 && (
              <span className="gantt-time end">{g.end}</span>
            )}

            {/* Hover detail box */}
            {g.pid !== "IDLE" && (
              <div className="gantt-tooltip-wrapper">
                <div className="gantt-bubble">
                  <p>
                    <strong>AT:</strong> {g.arrival}
                  </p>
                  <p>
                    <strong>BT:</strong> {g.burst}
                  </p>
                </div>
                <div className="gantt-pointer"></div>

                {/* blurred shadow layer */}
                <div className="gantt-bubble blurred"></div>
                <div className="gantt-pointer blurred"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GanttChart;
