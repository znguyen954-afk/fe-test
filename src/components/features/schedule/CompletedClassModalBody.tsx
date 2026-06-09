"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";

interface ClassSession {
  id: string;
  subject: string;
  subText: string;
  time: string;
  period: string;
  status: string;
  room: string;
  teacher: string;
  color: "orange" | "yellow" | "darkBlue" | "blue";
  day: number;
}

interface CompletedClassModalBodyProps {
  selectedClass: ClassSession;
}

const pastFocusData = [
  { name: "Tiết 1", focus: 85, active: 80 },
  { name: "Tiết 2", focus: 88, active: 82 },
  { name: "Tiết 3", focus: 78, active: 75 },
  { name: "Tiết 4", focus: 83, active: 79 },
  { name: "Giữa giờ", focus: 65, active: 60 },
  { name: "Tiết 5", focus: 82, active: 85 },
  { name: "Tiết 6", focus: 87, active: 88 },
  { name: "Tiết 7", focus: 80, active: 82 },
  { name: "Tiết 8", focus: 75, active: 77 },
];

const pastEmotionData = [
  { name: "Tập trung", value: 72, color: "#39B54A" },
  { name: "Xao nhãng", value: 18, color: "#D4A325" },
  { name: "Buồn ngủ", value: 10, color: "#CC1818" },
];

export default function CompletedClassModalBody({ selectedClass }: CompletedClassModalBodyProps) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col md:flex-row min-h-0 bg-[#F7F9FF]/20 text-left">
      {/* Left Side: Historical Charts */}
      <div className="w-full md:w-3/5 p-6 border-b md:border-r md:border-b-0 border-border-light/60 flex flex-col gap-6">
        {/* Focus Variation Chart */}
        <div className="bg-white rounded-2xl p-5 border border-border-light/80 shadow-sm flex flex-col h-[456px]">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">trending_up</span>
            Mức độ tương tác trong buổi học
          </h4>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pastFocusData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D5D8DC" />
                <XAxis dataKey="name" tick={{ fill: "#747687", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: "#747687", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="active" name="Tương tác" stroke="#006496" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right Side: Overall KPIs and Event Logs */}
      <div className="w-full md:w-2/5 p-6 flex flex-col gap-6 bg-surface-bright/40">
        <div className="bg-white rounded-2xl p-4 border border-border-light/70 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 text-outline mb-1">
            <span className="material-symbols-outlined text-primary text-[18px]">forum</span>
            <span className="font-caption text-xs font-bold">Tương tác bình quân</span>
          </div>
          <span className="font-display-hero text-headline-lg font-bold text-primary">81%</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-border-light/70 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-outline mb-2">Đánh giá chung hiệu quả</span>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-text-primary">Độ chuyên cần buổi học</span>
            <span className="text-xs font-bold text-success-green">96%</span>
          </div>
          <div className="w-full h-2 bg-surface-bright rounded-full overflow-hidden border border-border-light/30">
            <div className="h-full bg-success-green w-[96%]"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <h4 className="font-body-sm font-bold text-xs text-text-primary mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-outline">history</span>
            Nhật ký cảnh báo buổi học
          </h4>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[140px] pr-1">
            <div className="bg-white border border-border-light/70 rounded-xl p-3 shadow-sm flex gap-3">
              <div className="w-[3px] bg-outline rounded-full self-stretch shrink-0"></div>
              <div className="flex-1">
                <p className="font-body-sm text-[12px] text-text-primary font-medium">Lớp học ghi nhận 3 cảnh báo sử dụng điện thoại</p>
                <p className="font-caption text-[10px] text-outline mt-1">Đã kết thúc lưu trữ</p>
              </div>
            </div>
            <div className="bg-white border border-border-light/70 rounded-xl p-3 shadow-sm flex gap-3">
              <div className="w-[3px] bg-outline rounded-full self-stretch shrink-0"></div>
              <div className="flex-1">
                <p className="font-body-sm text-[12px] text-text-primary font-medium">Điểm tập trung ổn định trong suốt 90 phút giảng dạy</p>
                <p className="font-caption text-[10px] text-outline mt-1">Hệ thống ghi nhận tốt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
