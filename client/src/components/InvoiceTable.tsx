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
import { UserType } from "@/types/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const InvoiceTable = () => {
  const navigate = useNavigate();
  const { invoices } = useAppSelector((state: RootState) => state.invoices);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const currentUser: {
    message: string;
    user: UserType;
  } | null = useAppSelector((state: RootState) => state.user.currentUser);

  const getInvoices = async () => {
    const response = await fetch("http://localhost:5001/api/invoice", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser!["user"]._id,
      }),
    });

    const data = await response.json();
    setInvoiceList(data);
  };

  useEffect(() => {
    getInvoices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices.length]);

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
                <TableRow
                  key={index}
                  onClick={() => {
                    navigate(`/${invoice._id}`);
                  }}
                  className={"cursor-pointer"}
                >
                  <TableCell className="font-medium">{invoice._id}</TableCell>
                  <TableCell className="text-center">
                    {invoice.invoiceName}
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
