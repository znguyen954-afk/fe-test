"use client";

import React from "react";
import InteractionTrendChart from "./InteractionTrendChart";
import DepartmentAverageChart from "./DepartmentAverageChart";
import CameraStatusChart from "./CameraStatusChart";
import AiComponentChart from "./AiComponentChart";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-white border border-border-light p-3 rounded-xl shadow-lg text-left">
        <p className="font-headline-sm text-headline-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {entry.name === "score" ? "Điểm số" : entry.name === "participation" ? "Tỷ lệ tham gia" : entry.name}:
            </span>
            <span className="font-headline-sm text-headline-sm">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardCharts({ semester = "Kỳ Xuân 2024" }: { semester?: string }) {
  // Compute chart data dynamically based on selected semester
  const interactionData = semester === "Kỳ Thu 2023" ? [
    { name: "T2", score: 70, participation: 55 },
    { name: "T3", score: 78, participation: 62 },
    { name: "T4", score: 76, participation: 70 },
    { name: "T5", score: 82, participation: 76 },
    { name: "T6", score: 80, participation: 75 },
    { name: "T7", score: 88, participation: 80 },
    { name: "CN", score: 85, participation: 82 },
  ] : semester === "Khoảng thời gian tùy chỉnh" ? [
    { name: "T2", score: 80, participation: 65 },
    { name: "T3", score: 85, participation: 72 },
    { name: "T4", score: 84, participation: 80 },
    { name: "T5", score: 92, participation: 88 },
    { name: "T6", score: 89, participation: 85 },
    { name: "T7", score: 95, participation: 90 },
    { name: "CN", score: 93, participation: 92 },
  ] : [
    { name: "T2", score: 75, participation: 60 },
    { name: "T3", score: 82, participation: 68 },
    { name: "T4", score: 80, participation: 75 },
    { name: "T5", score: 88, participation: 82 },
    { name: "T6", score: 85, participation: 80 },
    { name: "T7", score: 92, participation: 85 },
    { name: "CN", score: 90, participation: 88 },
  ];

  const departmentData = semester === "Kỳ Thu 2023" ? [
    { name: "KH Máy tính", score: 88 },
    { name: "Toán học", score: 80 },
    { name: "Vật lý", score: 74 },
    { name: "Văn học", score: 68 },
    { name: "Hóa học", score: 75 },
  ] : semester === "Khoảng thời gian tùy chỉnh" ? [
    { name: "KH Máy tính", score: 95 },
    { name: "Toán học", score: 88 },
    { name: "Vật lý", score: 82 },
    { name: "Văn học", score: 76 },
    { name: "Hóa học", score: 84 },
  ] : [
    { name: "KH Máy tính", score: 92 },
    { name: "Toán học", score: 85 },
    { name: "Vật lý", score: 78 },
    { name: "Văn học", score: 72 },
    { name: "Hóa học", score: 80 },
  ];

  const cameraData = semester === "Kỳ Thu 2023" ? [
    { name: "Trực tuyến", value: 25, color: "#39B54A" },
    { name: "Ngoại tuyến", value: 0, color: "#CC1818" },
    { name: "Bảo trì", value: 0, color: "#747687" },
  ] : semester === "Khoảng thời gian tùy chỉnh" ? [
    { name: "Trực tuyến", value: 23, color: "#39B54A" },
    { name: "Ngoại tuyến", value: 2, color: "#CC1818" },
    { name: "Bảo trì", value: 0, color: "#747687" },
  ] : [
    { name: "Trực tuyến", value: 24, color: "#39B54A" },
    { name: "Ngoại tuyến", value: 1, color: "#CC1818" },
    { name: "Bảo trì", value: 0, color: "#747687" },
  ];

  const aiScoreData = semester === "Kỳ Thu 2023" ? [
    { subject: "Chuyên cần", A: 90, fullMark: 100 },
    { subject: "Tương tác", A: 72, fullMark: 100 },
    { subject: "Cảm xúc", A: 78, fullMark: 100 },
    { subject: "Thái độ", A: 85, fullMark: 100 },
  ] : semester === "Khoảng thời gian tùy chỉnh" ? [
    { subject: "Chuyên cần", A: 97, fullMark: 100 },
    { subject: "Tương tác", A: 82, fullMark: 100 },
    { subject: "Cảm xúc", A: 86, fullMark: 100 },
    { subject: "Thái độ", A: 93, fullMark: 100 },
  ] : [
    { subject: "Chuyên cần", A: 95, fullMark: 100 },
    { subject: "Tương tác", A: 78, fullMark: 100 },
    { subject: "Cảm xúc", A: 82, fullMark: 100 },
    { subject: "Thái độ", A: 90, fullMark: 100 },
  ];

  const totalCameras = cameraData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
      <InteractionTrendChart interactionData={interactionData} customTooltip={<CustomTooltip />} />
      <DepartmentAverageChart departmentData={departmentData} customTooltip={<CustomTooltip />} />
      <CameraStatusChart cameraData={cameraData} totalCameras={totalCameras} />
      <AiComponentChart aiScoreData={aiScoreData} />
    </div>
  );
}
