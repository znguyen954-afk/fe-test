"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface InteractionTrendChartProps {
  interactionData: Array<{ name: string; score: number; participation: number }>;
  customTooltip: any;
}

export default function InteractionTrendChart({ interactionData, customTooltip }: InteractionTrendChartProps) {
  return (
    <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-col h-[400px] text-left">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-headline-md text-text-primary">
          Xu hướng tương tác
        </h3>
        <span className="font-caption text-caption text-outline">
          7 ngày qua
        </span>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={interactionData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D5D8DC" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#747687", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#747687", fontSize: 12 }}
              domain={[50, 100]}
            />
            <Tooltip content={customTooltip} />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} />
            <Line
              type="monotone"
              dataKey="score"
              name="Điểm đánh giá"
              stroke="#3858e9"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="participation"
              name="Tỷ lệ tham gia"
              stroke="#006496"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
