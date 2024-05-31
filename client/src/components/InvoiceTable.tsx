import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/types/Invoice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const InvoiceTable = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:5001/api/invoices", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setInvoices(data);
  };

  useEffect(() => {
    getUsers();
  }, [invoices]);
  return (
    <>
      {invoices.length === 0 ? (
        <div className="flex items-center justify-center h-[34rem] text-md mx-2">
          No Invoices Found!
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="text-center">Username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice: Invoice) => {
              return (
                <TableRow
                  key={invoice._id}
                  onClick={() => {
                    navigate(`/${invoice._id}`);
                  }}
                  className={"cursor-pointer"}
                >
                  <TableCell className="font-medium">{invoice._id}</TableCell>
                  <TableCell className="text-center">
                    {invoice.username}
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
