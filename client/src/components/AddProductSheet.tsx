import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Plus } from "lucide-react";

const AddProductSheet = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`http://localhost:5001/api/invoices/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceId: id,
        name,
        quantity,
        rate,
      }),
    });

    setOpen(false);
    toast.success("Product added successfully!");
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button size={"sm"} className="flex gap-2" onClick={() => setOpen(true)}><Plus  size={16}/>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Product</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="text-black font-semibold">
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="w-20">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="col-span-3"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setName(e.currentTarget.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="quantity" className="w-20">
                    Quantity
                  </Label>
                  <Input
                    id="number"
                    min={1}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setQuantity(parseInt(e.currentTarget.value))
                    }
                    type="number"
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="rate" className="w-20">
                    Rate
                  </Label>
                  <Input
                    id="number"
                    placeholder="Rate"
                    type="number"
                    className="col-span-3"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setRate(parseInt(e.currentTarget.value))
                    }
                  />
                </div>
                <Separator />
                <div className="flex justify-between items-center px-2">
                  <div>GST (18%)</div>
                  <div>{rate * 0.18}</div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div>Total</div>
                  <div>{rate * quantity * 1.18}</div>
                </div>
                <Separator />

                <Button type="submit">Add Product</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductSheet;
