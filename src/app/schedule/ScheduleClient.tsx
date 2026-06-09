"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScheduleHeader from "@/components/features/schedule/ScheduleHeader";
import ScheduleGrid from "@/components/features/schedule/ScheduleGrid";
import ScheduleClassModal from "@/components/features/schedule/ScheduleClassModal";
import ClassroomList from "@/components/features/schedule/ClassroomList";
import ScheduleClassFormModal from "@/components/features/schedule/ScheduleClassFormModal";

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
  day: number; // 2 (Monday) to 8 (Sunday)
  gridRowStart: number;
  gridRowSpan: number;
  mode?: "Trực tiếp" | "Trực tuyến";
}

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

interface Classroom {
  id: string;
  name: string;
  building: "Tòa A" | "Tòa B" | "Tòa C" | "Khu VPC" | "Khác";
  capacity: number;
  devices: string[];
  status?: "normal" | "maintenance" | "warning";
  statusText?: string;
}

const classrooms: Classroom[] = [
  { id: "VPC2-602", name: "Phòng VPC2-602", building: "Khu VPC", capacity: 45, devices: ["camera", "projector", "aircon"] },
  { id: "VPC2-503", name: "Phòng VPC2-503", building: "Khu VPC", capacity: 40, devices: ["camera", "projector", "aircon"] },
  { id: "A-301", name: "Phòng 301 - Tòa A", building: "Tòa A", capacity: 45, devices: ["camera", "projector", "aircon"] },
  { id: "A-302", name: "Phòng 302 - Tòa A", building: "Tòa A", capacity: 45, devices: ["camera", "projector"] },
  { id: "A-303", name: "Phòng 303 - Tòa A", building: "Tòa A", capacity: 50, devices: ["camera", "aircon"], status: "warning", statusText: "Sự cố camera: Mất tín hiệu kết nối" },
  { id: "B-401", name: "Phòng 401 - Tòa B", building: "Tòa B", capacity: 35, devices: ["camera", "projector", "aircon"] },
  { id: "B-402", name: "Phòng 402 - Tòa B", building: "Tòa B", capacity: 35, devices: ["camera", "projector", "aircon"] },
  { id: "B-403", name: "Phòng 403 - Tòa B", building: "Tòa B", capacity: 40, devices: ["camera", "aircon"], status: "maintenance", statusText: "Bảo trì: Nâng cấp thiết bị âm thanh" },
  { id: "C-501", name: "Phòng 501 - Tòa C", building: "Tòa C", capacity: 30, devices: ["camera", "projector"] },
  { id: "C-502", name: "Phòng 502 - Tòa C", building: "Tòa C", capacity: 30, devices: ["camera", "aircon"] },
  { id: "hall", name: "Hội trường lớn", building: "Khác", capacity: 200, devices: ["camera", "projector", "aircon"] },
  { id: "library", name: "Thư viện", building: "Khác", capacity: 150, devices: ["camera", "aircon"] },
];

