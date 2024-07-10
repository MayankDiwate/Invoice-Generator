import { signInSuccess } from "@/redux/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export type SignInType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<SignInType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email === "" || formData.password === "") {
      return toast.error("Please fill in all fields");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        dispatch(signInSuccess(data.user));
        toast.success("User signed in successfully");
        navigate("/");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto flex flex-col justify-center h-screen">
      <h1 className="text-5xl font-semibold text-center my-7">
        Invoice Generator
      </h1>
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <div className="w-full relative">
          <input
            type={passwordType}
            placeholder="Password"
            className="border p-3 rounded-lg w-full"
            id="password"
            onChange={handleChange}
          />
          <span
            onClick={() =>
              setPasswordType(passwordType === "password" ? "text" : "password")
            }
            className="absolute right-3 top-4"
          >
            {passwordType === "password" ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </span>
        </div>
        <button
          className="
            bg-slate-700
            text-white
            p-3
            rounded-lg
            uppercase
            hover:opacity-95
            disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-1 items-center justify-end mt-2">
        <p className="text-sm text-gray-400">Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700 hover:underline text-sm">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
