interface Client {
  id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  phone: string;
  email: string;
  contactPerson: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  createdAt: string;
  updatedAt: string;
}

type Service = {
  id: string;
  code: string;
  serviceName: string;
  woNumber: string;
};

type Product = {
  id: string;
  item: string;
};

interface ReportServiceTable {
  id: string;
  number: string;
  name: string;
  address: string;
  district: string;
  serviceDate: string;
}
