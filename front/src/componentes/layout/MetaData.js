import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title, descripcion = "", image = "" }) => {
  return (
    <Helmet>
      <title>{`More Yl | ${title}`}</title>
      <meta name={title} content={descripcion} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default MetaData;
