import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./component/Header/Header";
import LocationList from "./component/LocationList/LocationList";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
