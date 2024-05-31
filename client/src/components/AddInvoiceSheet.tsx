import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const AddInvoiceSheet = () => {
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("http://localhost:5001/api/user/addInvoice", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.currentTarget.username.value,
      }),
    });

    setOpen(false);
    toast.success("User added successfully!");
  };

  return (
    <Dialog open={open}>
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
          <DialogTitle>Add Username</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Input
                    id="username"
                    placeholder="Username"
                    type="text"
                    className="col-span-3"
                  />
                </div>

                <Button type="submit">Add User</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceSheet;
