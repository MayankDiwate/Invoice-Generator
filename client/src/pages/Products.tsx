import AddProductSheet from "@/components/AddProductSheet";
import Header from "@/components/Header";
import ProductsTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Products = () => {
  return (
    <div>
      <Header />
      <div className="mt-8 mx-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Products</h1>
          <div className="flex gap-2">
            <AddProductSheet />
            <Button size={"sm"} className="flex gap-2">
              <Download size={16} /> 
              <span className="hidden sm:block">Generate Invoice</span>
            </Button>
          </div>
        </div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;
