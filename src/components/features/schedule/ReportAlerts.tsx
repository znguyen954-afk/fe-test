"use client";

import React from "react";

const alertLogs = [
  { time: "13:12", cam: "CAM-01", type: "Sử dụng điện thoại", detail: "Học sinh bàn 3, dãy B dùng điện thoại liên tục 3 phút", severity: "medium" },
  { time: "13:45", cam: "CAM-02", type: "Lơ là, mệt mỏi", detail: "Học sinh góc phải ngủ gật trong tiết lý thuyết", severity: "high" },
  { time: "14:20", cam: "CAM-01", type: "Làm việc riêng", detail: "Nhóm 4 thảo luận ngoài chủ đề bài học (quay lưng lại bảng)", severity: "low" },
  { time: "15:05", cam: "CAM-02", type: "Sử dụng điện thoại", detail: "Học sinh bàn cuối dãy C sử dụng thiết bị di động", severity: "medium" },
];

export default function ReportAlerts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
      {/* Warning Logs table */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
        <h3 className="font-headline-md text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-error-red text-[20px]">warning</span>
          Nhật ký hành vi ghi nhận qua AI
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-bright text-outline border-b border-border-light font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Thời gian</th>
                <th className="py-2.5 px-3">Thiết bị</th>
                <th className="py-2.5 px-3">Loại cảnh báo</th>
                <th className="py-2.5 px-3">Mô tả chi tiết</th>
                <th className="py-2.5 px-3 text-right">Mức độ nguy hại</th>
              </tr>
            </thead>
            <tbody className="text-text-primary divide-y divide-border-light/50 font-medium">
              {alertLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-surface-bright/50 transition-colors">
                  <td className="p-3 text-outline font-bold">{log.time}</td>
                  <td className="p-3 text-outline">{log.cam}</td>
                  <td className="p-3 font-semibold text-text-primary">{log.type}</td>
                  <td className="p-3 text-on-surface-variant font-normal">{log.detail}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      log.severity === "high" 
                        ? "bg-error-red/10 text-error-red" 
                        : log.severity === "medium" 
                        ? "bg-[#D4A325]/10 text-[#D4A325]" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Teacher Recommendations */}
      <div className="bg-white rounded-3xl p-6 border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
        <h3 className="font-headline-md text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
          Đề xuất Cải thiện từ AI
        </h3>
        
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-[#FFF5F5] p-3.5 rounded-2xl border border-border-light/50 flex gap-3">
            <div className="w-[3px] bg-error-red rounded-full self-stretch shrink-0"></div>
            <div className="flex-1">
              <h4 className="font-bold text-error-red text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                Khắc phục lơ là phút thứ 50
              </h4>
              <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1.5 font-medium">
                Lớp học ghi nhận mức độ tương tác giảm mạnh vào phút 50 (xuống còn 50%). Khuyến nghị giảng viên nên tổ chức một trò chơi tương tác ngắn (Kahoot, Quizizz) hoặc cho nghỉ giải lao 5 phút để kích hoạt năng lượng.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F4FF] p-3.5 rounded-2xl border border-border-light/50 flex gap-3">
            <div className="w-[3px] bg-primary rounded-full self-stretch shrink-0"></div>
            <div className="flex-1">
              <h4 className="font-bold text-primary text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                Duy trì tương tác tích cực
              </h4>
              <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1.5 font-medium">
                Mức độ tương tác của lớp học (bình quân 82%) đạt mức xuất sắc trong phần thảo luận nhóm (phút 30-45). Giảng viên nên duy trì cấu trúc bài học tích hợp thảo luận nhóm này cho các buổi tiếp theo.
              </p>
            </div>
          </div>

          <div className="bg-success-green/5 p-3.5 rounded-2xl border border-border-light/50 flex gap-3">
            <div className="w-[3px] bg-success-green rounded-full self-stretch shrink-0"></div>
            <div className="flex-1">
              <h4 className="font-bold text-success-green text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
                Vấn đề sử dụng điện thoại
              </h4>
              <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1.5 font-medium">
                Cảnh báo sử dụng điện thoại tập trung chủ yếu ở khu vực Bàn 3 (Dãy B). Giảng viên nên di chuyển xuống gần vị trí này nhiều hơn trong quá trình giảng bài để gián tiếp nhắc nhở.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
