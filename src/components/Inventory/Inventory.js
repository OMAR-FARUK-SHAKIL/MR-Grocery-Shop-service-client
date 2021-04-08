import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Inventory.css";
const axios = require("axios");

const Inventory = () => {
  const { register, handleSubmit } = useForm();
  const [imageURl, setImageURL] = useState(null);

  const [products, setProducts] = useState([]);

  function loadData() {
    // useEffect(()=>{
    fetch("https://nameless-plateau-15904.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("data=", data);
        // setProducts(data);

        const container = document.getElementById("manage-product");
        container.innerHTML = "";
        data.forEach((pd) => {
          // console.log('data=', pd.name);

          const p = document.createElement("p");
          p.innerHTML = `${pd.name} --price:${pd.price} --quantity:${pd.quantity}
            <button onclick="update()">update</button>
            <button onclick="deleteProduct(${pd._id})">delete</button><hr>`;
          //  p.textContent = text;
          container.appendChild(p);
          
        });
      });
  }
  loadData();

// const allGoods =()=>{

//   fetch("http://localhost:4000/products")
//   fetch("https://nameless-plateau-15904.herokuapp.com//products")
//     .then((res) => res.json())
//     .then((data) => setProducts(data));

// }
// allGoods();


  const deleteProduct = (id) => {
     console.log(id);
    fetch(`https://nameless-plateau-15904.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
          alert('deleted successfully,Reload please!');
        console.log("deleted successfully!!");
        if (result) {
          // event.target.parentNode.style.display='none';
        //   loadData();
        }
      });
  };


  const onSubmit = (data) => {
    console.log("form submitted", data);
    const product = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      imageURL: imageURl,
    };
    fetch("https://nameless-plateau-15904.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
           alert('Your order submitted successfully');
        }
      });
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "fb591b302a303b79a247b8e957b14fc2");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        console.log(res.data.data.display_url);
        setImageURL(res.data.data.display_url);
      })
      .catch((err) => console.log(err));
  };




  const newProduct = () => {
    document.getElementById("new-product").style.display = "block";
    document.getElementById("manage-product").style.display = "none";
  };
  const manageProduct = () => {
    document.getElementById("new-product").style.display = "none";
    document.getElementById("manage-product").style.display = "block";
  };

  

  return (
    <div>
      <button onClick={newProduct}>Insert New Product</button><br></br>
      <button onClick={manageProduct}>Manage Product</button>

      <div id="new-product">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <p>
            <span>Name:</span>
            <input
              name="name"
              defaultValue="potato"
              ref={register({ required: true })}
            />
          </p>

          <p>
            <span>Price:</span>
            <input
              name="price"
              defaultValue="20"
              ref={register({ required: true })}
            />
          </p>
          <p>
            <span>Quantity:</span>
            <input
              name="quantity"
              defaultValue="1"
              ref={register({ required: true })}
            />
          </p>
          <p>
            <span>Product Image:</span>
            <input type="file" onChange={handleImageUpload} />
          </p>

          <input type="submit" />
          
        </form>
      </div>

      <div id="manage-product">
      {/* {products.length === 0 && (
            <h1>Loading...</h1>      
         )} 
         { products.map(item =>
         <li>
            <h3>name:{item.name} --price:{item.price} --quantity:{item.quantity}</h3>
            <button onClick={deleteProduct(`${item._id}`)}>Delete</button>
            </li>
            )}
            */}
         </div> 
     
    </div>
  );
};

export default Inventory;
