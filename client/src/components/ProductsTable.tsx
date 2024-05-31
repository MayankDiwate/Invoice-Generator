import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductsTable = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    let total = 0;
    products.forEach((product: Product) => {
      total += product.rate * product.quantity;
    });
    setTotal(total);
  };

  const getProducts = async () => {
    const response = await fetch(`http://localhost:5001/api/invoices/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    getProducts();
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  return (
    <div>
      {products.length === 0 ? (
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
            {products.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.rate}</TableCell>
                <TableCell className="text-right">
                  ${product.rate * product.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {products.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">${total}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </div>
  );
};

export default ProductsTable;
