import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import MyListPage from "./pages/MyListPage";

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>
      </div>
    </Provider>
  );
}
