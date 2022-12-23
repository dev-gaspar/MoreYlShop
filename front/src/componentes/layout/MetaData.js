import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`More Yl | ${title}`}</title>
    </Helmet>
  );
};

export default MetaData;