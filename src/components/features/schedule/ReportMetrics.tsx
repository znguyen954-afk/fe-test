"use client";

import React from "react";

interface Metrics {
  active: number;
  attendance: string;
  sleeping: number;
}

interface ReportMetricsProps {
  metrics: Metrics;
}

export default function ReportMetrics({ metrics }: ReportMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

      <div className="bg-white p-5 rounded-3xl border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-wider text-outline mb-1">Mức độ tương tác</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-[28px] font-bold text-primary">{metrics.active}%</span>
          <span className="text-[11px] text-outline font-medium">Bình quân</span>
        </div>
        <div className="w-full bg-surface-bright h-1.5 rounded-full mt-3">
          <div className="bg-primary h-full rounded-full" style={{ width: `${metrics.active}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-wider text-outline mb-1">Chuyên cần sĩ số</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-[28px] font-bold text-text-primary">{metrics.attendance}</span>
          <span className="text-[11px] text-outline font-medium">Có mặt</span>
        </div>
        <div className="w-full bg-surface-bright h-1.5 rounded-full mt-3">
          <div className="bg-text-primary h-full rounded-full" style={{ width: metrics.attendance }}></div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-wider text-outline mb-1">Cảnh báo mệt mỏi</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-[28px] font-bold text-error-red">{metrics.sleeping} hs</span>
          <span className="text-[11px] text-outline font-medium">Phát hiện ngủ gật</span>
        </div>
        <div className="w-full bg-surface-bright h-1.5 rounded-full mt-3">
          <div className="bg-error-red h-full rounded-full" style={{ width: `${(metrics.sleeping / 45) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}
