import React from "react";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner.js";
import RoewList from "../../components/Rows/RowList/RoewList.js";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <RoewList/>
      <Footer />
    </>
  );
};

export default Home;
