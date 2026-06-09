"use client";

import React from "react";

interface BreadcrumbsProps {
  pageTitle: string;
}

export default function Breadcrumbs({ pageTitle }: BreadcrumbsProps) {
  return (
    <div className="hidden md:flex items-center gap-2 font-body-std text-body-std text-outline">
      <span className="hover:text-primary transition-colors cursor-pointer">Hệ thống</span>
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      <span className="font-semibold text-text-primary text-body-std">{pageTitle}</span>
    </div>
  );
}