const classesRawData: RawClassSession[] = [
  // VPC2-602
  {
    id: "cls-vpc602-1",
    subject: "Lập trình Web nâng cao",
    subText: "Lập trình Web nâng cao-1-2-25(N01).LT/23CS-SODE",
    time: "07:30 - 10:10",
    period: "Tiết 1-3",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Nguyễn Kim Anh",
    color: "blue",
    day: 2,
  },
  {
    id: "cls-vpc602-2",
    subject: "Phát triển ứng dụng di động",
    subText: "Phát triển ứng dụng di động-1-2-25(N01).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Cù Việt Dũng",
    color: "orange",
    day: 4,
  },
  {
    id: "cls-vpc602-3",
    subject: "Kiểm thử phần mềm",
    subText: "Kiểm thử phần mềm-1-2-25(N02).LT/23CS-SODE",
    time: "15:45 - 17:30",
    period: "Tiết 10-11",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Lê Văn Hùng",
    color: "darkBlue",
    day: 4,
  },
  {
    id: "cls-vpc602-4",
    subject: "Lập trình game",
    subText: "Lập trình game-1-2-25(N06).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Vũ Văn Định",
    color: "yellow",
    day: 5,
  },
  {
    id: "cls-vpc602-5",
    subject: "Giao diện và trải nghiệm",
    subText: "Giao diện và trải nghiệm người dùng-1-2-25(N09).LT/23CS-SODE",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Lê Hằng Anh",
    color: "blue",
    day: 5,
  },
  {
    id: "cls-vpc602-6",
    subject: "Phát triển ứng dụng di động",
    subText: "Phát triển ứng dụng di động-1-2-25(N01).LT/23CS-SODE",
    time: "13:55 - 15:40",
    period: "Tiết 8-9",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Cù Việt Dũng",
    color: "orange",
    day: 6,
  },
  {
    id: "cls-vpc602-7",
    subject: "Giao diện và trải nghiệm",
    subText: "Giao diện và trải nghiệm người dùng-1-2-25(N09).LT/23CS-SODE",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Lê Hằng Anh",
    color: "blue",
    day: 6,
  },
  {
    id: "cls-vpc602-8",
    subject: "Chuyên đề tốt nghiệp",
    subText: "Chuyên đề tốt nghiệp-1-2-25(N12).LT/23CS-SODE",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    status: "Có mặt",
    room: "VPC2-602",
    teacher: "Nguyễn Thị Hà",
    color: "darkBlue",
    day: 7,
  },

  // VPC2-503
  {
    id: "cls-vpc503-1",
    subject: "Hệ quản trị cơ sở dữ liệu",
    subText: "Hệ quản trị cơ sở dữ liệu-1-2-25(N02).LT/23CS-SODE",
    time: "08:00 - 11:30",
    period: "Tiết 2-5",
    status: "Có mặt",
    room: "VPC2-503",
    teacher: "Trần Thế Anh",
    color: "yellow",
    day: 3,
  },
  {
    id: "cls-vpc503-2",
    subject: "Nhập môn AI",
    subText: "Nhập môn AI-1-2-25(N05).LT/23CS-SODE",
    time: "07:30 - 10:10",
    period: "Tiết 1-3",
    status: "Có mặt",
    room: "VPC2-503",
    teacher: "Phạm Văn Minh",
    color: "blue",
    day: 4,
  },
  {
    id: "cls-vpc503-3",
    subject: "An toàn và bảo mật thông tin",
    subText: "An toàn và bảo mật thông tin-1-2-25(N08).LT/23CS-SODE",
    time: "10:15 - 12:00",
    period: "Tiết 4-5",
    status: "Có mặt",
    room: "VPC2-503",
    teacher: "Hoàng Văn Tuấn",
    color: "orange",
    day: 6,
  },
  {
    id: "cls-vpc503-4",
    subject: "Điện toán đám mây",
    subText: "Điện toán đám mây-1-2-25(N04).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "VPC2-503",
    teacher: "Nguyễn Văn Nam",
    color: "darkBlue",
    day: 7,
  },

  // A-301
  {
    id: "cls-a301-1",
    subject: "Kiến trúc máy tính",
    subText: "Kiến trúc máy tính-1-2-25(N01).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "A-301",
    teacher: "Đỗ Thị Lệ",
    color: "orange",
    day: 2,
  },
  {
    id: "cls-a301-2",
    subject: "Phân tích thiết kế hệ thống",
    subText: "Phân tích thiết kế hệ thống-1-2-25(N03).LT/23CS-SODE",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    status: "Có mặt",
    room: "A-301",
    teacher: "Nguyễn Văn Bình",
    color: "blue",
    day: 3,
  },
  {
    id: "cls-a301-3",
    subject: "Cấu trúc dữ liệu và giải thuật",
    subText: "Cấu trúc dữ liệu và giải thuật-1-2-25(N02).LT/23CS-SODE",
    time: "07:30 - 10:10",
    period: "Tiết 1-3",
    status: "Có mặt",
    room: "A-301",
    teacher: "Trần Thu Hà",
    color: "darkBlue",
    day: 5,
  },

  // A-302
  {
    id: "cls-a302-1",
    subject: "Tin học đại cương",
    subText: "Tin học đại cương-1-2-25(N10).LT/23CS-SODE",
    time: "07:30 - 10:10",
    period: "Tiết 1-3",
    status: "Có mặt",
    room: "A-302",
    teacher: "Lê Thị Mai",
    color: "yellow",
    day: 2,
  },
  {
    id: "cls-a302-2",
    subject: "Học máy nâng cao",
    subText: "Học máy nâng cao-1-2-25(N02).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "A-302",
    teacher: "Lê Hoàng Anh",
    color: "darkBlue",
    day: 4,
  },
  {
    id: "cls-a302-3",
    subject: "Lập trình Python",
    subText: "Lập trình Python-1-2-25(N05).LT/23CS-SODE",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    status: "Có mặt",
    room: "A-302",
    teacher: "Nguyễn Văn Cường",
    color: "orange",
    day: 6,
  },

  // B-401
  {
    id: "cls-b401-1",
    subject: "Khai phá dữ liệu",
    subText: "Khai phá dữ liệu-1-2-25(N03).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "B-401",
    teacher: "Trần Quốc Long",
    color: "blue",
    day: 3,
  },
  {
    id: "cls-b401-2",
    subject: "Xử lý ảnh số",
    subText: "Xử lý ảnh số-1-2-25(N02).LT/23CS-SODE",
    time: "15:45 - 18:25",
    period: "Tiết 10-12",
    status: "Có mặt",
    room: "B-401",
    teacher: "Phạm Kim Chi",
    color: "yellow",
    day: 5,
  },

  // B-402
  {
    id: "cls-b402-1",
    subject: "Mạng máy tính",
    subText: "Mạng máy tính-1-2-25(N01).LT/23CS-SODE",
    time: "10:15 - 12:00",
    period: "Tiết 4-5",
    status: "Có mặt",
    room: "B-402",
    teacher: "Trần Trung Hiếu",
    color: "orange",
    day: 4,
  },
  {
    id: "cls-b402-2",
    subject: "Lập trình nhúng",
    subText: "Lập trình nhúng-1-2-25(N02).LT/23CS-SODE",
    time: "13:00 - 15:40",
    period: "Tiết 7-9",
    status: "Có mặt",
    room: "B-402",
    teacher: "Vũ Thành Công",
    color: "darkBlue",
    day: 6,
  },

  // Hall
  {
    id: "cls-hall-1",
    subject: "Sinh hoạt công dân",
    subText: "Sinh hoạt công dân đầu khóa",
    time: "13:00 - 16:00",
    period: "Tiết 7-10",
    status: "Có mặt",
    room: "hall",
    teacher: "Phòng CT-HSSV",
    color: "blue",
    day: 2,
  },
  {
    id: "cls-hall-2",
    subject: "Lễ khai giảng khóa mới",
    subText: "Lễ khai giảng năm học mới",
    time: "08:00 - 11:30",
    period: "Tiết 2-5",
    status: "Có mặt",
    room: "hall",
    teacher: "Ban Giám hiệu",
    color: "orange",
    day: 5,
  },

  // Library
  {
    id: "cls-lib-1",
    subject: "Seminar nghiên cứu khoa học",
    subText: "Nghiên cứu khoa học và phương pháp viết báo cáo",
    time: "15:45 - 17:45",
    period: "Tiết 10-11",
    status: "Có mặt",
    room: "library",
    teacher: "Đội ngũ nghiên cứu",
    color: "yellow",
    day: 4,
    mode: "Trực tuyến",
  },
];

