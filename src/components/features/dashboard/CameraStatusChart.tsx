"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CameraStatusChartProps {
  cameraData: Array<{ name: string; value: number; color: string }>;
  totalCameras: number;
}

export default function CameraStatusChart({ cameraData, totalCameras }: CameraStatusChartProps) {
  return (
    <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-col h-[400px] text-left">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-headline-md text-headline-md text-text-primary">
          Tình trạng Camera
        </h3>
        <span className="font-caption text-caption text-outline">
          Thời gian thực
        </span>
      </div>
      <div className="flex-1 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={cameraData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {cameraData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #D5D8DC",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              }}
              itemStyle={{
                color: "#141c25",
                fontWeight: 500,
                fontSize: "14px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px", fontSize: "13px", fontWeight: 500 }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Inner text for Donut chart */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+10px)] flex flex-col items-center pointer-events-none">
          <span className="font-display-hero text-display-hero text-text-primary leading-tight">
            {totalCameras}
          </span>
          <span className="font-body-sm text-body-sm text-outline">
            Tổng số
          </span>
        </div>
      </div>
    </div>
  );
}
