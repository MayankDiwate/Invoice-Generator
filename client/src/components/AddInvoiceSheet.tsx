import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Invoice } from "@/types/Invoice";

const AddInvoiceSheet = ({ addInvoice }: { addInvoice: (invoice: Invoice) => void }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [invoiceName, setInvoiceName] = useState("");
  const [open, setOpen] = useState(false);
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const res = await fetch("http://localhost:5001/api/invoice/addInvoice", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceName,
        userId: currentUser?.user?._id,
      }),
    });

    const data = await res.json();
    addInvoice(data["invoice"]);

    if (!res.ok) {
      toast.error(data.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setOpen(false);
    navigate(`/${data["invoice"]["_id"]}`);
    if (data["message"] === "Invoice added successfully") {
      toast.success(data["message"]);
    } else {
      setLoading(false);
      toast.error(data["message"]);
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
          Add Invoice
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Invoice name</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Input
                    id="name"
                    required
                    placeholder="Invoice Name"
                    type="text"
                    className="col-span-3"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setInvoiceName(e.currentTarget.value)
                    }
                  />
                </div>
                <Button disabled={loading} type="submit" className="text-base">
                  {loading ? "Adding..." : "Add"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceSheet;
