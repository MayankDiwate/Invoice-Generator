import AddProductSheet from "@/components/AddProductSheet";
import Header from "@/components/Header";
import ProductsTable from "@/components/ProductsTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Product } from "@/types/Product";
import { UserType } from "@/types/User";
import { ChevronRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Products = () => {
  const currentUser: {
    message: string;
    user: UserType;
  } | null = useAppSelector((state: RootState) => state.user.currentUser);
  const { products } = useAppSelector((state: RootState) => state.products);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [invoiceName, setInvoiceName] = useState("");
  const { id } = useParams();

  const getTotal = () => {
    const _total = products
      .filter((product: Product) => product.invoiceId === id)
      .map((product: Product) => product.rate * product.quantity)
      .reduce((a, b) => a + b, 0);

    setTotal(_total);
  };

  const getInvoice = async () => {
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

    if (!response.ok) {
      toast.error(data.message);
    }
    setInvoiceName(data[0]["invoiceName"]);
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    await fetch(`http://localhost:5001/api/product/generatePDF/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceName,
        total,
      }),
    });

    setLoading(false);
    toast.success("PDF generated successfully!");
    // toast.promise(handleGeneratePDF(), {
    //   loading: "Downloading PDF...",
    //   success: <b>PDF saved successfully.</b>,
    //   error: <b>Could not save PDF.</b>,
    // });
  };

  useEffect(() => {
    getInvoice();
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  return (
    <div>
      <Header />
      <div className="mt-8 mx-10">
        <div className="flex justify-between items-center mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <h1 className="text-xl font-bold text-black hover:bg-gray-100 p-1 px-2 hover:rounded-md">
                    Invoices
                  </h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-black">
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${id}`}>
                  <h1 className="text-xl font-bold text-black hover:bg-gray-100 p-1 px-2 hover:rounded-md">
                    {invoiceName}
                  </h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-2">
            <AddProductSheet />
            <Button
              size={"sm"}
              className="flex gap-2"
              onClick={handleGeneratePDF}
              disabled={loading}
            >
              <Download size={16} />
              <span>{loading ? "Downloading PDF..." : "Download PDF"}</span>
            </Button>
          </div>
        </div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;
