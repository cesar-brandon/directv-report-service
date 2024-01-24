import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "react-query";
import axios from "axios";
import { PDF } from "./pdf";

interface Props {
  dataDetail: ReportServiceTable;
}

async function getReportDetail(id: string) {
  const res = await axios.get(`/api/report/${id}`);
  return res.data;
}

const PreviewPDF = ({ dataDetail }: Props) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { data, isLoading } = useQuery(
    ["reportDetail", dataDetail.id],
    () => getReportDetail(dataDetail.id),
    {
      enabled: !!dataDetail.id,
    }
  );
  useEffect(() => {
    setLoadingProgress(0);
    const increment = 100 / (0.5 * 10);

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
    <PDFViewer style={{ width: "100%", height: "100%", borderRadius: "15px" }}>
      {data && <PDF data={data} />}
    </PDFViewer>
  );
};

export default PreviewPDF;
