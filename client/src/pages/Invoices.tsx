import AddInvoiceSheet from "@/components/AddInvoiceSheet";
import Header from "@/components/Header";
import InvoiceTable from "@/components/InvoiceTable";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Invoice } from "@/types/Invoice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const navigate = useNavigate();
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  useEffect(() => {
    if (!currentUser?.user) {
      navigate("/signin");
    }
  });

  const getInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/invoice`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.user?._id,
          }),
        }
      );

      const data = await response.json();
      setInvoiceList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error((error as Error).message);
    }
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoiceList((prev) => [...prev, invoice]);
  };

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div className="mt-8 mx-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold ml-2">Invoices</h1>
          <AddInvoiceSheet addInvoice={addInvoice} />
        </div>
        <InvoiceTable invoiceList={invoiceList} isLoading={loading} />
      </div>
    </div>
  );
};

export default Invoices;
