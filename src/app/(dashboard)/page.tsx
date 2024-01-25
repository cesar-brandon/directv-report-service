import { ReportDataTable } from "@/components/report/report-data-table";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();
  const user = session && session?.user;

  return (
    <main className="overflow-hidden flex flex-col gap-4 mt-4 p-2">
      <h3 className="text-3xl mb-4 py-8 text-primary font-bold bg-muted/50 rounded text-center">Informes de Servicio</h3>

      <div className="flex gap-4">
        {user.role === "TECHNICIAN" && (
          <Link className="flex gap-4 items-center" href="/create">
            <Button className="flex gap-2">
              Crear Informe <MoveRight />
            </Button>
          </Link>
        )}
      </div>
      <div>
        <ReportDataTable />
      </div>
    </main>
  );
}
