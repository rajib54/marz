import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from "./HomePage";
import { PRODUCT_URL } from "../ApiHelper";

export default {
    title: 'Home Page',
    component: HomePage,
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)]
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => <HomePage />;

export const GetProductSuccess = Template.bind({});
GetProductSuccess.parameters = {
    mockData: [
        {
            url: PRODUCT_URL,
            method: 'GET',
            status: 200,
            response: {
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
            },
        },
    ],
};

export const GetProductSuccessEmpty = Template.bind({});
GetProductSuccessEmpty.parameters = {
    mockData: [
        {
            url: PRODUCT_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [],
                message: "No products found"
            },
        },
    ],
};

export const GetProductError = Template.bind({});
GetProductError.parameters = {
    mockData: [
        {
            url: PRODUCT_URL,
            method: 'GET',
            status: 500,
            response: {
                data: [],
                message: "Error"
            }
        },
    ],
};
