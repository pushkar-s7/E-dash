import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
     const navigate=useNavigate();

    const addData = async () => {
        console.log({ name, price, category, company });
        const userId = JSON.parse(localStorage.getItem('users')|| "[]")._id;

        let result = await fetch('http://localhost:4000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token')|| "[]")}`

            }
        });

        result = await result.json();
        if(result){
            navigate('/');
        }
        console.log(result);
    }

    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Product price"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Product category"
                value={category} onChange={(e) => setCategory(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Product company"
                value={company} onChange={(e) => setCompany(e.target.value)}
            />
            <button className="signUpbtn" onClick={addData}>AddProduct</button>
        </div>
    )
};

export default AddProduct;