export default function ScheduleClient() {
  const [classesList, setClassesList] = useState<RawClassSession[]>(classesRawData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<RawClassSession | null>(null);

  const classesData: ClassSession[] = classesList.map((cls) => {
    return {
      ...cls,
      gridRowStart: 1,
      gridRowSpan: 1,
    };
  });

  const handleAddClass = (newClass: RawClassSession) => {
    setClassesList((prev) => [...prev, newClass]);
    setIsFormOpen(false);
  };

  const handleEditClass = (updatedClass: RawClassSession) => {
    setClassesList((prev) =>
      prev.map((c) => (c.id === updatedClass.id ? updatedClass : c))
    );
    setIsFormOpen(false);
    setEditingClass(null);
  };

  const handleDeleteClass = (classId: string) => {
    setClassesList((prev) => prev.filter((c) => c.id !== classId));
  };

  const handleEditTrigger = (cls: ClassSession) => {
    const raw: RawClassSession = {
      id: cls.id,
      subject: cls.subject,
      subText: cls.subText,
      time: cls.time,
      period: cls.period,
      status: cls.status,
      room: cls.room,
      teacher: cls.teacher,
      color: cls.color,
      day: cls.day,
      mode: cls.mode,
    };
    setEditingClass(raw);
    setIsFormOpen(true);
  };

  const [mondayDate, setMondayDate] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  });
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [selectedClassStatus, setSelectedClassStatus] = useState<"live" | "done" | "upcoming">("upcoming");
  const [isScanning, setIsScanning] = useState(false);
  const [activeShift, setActiveShift] = useState<"morning" | "afternoon">("morning");

  // Dynamic grid row calculation helper based on selected shift
  const mapClassesToGrid = (classes: typeof classesRawData, shift: "morning" | "afternoon") => {
    const baseMinutes = (shift === "morning" ? 7 : 13) * 60;
    
    return classes.map(cls => {
      const [start, end] = cls.time.split(" - ");
      const [startHour, startMin] = start.split(":").map(Number);
      const [endHour, endMin] = end.split(":").map(Number);
      
      const startTotalMinutes = startHour * 60 + startMin;
      const endTotalMinutes = endHour * 60 + endMin;
      
      const gridRowStart = Math.max(1, Math.round((startTotalMinutes - baseMinutes) / 15) + 1);
      const gridRowSpan = Math.max(1, Math.round((endTotalMinutes - startTotalMinutes) / 15));
      
      const classroomObj = classrooms.find(c => c.id === cls.room);
      const roomDisplayName = classroomObj ? classroomObj.name : cls.room;
      
      return {
        ...cls,
        gridRowStart,
        gridRowSpan,
        room: roomDisplayName,
      } as ClassSession;
    });
  };

  // Switch hourly ranges based on active shift
  const hoursData = activeShift === "morning"
    ? ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00"]
    : ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  const handleAIScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert("Quét điểm danh AI thành công! Sĩ số hiện tại: 42/45 sinh viên.");
    }, 2000);
  };

  const getWeekNumber = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime() + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay / 7);
  };

  const isEvenWeek = getWeekNumber(mondayDate) % 2 === 0;

  const handlePrevWeek = () => {
    setMondayDate((prev) => {
      const nextDate = new Date(prev);
      nextDate.setDate(prev.getDate() - 7);
      return nextDate;
    });
  };

  const handleNextWeek = () => {
    setMondayDate((prev) => {
      const nextDate = new Date(prev);
      nextDate.setDate(prev.getDate() + 7);
      return nextDate;
    });
  };

  const getWeekDays = () => {
    const days = [];
    const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayDate);
      dayDate.setDate(mondayDate.getDate() + i);
      days.push({
        label: labels[i],
        sub: dayDate.getDate().toString().padStart(2, "0"),
        fullDateStr: `${dayDate.getDate().toString().padStart(2, "0")}/${(dayDate.getMonth() + 1).toString().padStart(2, "0")}/${dayDate.getFullYear()}`,
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getWeekRangeText = () => {
    const sunday = new Date(mondayDate);
    sunday.setDate(mondayDate.getDate() + 6);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `Tuần hiện tại: ${pad(mondayDate.getDate())}/${pad(mondayDate.getMonth() + 1)} - ${pad(sunday.getDate())}/${pad(sunday.getMonth() + 1)}`;
  };

  const getClassStatus = (cls: ClassSession, colDateStr: string) => {
    const today = new Date();
    const [day, month, year] = colDateStr.split("/").map(Number);
    const colDate = new Date(year, month - 1, day);
    colDate.setHours(0, 0, 0, 0);
    
    const todayZero = new Date(today);
    todayZero.setHours(0, 0, 0, 0);
    
    if (colDate.getTime() < todayZero.getTime()) {
      return "done";
    }
    if (colDate.getTime() > todayZero.getTime()) {
      return "upcoming";
    }
    
    const currentMinutes = today.getHours() * 60 + today.getMinutes();
    const [startTimeStr, endTimeStr] = cls.time.split(" - ");
    const [startHour, startMin] = startTimeStr.split(":").map(Number);
    const [endHour, endMin] = endTimeStr.split(":").map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    if (currentMinutes < startMinutes) {
      return "upcoming";
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return "live";
    } else {
      return "done";
    }
  };

  const handleClassClick = (cls: ClassSession, status: "live" | "done" | "upcoming") => {
    setSelectedClass(cls);
    setSelectedClassStatus(status);
    setIsModalOpen(true);
  };

  const getHeaderColorClass = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-[#E05600] border-[#E05600]";
      case "yellow":
        return "bg-[#D4A325] border-[#D4A325]";
      case "darkBlue":
        return "bg-[#1E3A8A] border-[#1E3A8A]";
      case "blue":
        return "bg-[#3B82F6] border-[#3B82F6]";
      default:
        return "bg-primary border-primary";
    }
  };

  const getBorderColorClass = (color: string) => {
    switch (color) {
      case "orange":
        return "border-[#E05600]";
      case "yellow":
        return "border-[#D4A325]";
      case "darkBlue":
        return "border-[#1E3A8A]";
      case "blue":
        return "border-[#3B82F6]";
      default:
        return "border-primary";
    }
  };

  // Find info of the currently selected room
  const selectedRoomObj = classrooms.find((c) => c.id === selectedRoomId);
  const selectedRoomName = selectedRoomObj ? selectedRoomObj.name : null;

  // 1. Get raw classes for the current week (odd/even day & room swap)
  const currentRawClasses = isEvenWeek ? classesList : classesList.map(cls => {
    let newDay = cls.day;
    if (cls.day === 4) newDay = 5;
    else if (cls.day === 5) newDay = 6;
    else if (cls.day === 6) newDay = 4;
    
    // Swap rooms in even/odd weeks for demonstration (using IDs consistently)
    let newRoom = cls.room;
    if (cls.room === "VPC2-602") newRoom = "VPC2-503";
    else if (cls.room === "VPC2-503") newRoom = "VPC2-602";
    else if (cls.room === "A-301") newRoom = "A-302";
    else if (cls.room === "A-302") newRoom = "A-301";

    return {
      ...cls,
      day: newDay,
      room: newRoom,
    };
  });

  // 2. Filter raw classes for selected room
  const roomRawClasses = currentRawClasses.filter((cls) => {
    if (!selectedRoomId) return false;
    return (
      cls.room.toLowerCase() === selectedRoomId.toLowerCase() ||
      cls.room.toLowerCase().includes(selectedRoomId.toLowerCase()) ||
      selectedRoomId.toLowerCase().includes(cls.room.toLowerCase())
    );
  });

  // 3. Filter raw classes by shift (morning: startHour < 13, afternoon: startHour >= 13)
  const shiftRawClasses = roomRawClasses.filter((cls) => {
    const [start] = cls.time.split(" - ");
    const startHour = Number(start.split(":")[0]);
    if (activeShift === "morning") {
      return startHour < 13;
    } else {
      return startHour >= 13;
    }
  });

  // 4. Map final filtered classes to grid coordinates based on active shift
  const filteredClassesData = mapClassesToGrid(shiftRawClasses, activeShift);

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col p-6 relative w-full bg-[#F5F5F5]">
        <ScheduleHeader 
          weekRangeText={getWeekRangeText()} 
          onPrevWeek={handlePrevWeek} 
          onNextWeek={handleNextWeek} 
          selectedRoomName={selectedRoomName}
          onBackToRooms={() => setSelectedRoomId(null)}
          classrooms={classrooms.map(c => ({ id: c.id, name: c.name }))}
          onSelectRoom={(roomId) => setSelectedRoomId(roomId)}
        />

        {selectedRoomId ? (
          <div className="animate-fade-in duration-200">
            {/* Shift Switcher & Add Button Group */}
            <div className="flex justify-between items-center gap-4 mb-4 bg-white p-3 rounded-2xl border border-border-light shadow-sm flex-wrap text-left">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-outline pl-1">filter_alt</span>
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    Ca học hiển thị:
                  </span>
                </div>
                <div className="flex bg-surface-bright p-1 rounded-xl border border-border-light/45">
                  <button
                    type="button"
                    onClick={() => setActiveShift("morning")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeShift === "morning"
                        ? "bg-primary text-white shadow-sm"
                        : "text-outline hover:text-text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">light_mode</span>
                    Ca Sáng
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveShift("afternoon")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeShift === "afternoon"
                        ? "bg-primary text-white shadow-sm"
                        : "text-outline hover:text-text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">wb_twilight</span>
                    Ca Chiều
                  </button>
                </div>
              </div>

              {/* Add New Schedule Button */}
              <button
                type="button"
                onClick={() => {
                  setEditingClass(null);
                  setIsFormOpen(true);
                }}
                className="px-4 py-2 bg-success-green hover:bg-green-700 text-white font-button-std text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto sm:ml-0"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Thêm lịch mới
              </button>
            </div>

            <ScheduleGrid 
              weekDays={weekDays} 
              currentClassesData={filteredClassesData} 
              hoursData={hoursData} 
              onClassClick={handleClassClick} 
              getClassStatus={getClassStatus} 
              getBorderColorClass={getBorderColorClass} 
              getHeaderColorClass={getHeaderColorClass} 
            />
          </div>
        ) : (
          <div className="animate-fade-in duration-200">
            <ClassroomList 
              classrooms={classrooms}
              classesData={classesData}
              onSelectRoom={(roomId) => setSelectedRoomId(roomId)}
            />
          </div>
        )}
      </div>

      <ScheduleClassModal 
        isOpen={isModalOpen} 
        selectedClass={selectedClass} 
        selectedClassStatus={selectedClassStatus} 
        onClose={() => setIsModalOpen(false)} 
        isScanning={isScanning} 
        handleAIScan={handleAIScan} 
        onEdit={handleEditTrigger}
        onDelete={handleDeleteClass}
      />

      <ScheduleClassFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClass(null);
        }}
        onSave={(newOrUpdated) => {
          if (editingClass) {
            handleEditClass(newOrUpdated);
          } else {
            handleAddClass(newOrUpdated);
          }
        }}
        initialSession={editingClass}
        defaultRoomId={selectedRoomId || ""}
        classrooms={classrooms.map((c) => ({ id: c.id, name: c.name }))}
      />
    </DashboardLayout>
  );
}
