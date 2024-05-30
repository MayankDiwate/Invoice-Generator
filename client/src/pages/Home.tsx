import toast from "react-hot-toast";

const Home = () => {
  return <div>
    <button onClick={() => toast.success("Hello World")}>Home</button>
  </div>;
};

export default Home;
