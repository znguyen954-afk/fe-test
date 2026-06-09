"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AiComponentChartProps {
  aiScoreData: Array<{ subject: string; A: number; fullMark: number }>;
}

export default function AiComponentChart({ aiScoreData }: AiComponentChartProps) {
  return (
    <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-col h-[400px] text-left">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-headline-md text-headline-md text-text-primary">
          Phân tích thành phần AI
        </h3>
        <button 
          type="button"
          className="text-primary hover:bg-surface-container rounded-full p-1 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            filter_list
          </span>
        </button>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={aiScoreData}>
            <PolarGrid stroke="#D5D8DC" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#141c25", fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#747687", fontSize: 10 }}
              tickCount={6}
            />
            <Radar
              name="Điểm trung bình"
              dataKey="A"
              stroke="#133cd1"
              fill="#3858e9"
              fillOpacity={0.4}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #D5D8DC",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
