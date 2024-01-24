import { ReportForm } from "@/components/report/report-form";
import { getAuthSession } from "@/lib/auth";

export default async function CreateReportPage() {
  const session = await getAuthSession();
  const user = session && session?.user;
  return (
    <div className="py-6 flex flex-col gap-8">
      <h1 className="text-3xl mb-4 py-8 text-primary font-bold bg-muted/50 rounded text-center">Registrar Informe de Servicio</h1>
      <ReportForm user={user} />
    </div>
  );
}
