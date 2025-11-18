import "./App.css";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Cards from "./components/Card/Cards";
import MyMovies from "./components/FavoriteCards/MyMovies";
import Filter from "./components/FilterMenu/Filter";
import store from "./store";
import TabPanel from "./components/Header/TabPanel";

export default function App() {
  return (
    <Provider store={store}>
      <>
        <TabPanel />

        <Routes>
          <Route path="/" element={<Cards />} />
          <Route
            path="/collection"
            element={
              <>
                <Filter />
                <MyMovies />
              </>
            }
          />
        </Routes>
      </>
    </Provider>
  );
}
