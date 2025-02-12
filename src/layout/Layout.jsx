import Footer from "@pages/Footer";
import Header from "@pages/Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
