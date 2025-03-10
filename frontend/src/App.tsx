import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HomeBody from "./Components/HomeBody/HomeBody";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import CreateBlog from "./Pages/CreateBlog/CreateBlog";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import News from "./Pages/News/News";
import MilitaryNews from "./Pages/MilitaryNews/MilitaryNews";
import GeoNews from "./Pages/GeoNews/GeoNews";
import SpaceNews from "./Pages/SpaceNews/SpaceNews";
import SignUp from "./Pages/SignUp/SignUp";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from 'redux-persist/integration/react';
import BlogDetail from "./Pages/BlogDetail/BlogDetail";
import SearchResults from "./Components/SearchResults/SearchResults";
import EditBlog from "./Pages/EditBlog/EditBlog";

function App() {
  return (
    <div className="app-div">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="api/auth/login" element={<Login />} />
          <Route path="/api/auth/sign-up" element={<SignUp />} />
          <Route path="/" element={<HomeBody />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/api/news" element={<News />} />
          <Route path="/api/military-news" element={<MilitaryNews />} />
          <Route path="/api/geopolitics-news" element={<GeoNews />} />
          <Route path="/api/space-news" element={<SpaceNews />} />
          <Route path="/blog/:id" element={<BlogDetail/>}/>
          <Route path="/search" element={<SearchResults />} />
          <Route path="/editblog/:id" element={<EditBlog/>}/>
        </Routes>
      </BrowserRouter>
      </PersistGate>
      </Provider>
      
    </div>
  );
}

export default App;
