import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Invoice } from "@/types/Invoice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const InvoiceTable = () => {
  const navigate = useNavigate();
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  const getInvoices = async () => {
    const response = await fetch("http://localhost:5001/api/invoice", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser?.user?._id,
      }),
    });

    const data = await response.json();
    setInvoiceList(data);
  };

  const deleteInvoiceById = async (id: string) => {
    const response = await fetch("http://localhost:5001/api/invoice", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceId: id,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
    }

    toast.success(data.message);
  };

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceList]);

  return (
    <>
      {invoiceList.length === 0 ? (
        <div className="flex items-center justify-center h-[34rem] text-md mx-2">
          No Invoices Found!
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="text-center">Invoice Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceList.map((invoice: Invoice, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{invoice._id}</TableCell>
                  <TableCell
                    className="text-center cursor-pointer hover:underline"
                    onClick={() => {
                      navigate(`/${invoice._id}`);
                    }}
                  >
                    {invoice.invoiceName}
                  </TableCell>
                  <TableCell
                    className="w-20"
                    onClick={() => deleteInvoiceById(invoice._id)}
                  >
                    <Trash2 size={18} color="red" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default InvoiceTable;
