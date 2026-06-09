"use client";

import React from "react";

interface ClassDetail {
  subject: string;
  code: string;
  teacher: string;
  date: string;
  time: string;
  period: string;
  room: string;
}

interface ReportHeaderProps {
  classDetail: ClassDetail;
}

export default function ReportHeader({ classDetail }: ReportHeaderProps) {
  return (
    <section className="bg-white rounded-3xl p-8 md:p-10 border border-border-light/80 shadow-[0px_4px_25px_rgba(0,0,0,0.03)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent opacity-30 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="flex-1 z-10 w-full text-left">
        <span className="inline-block px-3 py-1.5 bg-success-green/10 text-success-green border border-success-green/20 rounded-full text-xs font-bold uppercase tracking-wider">
          Báo cáo lưu trữ
        </span>
        <h1 className="font-headline-lg text-[26px] md:text-[32px] text-text-primary mt-4 mb-2 leading-tight font-bold">
          Lớp: {classDetail.subject}
        </h1>
        <p className="font-body-std text-sm md:text-base text-outline font-semibold">
          Mã lớp: <span className="text-text-primary">{classDetail.code}</span> | Giảng viên: <span className="text-text-primary">{classDetail.teacher}</span>
        </p>
        <div className="flex flex-wrap gap-3 mt-6 text-xs md:text-sm font-semibold text-primary">
          <span className="flex items-center gap-2 bg-[#f0f4ff] text-primary border border-primary/15 px-4 py-2.5 rounded-2xl shadow-sm">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>{classDetail.date}</span>
          </span>
          <span className="flex items-center gap-2 bg-[#f0f4ff] text-primary border border-primary/15 px-4 py-2.5 rounded-2xl shadow-sm">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>{classDetail.time} ({classDetail.period})</span>
          </span>
          <span className="flex items-center gap-2 bg-[#f0f4ff] text-primary border border-primary/15 px-4 py-2.5 rounded-2xl shadow-sm">
            <span className="material-symbols-outlined text-[18px]">room</span>
            <span>Phòng {classDetail.room}</span>
          </span>
        </div>
      </div>

      <div className="flex gap-4 z-10 border-t md:border-t-0 border-border-light/50 pt-4 md:pt-0 w-full md:w-auto no-print">
        <button 
          type="button"
          onClick={() => window.print()}
          className="flex-1 md:flex-initial text-white bg-primary hover:bg-blue-700 font-semibold px-5 py-3 rounded-xl shadow-sm transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          Xuất PDF
        </button>
      </div>
    </section>
  );
}
