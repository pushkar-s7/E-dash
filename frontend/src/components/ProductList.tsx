import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiTrash } from 'react-icons/bi';

interface Product{
    _id:string;
    name:string;
    price:string;
    category:string;
    company:string;
   
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:4000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token')||"[]")}`
            }
        });
        let result1:Product[] = await result.json();
        setProducts(result1);
        console.log(result1);
    }

    const deleteProduct = async (id:any) => {
        let result = await fetch(`http://localhost:4000/product/${id}`, {
            method: 'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token')||"[]")}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
    const searchProduct = async (e:ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token')||"[]")}`
                }
            });
            let result2:Product[] = await result.json();
            if (result) {
                setProducts(result2);
            }
        }else{
           getProducts();
        }
    }

    return (
        <div className="product-list">
            <h1>Product-List</h1>
            <input type="text" placeholder="Search Product" className="search-product"
                onChange={searchProduct}
            />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? 
                 products.map((items, index) =>
                    <ul key={items._id}>
                        <li>{index + 1}</li>
                        <li>{items.name}</li>
                        <li>${items.price}</li>
                        <li>{items.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(items._id)}><BiTrash /></button>
                            <Link to={`/update/${items._id}`} className="updatebtn">Update</Link>
                        </li>
                    </ul>
                ):
                <h2>No Product found 🤔</h2>
            }
        </div>
    )
}

export default ProductList;


