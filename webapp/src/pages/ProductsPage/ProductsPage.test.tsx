import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { PRODUCT_URL } from "../ApiHelper";
import { render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
    it("shouldDisplayLoadingSpinner", () => {
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        expect(screen.getByTestId(`product-loading-spinner-container`)).toBeInTheDocument();
    });
    it("shouldDisplayProducts", async() => {
        // set up mock for axios.get
        const response = {
            data: [
                {
                    "ProductID": 1,
                    "ProductName": "Hat",
                    "ProductPhotoURL": "https://plus.unsplash.com/premium_photo-1675989087109-f8a00bfea7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "ProductStatus": "Active"
                  },
                  {
                    "ProductID": 2,
                    "ProductName": "Shoes",
                    "ProductPhotoURL": "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "ProductStatus": "Active"
                  },
                  {
                    "ProductID": 3,
                    "ProductName": "Pants",
                    "ProductPhotoURL": "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "ProductStatus": "Active"
                  }
            ],
            message: ""
        };
        const server = setupServer(
          rest.get(PRODUCT_URL, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(response));
          })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId(`product-container`)).toBeInTheDocument();
        });
        server.close();
    });
    it("shouldDisplayErrorMessage", async() => {
        // set up mock for axios.get
        const response = {
            data: [],
            message: "Error"
        };
        const server = setupServer(
          rest.get(PRODUCT_URL, (req, res, ctx) => {
            return res(ctx.status(500), ctx.json(response));
          })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByTestId(`product-error-container`)).toBeInTheDocument();
        });
        server.close();
    });
});