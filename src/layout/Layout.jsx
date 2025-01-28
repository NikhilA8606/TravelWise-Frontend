import Footer from "@pages/Footer";
import Header from "@pages/Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
