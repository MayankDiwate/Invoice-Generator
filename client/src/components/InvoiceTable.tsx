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
const InvoiceTable = ({
  invoiceList,
  isLoading,
}: {
  invoiceList: Invoice[];
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  const deleteInvoiceById = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/invoice`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoiceId: id,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      }

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {invoiceList.length === 0 ? (
        <div className="flex items-center justify-center h-[34rem] text-md mx-2">
          {isLoading ? "Loading..." : "No Invoices Found!"}
        </div>
      ) : (
        <>
          {invoiceList.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead className="text-center">Invoice Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceList.length > 0 &&
                  invoiceList.map((invoice: Invoice, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {invoice._id}
                        </TableCell>
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
          ) : (
            <div className="flex items-center justify-center h-[34rem] text-md">
              No Invoices Found!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InvoiceTable;
