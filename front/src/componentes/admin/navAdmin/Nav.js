import React from "react";
import { NavAdmin } from "./NavAdmin";
import Sidebar from "./Sidebar";

function Nav() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 768;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  return <div>{width < breakpoint ? <NavAdmin /> : <Sidebar />}</div>;
}

export default Nav;
