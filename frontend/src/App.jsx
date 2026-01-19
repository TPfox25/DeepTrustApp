import { useState } from "react";
import Header from "./components/Header";
import TabSwitcher from "./components/TabSwitcher";
import HeroCard from "./components/HeroCard";
import UploadView from "./views/UploadView";
import LiveView from "./views/LiveView";

export default function App() {
  const [active, setActive] = useState("upload");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4">
      <Header />
      <TabSwitcher active={active} setActive={setActive} />
      <HeroCard>
        {active === "upload" ? <UploadView /> : <LiveView />}
      </HeroCard>
    </div>
  );
}
