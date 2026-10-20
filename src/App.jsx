
import { useState } from "react";
import Splash from "./components/Splash";
import MainPresentation from "./components/MainPresentation";
import "./App.css";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <Splash onEnter={() => setShowSplash(false)} />
  ) : (
    <MainPresentation />
  );
}
