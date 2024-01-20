import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "react-query";
import axios from "axios";
import { PDF } from "./pdf";

interface Props {
  dataDetail: ReportServiceTable;
}
const PreviewPDF = ({ dataDetail }: Props) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [data, setData] = useState<ReportServiceTable[]>([
    {
      id: "1",
      reportNumber: "001",
      client: "Jose Mensoza Saravia",
      address: "Su Casa",
      province: "Chincha",
      district: "Chincha Alta",
      reportDate: "18/01/2024",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  //   const { data, isLoading, error } = useQuery(
  //     ["proforma", dataDetail.proforma_id],
  //     async () => {
  //       const res = await axios.get(`/proformas/${dataDetail.proforma_id}`);
  //       return res.data;
  //     }
  //   );

  useEffect(() => {
    setLoadingProgress(0);
    const increment = 100 / (1.6 * 10);

    const intervalId = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const nextProgress = prevProgress + increment;

        if (nextProgress >= 100) {
          clearInterval(intervalId);
          return 100;
        }

        return nextProgress;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Progress value={loadingProgress} className="bg-muted w-[20rem]" />
      </div>
    );
  }

  return (
    <PDFViewer style={{ width: "100%", height: "80vh" }}>
      {data && <PDF  />}
    </PDFViewer>
  );
};

export default PreviewPDF;
