import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title, image }) => {
  return (
    <Helmet>
      <title>{`More Yl | ${title}`}</title>
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />

      <meta property="og:title" content={`More Yl | ${title}`} />
    </Helmet>
  );
};

export default MetaData;
