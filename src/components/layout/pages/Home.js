import React, { Fragment } from "react";
import Search from "../../user/search/Search";
import Users from "../../user/Users";

const Home = ({ setAlert }) => {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
