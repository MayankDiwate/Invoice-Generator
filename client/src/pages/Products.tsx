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
import { Invoice } from "@/Invoice";
import { Product } from "@/types/Product";
import { usePDF } from "@react-pdf/renderer";
import { ChevronRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productUpdated, setProductUpdated] = useState(true);
  const { id } = useParams();
  const filteredProducts = products.filter(
    (product) => product.invoiceId === id
  );
  const [instance] = usePDF({
    document: <Invoice id={id!} products={filteredProducts} />,
  });
  const [invoiceName, setInvoiceName] = useState("");

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
    setProductUpdated(true);
  };

  const getProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/product/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
    }

    setProducts(data);
  };

  const getInvoice = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/invoice/getInvoice`,
      {
        method: "POST",
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
    setInvoiceName(data.invoiceName);
  };

  useEffect(() => {
    if (productUpdated) {
      getProducts();
      setProductUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <h1 className="text-xl font-bold text-black hover:bg-gray-100 p-1 px-2 hover:rounded-md">
                  {invoiceName}
                </h1>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-2">
            <AddProductSheet addProduct={addProduct} />
            <a href={instance.url!} download={"invoice.pdf"}>
              <Button
                size={"sm"}
                className="flex gap-2"
                disabled={instance.loading}
              >
                <Download size={16} />
                <span className="hidden sm:block">
                  {instance.loading ? "Downloading PDF..." : "Download PDF"}
                </span>
              </Button>
            </a>
          </div>
        </div>
        <ProductsTable productList={products} />
      </div>
    </div>
  );
};

export default Products;
