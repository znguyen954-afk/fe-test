"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line
} from "recharts";

// Timeline activity data (90 minutes class segment)
const timelineData = [
  { min: "10'", attention: 85, interaction: 60, fatigue: 10 },
  { min: "20'", attention: 88, interaction: 75, fatigue: 8 },
  { min: "30'", attention: 82, interaction: 80, fatigue: 12 },
  { min: "40'", attention: 74, interaction: 85, fatigue: 15 },
  { min: "50'", attention: 62, interaction: 50, fatigue: 25 }, // Break or drop
  { min: "60'", attention: 80, interaction: 78, fatigue: 18 },
  { min: "70'", attention: 84, interaction: 82, fatigue: 14 },
  { min: "80'", attention: 78, interaction: 70, fatigue: 20 },
  { min: "90'", attention: 70, interaction: 65, fatigue: 28 },
];

const emotionBreakdown = [
  { name: "Tích cực (Hào hứng)", value: 65, color: "#39B54A" },
  { name: "Trung tính (Tập trung)", value: 22, color: "#3858e9" },
  { name: "Tiêu cực (Chán nản)", value: 13, color: "#CC1818" },
];

export default function ReportCharts() {
  return (
    <div className="w-full text-left">
      {/* Main Area Chart: Interaction Timeline over 90 mins */}
      <div className="bg-white rounded-3xl p-6 border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-md text-sm font-bold text-text-primary uppercase tracking-wider">
            Biến động Lớp học trong 90 Phút tiết giảng
          </h3>
          <span className="text-xs text-outline font-semibold">Từng khoảng 10 phút</span>
        </div>
        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInteraction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39B54A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#39B54A" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D5D8DC" />
              <XAxis dataKey="min" tick={{ fill: "#747687", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#747687", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "15px" }} />
              <Area type="monotone" dataKey="interaction" name="Tương tác lớp" stroke="#39B54A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInteraction)" />
              <Line type="monotone" dataKey="fatigue" name="Mệt mỏi (Ngủ/Lơ là)" stroke="#CC1818" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
