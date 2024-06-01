import AddInvoiceSheet from "@/components/AddInvoiceSheet";
import Header from "@/components/Header";
import InvoiceTable from "@/components/InvoiceTable";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  });

  return (
    <div>
      <Header />
      <div className="mt-8 mx-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold ml-2">Invoices</h1>
          <AddInvoiceSheet />
        </div>
        <InvoiceTable />
      </div>
    </div>
  );
};

export default Home;
