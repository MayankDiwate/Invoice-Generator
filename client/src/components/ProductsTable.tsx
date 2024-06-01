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

const ProductsTable = ({
  products,
  total,
}: {
  products: Product[];
  total: number;
}) => {
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
                <TableCell>₹{product.rate}</TableCell>
                <TableCell className="text-right">
                  ₹{product.rate * product.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {products.length > 0 && (
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
