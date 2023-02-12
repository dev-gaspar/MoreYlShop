import React from "react";
import { Helmet } from "react-helmet";

const MetaProducts = ({ title, description, image }) => {
  return (
    <>
      <Helmet>
        <title>{`More Yl | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta property="og:title" content={`More Yl | ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Helmet>
    </>
  );
};

export default MetaProducts;
