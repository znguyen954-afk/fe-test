"use client";

import React, { useState, useEffect } from "react";

interface RawClassSession {
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
  mode?: "Trực tiếp" | "Trực tuyến";
}

interface ScheduleClassFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: RawClassSession) => void;
  initialSession?: RawClassSession | null;
  defaultRoomId: string;
  classrooms: { id: string; name: string }[];
}

export default function ScheduleClassFormModal({
  isOpen,
  onClose,
  onSave,
  initialSession = null,
  defaultRoomId,
  classrooms,
}: ScheduleClassFormModalProps) {
  const [subject, setSubject] = useState("");
  const [subText, setSubText] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [day, setDay] = useState(2); // 2 is Monday
  const [startTime, setStartTime] = useState("07:30");
  const [endTime, setEndTime] = useState("10:10");
  const [period, setPeriod] = useState("Tiết 1-3");
  const [mode, setMode] = useState<"Trực tiếp" | "Trực tuyến">("Trực tiếp");
  const [color, setColor] = useState<"orange" | "yellow" | "darkBlue" | "blue">("blue");
  
  const [error, setError] = useState("");

  // Update form fields when initialSession changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialSession) {
        setSubject(initialSession.subject);
        setSubText(initialSession.subText);
        setTeacher(initialSession.teacher);
        setRoom(initialSession.room);
        setDay(initialSession.day);
        
        // Parse time: "07:30 - 10:10"
        const times = initialSession.time.split(" - ");
        if (times.length === 2) {
          setStartTime(times[0]);
          setEndTime(times[1]);
        }
        
        setPeriod(initialSession.period);
        setMode(initialSession.mode || "Trực tiếp");
        setColor(initialSession.color);
      } else {
        // Reset to default/empty values for new session
        setSubject("");
        setSubText("");
        setTeacher("");
        setRoom(defaultRoomId || (classrooms[0]?.id || ""));
        setDay(2);
        setStartTime("07:30");
        setEndTime("10:10");
        setPeriod("Tiết 1-3");
        setMode("Trực tiếp");
        setColor("blue");
      }
      setError("");
    }
  }, [isOpen, initialSession, defaultRoomId, classrooms]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!subject.trim()) {
      setError("Vui lòng nhập tên môn học");
      return;
    }
    if (!teacher.trim()) {
      setError("Vui lòng nhập tên giảng viên");
      return;
    }
    if (!startTime || !endTime) {
      setError("Vui lòng chọn thời gian bắt đầu và kết thúc");
      return;
    }

    // Basic time order check
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    if (startH * 60 + startM >= endH * 60 + endM) {
      setError("Thời gian bắt đầu phải trước thời gian kết thúc");
      return;
    }

    const savedSession: RawClassSession = {
      id: initialSession?.id || `cls-${Date.now()}`,
      subject: subject.trim(),
      subText: subText.trim() || `${subject.trim()}-${day}-${room}`,
      time: `${startTime} - ${endTime}`,
      period: period.trim() || "Tiết tự chọn",
      status: initialSession?.status || "Có mặt",
      room,
      teacher: teacher.trim(),
      color,
      day,
      mode,
    };

    onSave(savedSession);
  };

  const colors: { value: typeof color; name: string; class: string }[] = [
    { value: "blue", name: "Xanh dương", class: "bg-[#3B82F6]" },
    { value: "darkBlue", name: "Xanh đậm", class: "bg-[#1E3A8A]" },
    { value: "orange", name: "Cam", class: "bg-[#E05600]" },
    { value: "yellow", name: "Vàng", class: "bg-[#D4A325]" },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-label="Close form backdrop"
      />

      <div 
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-200 z-10"
        style={{ width: "500px", maxWidth: "calc(100vw - 32px)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-surface-bright text-left">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-text-primary">
              {initialSession ? "Chỉnh sửa Lịch học" : "Thêm Lịch học Mới"}
            </h3>
            <p className="font-caption text-caption text-outline mt-0.5">
              {initialSession ? "Cập nhật thông tin chi tiết của buổi học" : "Điền thông tin để thêm ca học mới vào lịch"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
          {error && (
            <div className="p-3 bg-error-red/10 border border-error-red/20 rounded-xl text-error-red text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          {/* Subject & Subtext */}
          <div className="space-y-3">
            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Tên môn học <span className="text-error-red">*</span>
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ví dụ: Lập trình Web nâng cao"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="subText" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Mã lớp / Chi tiết
              </label>
              <input
                id="subText"
                type="text"
                value={subText}
                onChange={(e) => setSubText(e.target.value)}
                placeholder="Ví dụ: Lập trình Web nâng cao-1-2-25(N01).LT"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
              />
            </div>
          </div>

          {/* Teacher & Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teacher" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Giảng viên <span className="text-error-red">*</span>
              </label>
              <input
                id="teacher"
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="room" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Phòng học
              </label>
              <div className="relative inline-flex items-center w-full bg-surface-bright rounded-xl border border-border-light px-3 py-2.5 text-text-primary text-xs font-semibold focus-within:border-primary/50 transition-colors">
                <select
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 pr-8 appearance-none cursor-pointer outline-none w-full text-xs font-bold text-text-primary"
                >
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-outline ml-2 text-[18px] pointer-events-none absolute right-3">
                  unfold_more
                </span>
              </div>
            </div>
          </div>

          {/* Day & Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="day" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Thứ trong tuần
              </label>
              <div className="relative inline-flex items-center w-full bg-surface-bright rounded-xl border border-border-light px-3 py-2.5 text-text-primary text-xs font-semibold focus-within:border-primary/50 transition-colors">
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="bg-transparent border-none focus:ring-0 pr-8 appearance-none cursor-pointer outline-none w-full text-xs font-bold text-text-primary"
                >
                  <option value={2}>Thứ 2</option>
                  <option value={3}>Thứ 3</option>
                  <option value={4}>Thứ 4</option>
                  <option value={5}>Thứ 5</option>
                  <option value={6}>Thứ 6</option>
                  <option value={7}>Thứ 7</option>
                  <option value={8}>Chủ nhật</option>
                </select>
                <span className="material-symbols-outlined text-outline ml-2 text-[18px] pointer-events-none absolute right-3">
                  unfold_more
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="period" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Tiết học
              </label>
              <input
                id="period"
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Ví dụ: Tiết 1-3, Tiết 7-9"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
              />
            </div>
          </div>

          {/* Time Picker Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Giờ bắt đầu
              </label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Giờ kết thúc
              </label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
                required
              />
            </div>
          </div>

          {/* Mode (Direct / Online) & Tag Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mode" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
                Hình thức giảng dạy
              </label>
              <div className="flex bg-surface-bright p-1 rounded-xl border border-border-light w-full">
                <button
                  type="button"
                  onClick={() => setMode("Trực tiếp")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    mode === "Trực tiếp"
                      ? "bg-primary text-white shadow-sm"
                      : "text-outline hover:text-text-primary"
                  }`}
                >
                  Trực tiếp
                </button>
                <button
                  type="button"
                  onClick={() => setMode("Trực tuyến")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    mode === "Trực tuyến"
                      ? "bg-primary text-white shadow-sm"
                      : "text-outline hover:text-text-primary"
                  }`}
                >
                  Trực tuyến
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-outline mb-2 uppercase tracking-wider">
                Màu sắc nhãn thẻ
              </span>
              <div className="flex items-center gap-3 py-1">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`w-7 h-7 rounded-full ${c.class} cursor-pointer transition-all flex items-center justify-center relative ${
                      color === c.value
                        ? "scale-110 ring-2 ring-primary/40 ring-offset-2"
                        : "hover:scale-105 opacity-80"
                    }`}
                    title={c.name}
                  >
                    {color === c.value && (
                      <span className="material-symbols-outlined text-white text-[16px] font-bold leading-none">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer inside form */}
          <div className="pt-4 border-t border-border-light flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-border-light rounded-xl font-button-std text-xs bg-white hover:bg-surface-container transition-colors text-outline cursor-pointer active:scale-95"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-button-std text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
