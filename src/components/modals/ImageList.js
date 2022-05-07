import React, { useState, useEffect } from "react";
import Modal from "./Modal.js";
import "./imagelist.css";

export default function ImageList(props) {
  const [images, setImages] = useState({});

  const chooseImage = (id) => {
    props.setImage(id);
    props.closeModal(false);
  };

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8080/photos/getImages", {
      method: "POST",
      "Content-Type": "application/json",
      body: { uid: props.uid }
    });
    const js = await response.json();
    console.log(js);
    //setImages({ ar: js.photos, loaded: true });
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <Modal header="Select a Project" closeModal={props.closeModal}>
      <div className="image-container">
      {images.loaded ? images.ar.map((data)=><img onClick={()=>chooseImage(data)}src={`http://localhost:8080/images/${data}`} className="userImage" key={data}/>) : null}
      </div>
    </Modal>
  );
}
