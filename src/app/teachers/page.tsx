"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TeacherGrid from "@/components/features/teachers/TeacherGrid";
import TeacherDetail from "@/components/features/teachers/TeacherDetail";

// Mock data cho danh sách giảng viên
const teachers = [
  {
    id: "GV01",
    name: "TS. Sarah Jenkins",
    title: "Giảng viên Khoa Khoa học Máy tính",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    department: "Khoa học Máy tính",
    bio: "Tiến sĩ Sarah Jenkins là một nhà nghiên cứu và giảng viên hàng đầu trong lĩnh vực Trí tuệ Nhân tạo ứng dụng trong giáo dục. Với hơn 15 năm kinh nghiệm giảng dạy tại các trường đại học công nghệ hàng đầu, bà tập trung vào việc phát triển các mô hình học máy để phân tích và cải thiện tương tác giữa sinh viên và hệ thống học tập. Các công trình của bà đã được công bố trên nhiều tạp chí khoa học quốc tế uy tín.",
    expertise: ["Trí tuệ nhân tạo", "Học máy", "Thị giác máy tính", "Phân tích Dữ liệu Giáo dục", "Xử lý Ngôn ngữ Tự nhiên"],
    interactionScore: 88,
    interactionStatus: "Top 5% Khoa",
    aiMetrics: {
      engagementLevel: "Cao",
      movement: "Năng động"
    },
    classes: [
      { name: "AI 101", room: "Phòng 204", time: "Thứ 2, 4" },
      { name: "Học máy nâng cao", room: "Phòng 302", time: "Thứ 3, 5" }
    ],
    achievements: [
      { title: "Giải thưởng Nghiên cứu AI 2023", org: "Hiệp hội AI Quốc gia" },
      { title: "Giảng viên xuất sắc 2022", org: "Khoa Khoa học Máy tính" },
      { title: "Công báo 5 bài báo Q1", org: "Giai đoạn 2021-2023" }
    ]
  },
  {
    id: "GV02",
    name: "PGS.TS. Nguyễn Văn An",
    title: "Trưởng bộ môn Kỹ thuật Phần mềm",
    avatar: "https://i.pravatar.cc/150?u=an",
    department: "Kỹ thuật Phần mềm",
    bio: "PGS.TS Nguyễn Văn An có hơn 20 năm kinh nghiệm trong việc giảng dạy và nghiên cứu về quy trình phát triển phần mềm Agile và kiến trúc hệ thống. Ông đã tư vấn cho nhiều doanh nghiệp công nghệ lớn về chuyển đổi số.",
    expertise: ["Kỹ thuật Phần mềm", "Agile/Scrum", "Kiến trúc hệ thống", "DevOps"],
    interactionScore: 75,
    interactionStatus: "Tốt",
    aiMetrics: {
      engagementLevel: "Khá",
      movement: "Ít di chuyển"
    },
    classes: [
      { name: "Kiến trúc phần mềm", room: "Phòng 101", time: "Thứ 6" },
      { name: "Quản lý dự án CNTT", room: "Phòng 102", time: "Thứ 7" }
    ],
    achievements: [
      { title: "Bài báo xuất sắc IEEE 2021", org: "IEEE Software" },
      { title: "Kỷ niệm chương vì sự nghiệp giáo dục", org: "Bộ GD&ĐT" }
    ]
  },
  {
    id: "GV03",
    name: "ThS. Trần Thị Mai",
    title: "Giảng viên Khoa Hệ thống Thông tin",
    avatar: "https://i.pravatar.cc/150?u=mai",
    department: "Hệ thống Thông tin",
    bio: "ThS. Trần Thị Mai chuyên nghiên cứu về cơ sở dữ liệu lớn và khai phá dữ liệu. Cô nổi tiếng với phương pháp giảng dạy tương tác cao, thường xuyên tổ chức các buổi thảo luận nhóm và dự án thực tế cho sinh viên.",
    expertise: ["Cơ sở dữ liệu", "Khai phá dữ liệu", "Big Data", "Data Visualization"],
    interactionScore: 95,
    interactionStatus: "Xuất sắc",
    aiMetrics: {
      engagementLevel: "Rất cao",
      movement: "Năng động"
    },
    classes: [
      { name: "Cơ sở dữ liệu", room: "Phòng 405", time: "Thứ 3, 5" },
      { name: "Khai phá dữ liệu", room: "Phòng 406", time: "Thứ 4" }
    ],
    achievements: [
      { title: "Giảng viên truyền cảm hứng 2023", org: "Đại học CMC" },
      { title: "Giải nhất báo cáo NCKH cấp trường", org: "Đại học CMC" }
    ]
  },
  {
    id: "GV04",
    name: "TS. Lê Hoàng Nam",
    title: "Giảng viên An toàn Thông tin",
    avatar: "https://i.pravatar.cc/150?u=nam",
    department: "An toàn Thông tin",
    bio: "TS. Lê Hoàng Nam là chuyên gia trong lĩnh vực bảo mật mạng và mật mã học. Ông từng làm việc tại nhiều công ty công nghệ lớn với vai trò Kỹ sư An ninh mạng trước khi quay lại môi trường học thuật tham gia giảng dạy.",
    expertise: ["Bảo mật mạng", "Mật mã học", "Đánh giá lỗ hổng", "Ethical Hacking"],
    interactionScore: 82,
    interactionStatus: "Tốt",
    aiMetrics: {
      engagementLevel: "Tốt",
      movement: "Vừa phải"
    },
    classes: [
      { name: "Mạng máy tính", room: "Phòng 502", time: "Thứ 2" },
      { name: "An toàn thông tin", room: "Phòng 503", time: "Thứ 4" }
    ],
    achievements: [
      { title: "Chuyên gia bảo mật xuất sắc", org: "VNISA" },
      { title: "Chứng chỉ quốc tế CISSP", org: "ISC2" }
    ]
  }
];

export default function TeachersPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!selectedTeacher) {
    return (
      <DashboardLayout>
        <TeacherGrid 
          filteredTeachers={filteredTeachers}
          onSelectTeacher={(teacher) => setSelectedTeacher(teacher)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <TeacherDetail 
        teacher={selectedTeacher}
        onBack={() => setSelectedTeacher(null)}
      />
    </DashboardLayout>
  );
}
