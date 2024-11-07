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
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductsTable = ({productList}: {productList: Product[]}) => {
  // const { products } = useAppSelector((state: RootState) => state.products);
  // const dispatch = useAppDispatch();
 
  const { id } = useParams();

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    const _total = productList
      .filter((product: Product) => product.invoiceId === id)
      .map((product: Product) => product.rate * product.quantity)
      .reduce((a, b) => a + b, 0);

    setTotal(_total);
  };

  

  const deleteProductById = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/product`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
    }

    toast.success(data.message);
  };

  useEffect(() => {
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList]);

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
                <TableCell
                  className="w-20 cursor-pointer"
                  onClick={() => deleteProductById(product._id)}
                >
                  <Trash2 size={18} color="red" />
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
