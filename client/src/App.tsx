import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { persistor, store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:id" element={<Products />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen">
                  404 | Page Not Found!
                </div>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
