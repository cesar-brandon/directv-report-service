"use client";

import PreviewPDF from "@/components/preview-pdf";

const dataDetail: ReportServiceTable = {
  id: "clrrzyiph0001eqjfd72wzhzw",
  number: "1",
  serviceDate: "2024-01-21T06:02:15.296Z",
  name: "Maria Rodriguez",
  address: "Avenida Siempre Viva 456",
  district: "Grocio Prado",
  serviceStatus: "Pendiente",
};

export default function Page() {
  return (
    <div className="w-full h-[85vh]">
      <PreviewPDF dataDetail={dataDetail} />
    </div>
  );
}