import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import Page404 from "./pages/Page404/Page404";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import NewsCategory from "./pages/NewsCategory/NewsCategory";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import { FavoritesContext } from "./store/Favorites/context";
import { initialState, favoritesReducer } from "./store/Favorites/reducer";

function App() {
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialState
  );
  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    <div className="App">
     <FavoritesContext.Provider value={favoritesContextValue}>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/category/:categoryId" element={<NewsCategory />} />
        <Route path="/news/:newsId/*" element={<NewsDetails />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
     </FavoritesContext.Provider>
    </div>
  );
}

export default App;
