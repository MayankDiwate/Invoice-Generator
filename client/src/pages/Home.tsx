import AddInvoiceSheet from "@/components/AddInvoiceSheet";
import Header from "@/components/Header";
import InvoiceTable from "@/components/InvoiceTable";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="mt-8 mx-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Invoices</h1>
          <AddInvoiceSheet />
        </div>
        <InvoiceTable />
      </div>
    </div>
  );
};

export default Home;
