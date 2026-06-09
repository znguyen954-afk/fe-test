"use client";

import React from "react";
import Image from "next/image";

interface ClassSession {
  name: string;
  room: string;
  time: string;
}

interface Achievement {
  title: string;
  org: string;
}

interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  department: string;
  bio: string;
  expertise: string[];
  interactionScore: number;
  interactionStatus: string;
  aiMetrics: {
    engagementLevel: string;
    movement: string;
  };
  classes: ClassSession[];
  achievements: Achievement[];
}

interface TeacherDetailProps {
  teacher: Teacher;
  onBack: () => void;
}

export default function TeacherDetail({ teacher, onBack }: TeacherDetailProps) {
  return (
    <div className="mx-auto p-margin-mobile md:p-section w-full animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {/* Nút quay lại */}
      <button 
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-outline hover:text-primary transition-colors font-medium bg-surface-white px-4 py-2 rounded-xl border border-border-light shadow-sm w-fit cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Quay lại danh sách
      </button>

      {/* Header Section */}
      <section className="bg-surface-white rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-lg md:p-xl mb-section flex flex-col md:flex-row items-center md:items-start gap-lg relative overflow-hidden border border-border-light">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-fixed-dim to-transparent opacity-20 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-white shadow-md overflow-hidden shrink-0 z-10 relative">
          <Image
            alt={teacher.name}
            src={teacher.avatar}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">{teacher.name}</h1>
              <p className="font-body-std text-body-std text-outline mb-lg">{teacher.title}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-md">
                <button 
                  type="button"
                  onClick={() => {
                    window.location.href = `mailto:${teacher.id.toLowerCase()}@cmc.edu.vn?subject=Liên hệ giảng viên ${teacher.name}`;
                  }}
                  className="text-white font-semibold px-6 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2 bg-primary cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                  Gửi Email
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    alert(`Đang kết nối cổng trò chuyện trực tuyến với ${teacher.name}...`);
                  }}
                  className="border border-primary text-primary bg-transparent font-semibold px-6 py-2 rounded-xl hover:bg-primary/5 transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Liên hệ
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-dim px-4 py-2 rounded-xl border border-border-light self-center md:self-start">
               <span className="material-symbols-outlined text-outline">domain</span>
               <span className="font-medium text-text-primary">{teacher.department}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Left Column (Bio & Skills) */}
        <div className="md:col-span-5 flex flex-col gap-gutter">
          {/* Bio Card */}
          <div className="bg-surface-white rounded-2xl border border-border-light shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-lg">
            <div className="flex items-center gap-2 mb-md border-b border-surface-variant pb-3">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Tiểu sử chuyên môn</h2>
            </div>
            <p className="font-body-std text-body-std text-on-surface-variant leading-relaxed">
              {teacher.bio}
            </p>
          </div>
          
          {/* Expertise Card */}
          <div className="bg-surface-white rounded-2xl border border-border-light shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-lg">
            <div className="flex items-center gap-2 mb-md border-b border-surface-variant pb-3">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Chuyên môn</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {teacher.expertise.map((exp, idx) => (
                 <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium">
                   {exp}
                 </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (AI Metrics, KPI, Classes, Achievements) */}
        <div className="md:col-span-7 flex flex-col gap-gutter">
          
          {/* AI Metrics Card */}
          <div className="bg-surface-white rounded-2xl border-2 border-primary/20 shadow-[0px_0px_15px_0px_rgba(56,88,233,0.1)] p-lg relative overflow-hidden">
             {/* Decorative background pattern */}
             <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(56,88,233,1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,88,233,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 border-b border-surface-variant pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary animate-pulse">smart_toy</span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">Chỉ số tương tác (Model AI)</h2>
                  </div>
                  <div className="bg-success-green/10 text-success-green px-2 py-1 rounded text-xs font-bold tracking-wider uppercase border border-success-green/20">
                    Live Data
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="bg-surface-dim p-4 rounded-xl border border-border-light flex items-center justify-between">
                    <p className="text-xs text-outline uppercase font-bold tracking-wider flex items-center gap-1.5">
                       <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                       Mức độ tương tác giảng dạy
                    </p>
                    <p className="font-bold text-headline-sm text-primary">{teacher.aiMetrics.engagementLevel}</p>
                  </div>
                </div>

                {/* Summary Bar */}
                <div className="flex items-center gap-4 bg-surface-dim p-4 rounded-xl border border-border-light">
                   <div className="flex-1">
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-sm font-medium text-text-primary">Điểm tương tác tổng hợp</span>
                         <div className="flex items-baseline gap-1">
                            <span className="font-bold text-xl text-primary">{teacher.interactionScore}</span>
                            <span className="text-xs text-outline">/100</span>
                         </div>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                         <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${teacher.interactionScore}%` }}></div>
                      </div>
                   </div>
                   <div className="w-16 h-16 shrink-0 relative flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" fill="transparent" r="40" stroke="#e0e9f6" strokeWidth="8"></circle>
                        <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3858e9" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * teacher.interactionScore / 100)} strokeLinecap="round" strokeWidth="8" className="transition-all duration-1000"></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="font-bold text-lg text-primary">{teacher.interactionScore >= 90 ? 'A' : teacher.interactionScore >= 80 ? 'B' : 'C'}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Classes Card */}
            <div className="bg-surface-white rounded-2xl border border-border-light shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-lg">
              <div className="flex items-center gap-2 mb-md border-b border-surface-variant pb-3">
                <span className="material-symbols-outlined text-tertiary-container">class</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Lớp học đang phụ trách</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {teacher.classes.map((cls, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-dim border border-border-light">
                    <div className="w-10 h-10 rounded-lg bg-surface-white shadow-sm flex items-center justify-center text-primary border border-border-light shrink-0">
                      <span className="material-symbols-outlined text-[20px]">science</span>
                    </div>
                    <div>
                      <p className="font-body-std text-body-std font-semibold text-on-surface">{cls.name}</p>
                      <p className="font-caption text-caption text-outline mt-0.5">{cls.room} • {cls.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Achievements Card */}
            <div className="bg-surface-white rounded-2xl border border-border-light shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-lg">
              <div className="flex items-center gap-2 mb-md border-b border-surface-variant pb-3">
                <span className="material-symbols-outlined text-secondary">emoji_events</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Thành tích nổi bật</h2>
              </div>
              <ul className="flex flex-col gap-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-variant">
                {teacher.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-4 relative">
                    <div className={`w-6 h-6 rounded-full bg-surface-white border-2 flex items-center justify-center shrink-0 z-10 mt-0.5 ${idx === 0 ? 'border-primary' : 'border-surface-variant'}`}>
                      {idx === 0 && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                    <div>
                      <p className="font-body-std text-body-std font-semibold text-on-surface leading-tight mb-1">{ach.title}</p>
                      <p className="font-caption text-caption text-outline">{ach.org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12"></div>
    </div>
  );
}
