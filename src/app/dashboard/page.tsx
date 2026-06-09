"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCharts from "@/components/features/dashboard/DashboardCharts";

export default function DashboardPage() {
  const [semester, setSemester] = useState("Kỳ Xuân 2024");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Xuất báo cáo Tổng quan hệ thống thành công! (Mockup PDF)");
    }, 1500);
  };

  // Mock KPI data mapping
  const kpis: Record<string, { activeClasses: number; classesTrend: string; teachers: number; aiScore: number; aiTrend: string; onlineCams: number; offlineCamRoom: string }> = {
    "Kỳ Xuân 2024": {
      activeClasses: 42,
      classesTrend: "+3 từ tuần trước",
      teachers: 128,
      aiScore: 85,
      aiTrend: "+2.4% so với tháng trước",
      onlineCams: 24,
      offlineCamRoom: "Phòng 302",
    },
    "Kỳ Thu 2023": {
      activeClasses: 38,
      classesTrend: "-2 từ cuối kỳ",
      teachers: 122,
      aiScore: 81,
      aiTrend: "+1.2% so với tháng trước",
      onlineCams: 25,
      offlineCamRoom: "",
    },
    "Khoảng thời gian tùy chỉnh": {
      activeClasses: 45,
      classesTrend: "+5 so với cùng kỳ",
      teachers: 130,
      aiScore: 88,
      aiTrend: "+3.1% so với tháng trước",
      onlineCams: 23,
      offlineCamRoom: "Phòng 302 & 405",
    }
  };

  const currentKPI = kpis[semester] || kpis["Kỳ Xuân 2024"];

  return (
    <DashboardLayout>
      <div className="flex-1 p-margin-mobile md:p-margin-desktop mx-auto w-full flex flex-col gap-section">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">Tổng quan hệ thống</h1>
            <p className="font-body-std text-body-std text-on-surface-variant mt-1">Số liệu hiệu suất và phân tích thời gian thực.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md w-full sm:w-auto">
            <div className="flex items-center bg-surface-white rounded-2xl border border-border-light px-4 py-2 shadow-sm w-full sm:w-auto">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">calendar_month</span>
              <select 
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="bg-transparent border-none focus:ring-0 font-body-std text-body-std text-text-primary pr-6 appearance-none cursor-pointer outline-none flex-1"
              >
                <option value="Kỳ Xuân 2024">Kỳ Xuân 2024</option>
                <option value="Kỳ Thu 2023">Kỳ Thu 2023</option>
                <option value="Khoảng thời gian tùy chỉnh">Khoảng thời gian tùy chỉnh</option>
              </select>
              <span className="material-symbols-outlined text-outline ml-2 text-[20px] pointer-events-none">expand_more</span>
            </div>
            <button 
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="bg-primary-container text-on-primary px-6 py-2 rounded-2xl font-button-std text-button-std shadow-sm hover:shadow-md transition-all w-full sm:w-auto cursor-pointer active:scale-95 transition-transform duration-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xuất...
                </>
              ) : (
                "Xuất báo cáo"
              )}
            </button>
          </div>
        </div>

        {/* KPI Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Card 1 */}
          <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_5px_30px_0px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface-variant uppercase tracking-wider">LỚP ĐANG HOẠT ĐỘNG</h2>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">groups</span>
              </div>
            </div>
            <div>
              <div className="font-display-hero text-display-hero text-text-primary">{currentKPI.activeClasses}</div>
              <div className="flex items-center gap-1 mt-2 text-success-green font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>{currentKPI.classesTrend}</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_5px_30px_0px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface-variant uppercase tracking-wider">TỔNG SỐ GIẢNG VIÊN</h2>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
            </div>
            <div>
              <div className="font-display-hero text-display-hero text-text-primary">{currentKPI.teachers}</div>
              <div className="flex items-center gap-1 mt-2 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                <span>Ổn định</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_5px_30px_0px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-col justify-between border border-border-light">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface-variant uppercase tracking-wider">ĐIỂM AI TRUNG BÌNH</h2>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">psychology</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <div className="font-display-hero text-display-hero text-text-primary">{currentKPI.aiScore}</div>
                <div className="font-headline-md text-headline-md text-outline">/100</div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-success-green font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                <span>{currentKPI.aiTrend}</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-white rounded-3xl p-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_5px_30px_0px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface-variant uppercase tracking-wider">CAMERA TRỰC TUYẾN</h2>
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-error-red">videocam_off</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <div className="font-display-hero text-display-hero text-text-primary">{currentKPI.onlineCams}</div>
                <div className="font-headline-md text-headline-md text-outline">/25</div>
              </div>
              {currentKPI.onlineCams < 25 ? (
                <div className="flex items-center gap-1 mt-2 text-error-red font-body-sm text-body-sm bg-error-container/20 px-2 py-1 rounded-md inline-flex">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>Ngoại tuyến tại: {currentKPI.offlineCamRoom}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-2 text-success-green font-body-sm text-body-sm bg-success-green/10 px-2.5 py-1 rounded-md inline-flex">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Tất cả trực tuyến</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <DashboardCharts semester={semester} />

        {/* Top Performing Teachers Table */}
        <div className="bg-surface-white rounded-3xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="px-lg py-md border-b border-border-light flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-text-primary">Giảng viên xuất sắc</h3>
            <Link className="font-nav-link text-nav-link text-primary hover:underline" href="/teachers">Xem tất cả</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-slate font-headline-sm text-headline-sm text-on-surface-variant border-b border-border-light whitespace-nowrap">
                  <th className="py-3 px-lg font-semibold">Giảng viên</th>
                  <th className="py-3 px-lg font-semibold">Khoa</th>
                  <th className="py-3 px-lg font-semibold text-center">Lớp học</th>
                  <th className="py-3 px-lg font-semibold">Điểm AI trung bình</th>
                  <th className="py-3 px-lg font-semibold text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="font-body-std text-body-std text-text-primary divide-y divide-border-light">
                <tr className="hover:bg-background-slate transition-colors group cursor-pointer whitespace-nowrap">
                  <td className="py-3 px-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-dim relative">
                        <Image alt="Sarah Jenkins" className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2l7u2_MzuyV6Ejnytai6K2Kpl8i8oatMP8qNc_4MsKZcajCFHziQZKCtgGwJ2-lOGDbGtlt8kXay8pOhwKWb3OZ1ZVCvour9ShNTP5_MMoVhkzrgwFG8bYti2lDzTzGQGjGWfZ_DTHAOTj0ONbnosxBISpjb2cLnz_pNafYp2beAsvB33jACh7IqSiFaS9o3U8l9EG8eh966Cxkqlgfu-j0efn5o68fartUt6Yk8Novo5QY1b6bf5XHEvtE7ba6uWLdUkLxNk0Fo" fill sizes="40px" />
                      </div>
                      <div className="font-semibold group-hover:text-primary transition-colors">Dr. Sarah Jenkins</div>
                    </div>
                  </td>
                  <td className="py-3 px-lg text-on-surface-variant">Khoa học Máy tính</td>
                  <td className="py-3 px-lg text-center">4</td>
                  <td className="py-3 px-lg w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-bright rounded-full overflow-hidden">
                        <div className="h-full bg-success-green rounded-full w-[94%]"></div>
                      </div>
                      <span className="font-semibold">94</span>
                    </div>
                  </td>
                  <td className="py-3 px-lg text-right">
                    <button type="button" className="text-outline hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-background-slate transition-colors group cursor-pointer whitespace-nowrap">
                  <td className="py-3 px-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-dim relative">
                        <Image alt="Michael Chen" className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Moerr-1wAd8l9uYoWx2FigRrp0pWSiyKgfpzXZXZlMrdHPjgrXIrHXkNo8VybYmEa4A0ZwNmPT4GsFZoWLSuY0kQRTspOGEA56m4fPsETQRkk9RlmREpEcKvm4b2tIUfa4_bsK39PrzYtRxAb_9vJ0ABbiJfOYjDk_AX-pdTCLKr3-xoJSI13L0c_l2eqJO1KjNvnY3fmdVi0tzZT_VUd_Oc4ISbgL9x0zRDaOHj6qXFdcVxt5VEZjHxvzQff4oNExb5615tvxQ" fill sizes="40px" />
                      </div>
                      <div className="font-semibold group-hover:text-primary transition-colors">Prof. Michael Chen</div>
                    </div>
                  </td>
                  <td className="py-3 px-lg text-on-surface-variant">Toán học</td>
                  <td className="py-3 px-lg text-center">3</td>
                  <td className="py-3 px-lg w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-bright rounded-full overflow-hidden">
                        <div className="h-full bg-success-green rounded-full w-[91%]"></div>
                      </div>
                      <span className="font-semibold">91</span>
                    </div>
                  </td>
                  <td className="py-3 px-lg text-right">
                    <button type="button" className="text-outline hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-background-slate transition-colors group cursor-pointer whitespace-nowrap">
                  <td className="py-3 px-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-dim relative">
                        <Image alt="Emily Davis" className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdbgVB7R3CeKCDSWvMfLj8c4XCqGv6pYb3UawjuFRtb8wQd022_HGXDQ9-nwP9WFbouSwM24e5F8HpWw0hGXXSWjAqlwEy0abrlvpFXdlFqEmRJmy9OyVgWZ5QUrfZ7rYByAoJhelnkGX5lEMbudRG7zQE8cQU3kOcTHjCKDiozQ2zuLTA3g5nej8W67Z_6vfE_TcyKVnv-DQBjwPbDXftHsBrFm_W3MePiMDiabVlZknAc6KT3oYd2fcatSQNZaX6z-PEpoR8IKw" fill sizes="40px" />
                      </div>
                      <div className="font-semibold group-hover:text-primary transition-colors">Dr. Emily Davis</div>
                    </div>
                  </td>
                  <td className="py-3 px-lg text-on-surface-variant">Vật lý</td>
                  <td className="py-3 px-lg text-center">5</td>
                  <td className="py-3 px-lg w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-bright rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full w-[88%]"></div>
                      </div>
                      <span className="font-semibold">88</span>
                    </div>
                  </td>
                  <td className="py-3 px-lg text-right">
                    <button type="button" className="text-outline hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-12"></div>
      </div>
    </DashboardLayout>
  );
}
