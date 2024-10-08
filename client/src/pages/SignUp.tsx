import { useAppDispatch } from "@/redux/hooks";
import { signUpFailure, signUpSuccess } from "@/redux/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export type SignUpType = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpType>({
    username: "",
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        dispatch(signUpFailure(data.message));
        toast.error(data.message);
        return;
      }

      setLoading(false);
      dispatch(signUpSuccess(data.user));
      toast.success("User registered successfully");
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      dispatch(signUpFailure((error as Error).message));
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto flex flex-col justify-center h-screen">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-1 items-center justify-end mt-2">
        <p className="text-gray-400 text-sm">Already have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700 hover:underline text-sm">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
