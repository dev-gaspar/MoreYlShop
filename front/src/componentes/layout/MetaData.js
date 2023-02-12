import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title, url }) => {
  return (
    <Helmet>
      <title>{`More Yl | ${title}`}</title>
      <meta property="og:image" content={url} />
      {console.log(title)}
      {console.log(url)}
      <meta property="og:title" content={`More Yl | ${title}`} />
    </Helmet>
  );
};

export default MetaData;
