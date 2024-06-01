import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductsTable = () => {
  const { products } = useAppSelector((state: RootState) => state.products);
  const [productList, setProductList] = useState<Product[]>([]);
  const { id } = useParams();

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    const _total = products
      .filter((product: Product) => product.invoiceId === id)
      .map((product: Product) => product.rate * product.quantity)
      .reduce((a, b) => a + b, 0);

    setTotal(_total);
  };

  const getProducts = async () => {
    const response = await fetch(`http://localhost:5001/api/product/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
    }

    setProductList(data);
  };

  useEffect(() => {
    getTotal();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  return (
    <div>
      {productList.length === 0 ? (
        <div className="flex items-center justify-center h-[34rem] text-md mx-2">
          No Products Found!
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sm:w-[200px]">Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>₹{product.rate}</TableCell>
                <TableCell className="text-right">
                  ₹{product.rate * product.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {productList.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>GST (18%)</TableCell>
                <TableCell className="text-right">₹{total * 0.18}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">₹{total * 1.18}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </div>
  );
};

export default ProductsTable;
