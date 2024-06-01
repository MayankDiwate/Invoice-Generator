import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/slices/productSlice";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

const AddProductSheet = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !quantity || !rate) {
      toast.error("Please fill all the fields");
      return;
    } else if (rate < 0 || quantity < 0) {
      toast.error("Please enter valid quantity and rate");
    }

    const res = await fetch(
      `http://localhost:5001/api/invoices/addProduct/${id}`,
      {
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
      }
    );

    const data = await res.json();

    setOpen(false);
    dispatch(addProduct(data["product"]));

    if (!res.ok) {
      toast.error(data.message);
    }

    navigate(`/${data['product']._id}`);

    if(data.message === "Product added successfully") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size={"sm"}
          className="flex gap-2"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} />
          <span className="hidden sm:block">Add Product</span>
        </Button>
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
                    required
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
                    required
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
                    required
                    className="col-span-3"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setRate(parseInt(e.currentTarget.value))
                    }
                  />
                </div>
                <Separator />
                <div className="flex justify-between items-center px-2">
                  <div>GST (18%)</div>
                  <div>₹{rate * 0.18}</div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div>Total</div>
                  <div>₹{rate * quantity * 1.18}</div>
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
