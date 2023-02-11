import React from "react";
import ContentLoader from "react-content-loader";

function ProductLoading() {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3 p-2 best">
      <div className="collection-img position-relative">
        <ContentLoader
          speed={2}
          height={`100%`}
          width={`100%`}
          viewBox="0 0 500 500"
        >
          <rect x="0" y="0" rx="5" ry="5" height={500} width={500} />
        </ContentLoader>
      </div>

      <div className="text-center">
        <ContentLoader
          speed={2}
          height={`100%`}
          width={`100%`}
          viewBox="0 0 200 20"
          className="mt-3"
        >
          <rect x="0" y="0" rx="5" ry="5" height={20} width={200} />
        </ContentLoader>
      </div>
      <div className="text-center">
        <ContentLoader
          speed={2}
          height={`100%`}
          width={`100%`}
          viewBox="0 0 200 20"
          className="mt-2"
        >
          <rect x="0" y="0" rx="5" ry="5" height={15} width={200} />
        </ContentLoader>
      </div>
    </div>
  );
}

export default ProductLoading;
