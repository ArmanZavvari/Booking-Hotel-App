import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./component/Header/Header";
import LocationList from "./component/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./component/AppLayout/AppLayout";
import Hotels from "./component/Hotels/Hotels";
import HotelsProvider from "./component/context/HotelsProvider";
import SingleHotel from "./component/SingleHotel/SingleHotel";

function App() {
  return (
    <div>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </div>
  );
}

export default App;
