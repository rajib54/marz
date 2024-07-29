
import React, { useEffect } from "react";
import { useState } from "react";
import PageWrapper from '../PageWrapper';
import { Product } from "../../components/interfaces";
import { getProductData } from "../ApiHelper";
import Spinner from "../../components/Spinner/Spinner";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR'
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [products, setProducts] = useState<Product[] | null | undefined>([]);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getProductData();
    setProducts(productData.products);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="product-loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded) 
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="product-container"
      >
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
          </tr>
          {products && products.map((product) => (
              <tr>
                <td scope="col">{product.ProductID}</td>
                <td scope="col">{product.ProductName}</td>
                <td scope="col"><img src={product.ProductPhotoURL}/></td>
            </tr>
          ))}
        </thead>
      </table>
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="product-error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return (
    <PageWrapper>
      { content }
    </PageWrapper>
  );
};

export default ProductsPage
