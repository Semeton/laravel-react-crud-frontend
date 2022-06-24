import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function List() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get(`http://http://127.0.0.1:8000/api/products/${id}`)
      .then(({ data }) => {
        setProducts(data);
      });
  };

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You wont be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });
    if (!isConfirm) {
      return;
    }
    await axios
      .delete(`http://http://127.0.0.1:8000/api/products/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "Success",
          text: data.message,
        });
        fetchProducts();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link
            className="btn btn-primary mb-2 float-end"
            to={"/product/create"}
          ></Link>
        </div>
      </div>
    </div>
  );
}
