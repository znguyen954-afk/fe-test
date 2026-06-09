"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportHeader from "@/components/features/schedule/ReportHeader";
import ReportMetrics from "@/components/features/schedule/ReportMetrics";
import ReportCharts from "@/components/features/schedule/ReportCharts";
import ReportAlerts from "@/components/features/schedule/ReportAlerts";

// Mapping class sessions mock database
const classesDb = [
  {
    id: "class-1",
    subject: "Phát triển ứng dụng di động",
    code: "23CS-SODE-N01",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    room: "VPC2-602",
    teacher: "Cù Việt Dũng",
    date: "Thứ 4, 25/10/2023",
    metrics: { focus: 84, active: 82, attendance: "98%", sleeping: 2 },
  },
  {
    id: "class-2",
    subject: "Kiểm thử phần mềm",
    code: "23CS-SODE-N02",
    time: "15:45 - 17:30",
    period: "Tiết 10-11",
    room: "VPC2-602",
    teacher: "Lê Văn Hùng",
    date: "Thứ 4, 25/10/2023",
    metrics: { focus: 79, active: 75, attendance: "94%", sleeping: 4 },
  },
  {
    id: "class-3",
    subject: "Lập trình game",
    code: "23CS-SODE-N06",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    room: "VPC2-602",
    teacher: "Vũ Văn Định",
    date: "Thứ 5, 26/10/2023",
    metrics: { focus: 88, active: 85, attendance: "96%", sleeping: 1 },
  },
  {
    id: "class-4",
    subject: "Giao diện và trải nghiệm",
    code: "23CS-SODE-N09",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    room: "VPC2-602",
    teacher: "Lê Hằng Anh",
    date: "Thứ 5, 26/10/2023",
    metrics: { focus: 81, active: 86, attendance: "100%", sleeping: 0 },
  },
  {
    id: "class-5",
    subject: "Phát triển ứng dụng di động",
    code: "23CS-SODE-N01",
    time: "13:55 - 15:40",
    period: "Tiết 8-9",
    room: "VPC2-602",
    teacher: "Cù Việt Dũng",
    date: "Thứ 6, 27/10/2023",
    metrics: { focus: 83, active: 81, attendance: "95%", sleeping: 3 },
  },
  {
    id: "class-6",
    subject: "Giao diện và trải nghiệm",
    code: "23CS-SODE-N09",
    time: "15:45 - 18:25",
    room: "VPC2-602",
    teacher: "Lê Hằng Anh",
    period: "Tiết 10-12",
    date: "Thứ 6, 27/10/2023",
    metrics: { focus: 82, active: 84, attendance: "98%", sleeping: 1 },
  },
];

export default function ReportDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  // Find class details or fallback to default
  const classDetail = classesDb.find((c) => c.id === id) || classesDb[0];

  return (
    <DashboardLayout>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          aside, header, .no-print, button, a {
            display: none !important;
          }
          main {
            margin-left: 0 !important;
            margin-top: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print-full-width {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            background: transparent !important;
          }
        }
      `}} />
      <div className="flex-1 p-6 max-w-[1200px] mx-auto w-full flex flex-col gap-6 bg-[#F5F5F5] print-full-width">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 no-print text-left">
          <div className="flex items-center gap-2 font-body-std text-body-std text-outline">
            <Link href="/schedule" className="hover:text-primary transition-colors">Thời khóa biểu</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-semibold text-text-primary text-body-std">Báo cáo chi tiết</span>
          </div>

          <Link
            href="/schedule"
            className="flex items-center gap-2 text-outline hover:text-primary transition-colors font-semibold bg-white px-4 py-2 rounded-xl border border-border-light shadow-sm w-fit text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Quay lại Lịch học
          </Link>
        </div>

        {/* Overview Header banner */}
        <ReportHeader classDetail={classDetail} />

        {/* Primary KPIs Cards */}
        <ReportMetrics metrics={classDetail.metrics} />

        {/* Charts block container */}
        <ReportCharts />

        {/* AI Recommendations & Warnings Section */}
        <ReportAlerts />

        <div className="h-12"></div>
      </div>
    </DashboardLayout>
  );
}
