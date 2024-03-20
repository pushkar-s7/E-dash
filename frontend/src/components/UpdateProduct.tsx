import React,{useEffect, useState} from "react";
import { useParams , useNavigate} from "react-router-dom";

interface Product{
    id:string;
    name:string;
    price:string;
    category:string;
    company:string;
}

const UpdateProduct = () => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const params=useParams<{id:string}>();
    const navigate=useNavigate();


    useEffect(()=>{
        getProducts();
    },[])

    const getProducts= async ()=>{
        let result = await fetch(`http://localhost:4000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token') || "[]")}`,
            }
        });
        let result1:Product = await result.json();
        // console.log(result.userId);
        setName(result1.name);
        setPrice(result1.price);
        setCategory(result1.category);
        setCompany(result1.company);
    }


    const updateProduct=async ()=>{
        console.log({name,price,category,company});
        let result= await fetch(`http://localhost:4000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
              'Content-Type':'application/json',
              authorization:`bearer ${JSON.parse(localStorage.getItem('token') || "[]]")}`

            }
        })
        result=await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="add-product">
            <h1>Update Product</h1>
            < input type="text" placeholder="Enter Product name" className="inputBox" 
              value={name} onChange={(e)=>setName(e.target.value)}
            />
            <input type="text" placeholder="Enter Product price" className="inputBox" 
            value={price} onChange={(e)=>setPrice(e.target.value)}
            />
            <input type="text" placeholder="Enter Product category" className="inputBox" 
             value={category} onChange={(e)=>setCategory(e.target.value)}
            />
            <input type="text" placeholder="Enter Product company" className="inputBox" 
             value={company} onChange={(e)=>setCompany(e.target.value)}
            />
            <button className="signUpbtn" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
