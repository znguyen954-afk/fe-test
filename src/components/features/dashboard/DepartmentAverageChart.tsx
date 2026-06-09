"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface DepartmentAverageChartProps {
  departmentData: Array<{ name: string; score: number }>;
  customTooltip: any;
}

export default function DepartmentAverageChart({ departmentData, customTooltip }: DepartmentAverageChartProps) {
  return (
    <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-col h-[400px] text-left">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-headline-md text-text-primary">
          Điểm TB theo khoa
        </h3>
        <button 
          type="button"
          className="text-primary hover:bg-surface-container rounded-full p-1 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            more_vert
          </span>
        </button>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#D5D8DC" />
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#747687", fontSize: 12 }}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#141c25", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={customTooltip} cursor={{ fill: "#edf4ff" }} />
            <Bar dataKey="score" name="Điểm TB" radius={[0, 4, 4, 0]} barSize={24}>
              {departmentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? "#3858e9"
                      : index === 1
                      ? "#4db6fe"
                      : index === 2
                      ? "#70d3f2"
                      : index === 3
                      ? "#007189"
                      : "#c4c5d8"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
