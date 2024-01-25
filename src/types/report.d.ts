interface Client {
  id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  phone: string;
  email: string;
  image: string;
  contactPerson: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  createdAt: string;
  updatedAt: string;
  signature: string;
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

interface Employee {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  role: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  installationCompanyId: string;
  InstallationCompany: Company;
}
interface Customer {
  id: string;
  name: string;
  address: string;
  district: string;
  subscriptionDate: string;
  email: string;
  cellNumber: string;
  signature: string;
  image: string;
}
interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}
interface ReportService {
  id: string;
  number: string;
  employeeId: string;
  employee: Employee;
  customerId: string;
  customer: Customer;
  companyId: string;
  company: Company;
  serviceDate: string;
  serviceDetails: string;
  serviceStatus: string;
  pdfReport: string;
  customerObservations: string;
  technicianObservations: string;
  training: string;
  closureInfo: string;
  products: {
    product: Product;
    quantityUsed: string;
  }[];
  services: {
    service: Service;
  }[];
}
