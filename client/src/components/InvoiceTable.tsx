import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/types/Invoice";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const InvoiceTable = ({ invoiceList }: { invoiceList: Invoice[] }) => {
  const navigate = useNavigate();

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
