import React, { useEffect, useState } from "react";
import HeaderLogged from "components/Header/HeaderLogged";

const SiteHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    toDark();
  }, []);

  const toDark = () => {
    setIsDarkMode(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
  };

  const toLight = () => {
    setIsDarkMode(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
  };

  return <HeaderLogged />;
};

export default SiteHeader;
