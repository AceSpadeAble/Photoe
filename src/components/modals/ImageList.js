import React, { useState, useEffect } from "react";
import Modal from "./Modal.js";
import "./imagelist.css";

export default function ImageList(props) {
  const [images, setImages] = useState({});

  const chooseImage = (data) => {
    props.setImage(data.name);
    props.setImageSettings(JSON.parse(data.settings));
    props.closeModal(false);
  };

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8080/photos/getImages", {
      method: "POST",
      "Content-Type": "application/json",
      body: { uid: props.uid }
    });
    const js = await response.json();
    setImages({ ar: js, loaded: true });
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <Modal header="Select a Project" closeModal={props.closeModal}>
      <div className="image-container">
      {images.loaded ? images.ar.map((data)=><img onClick={()=>chooseImage(data)}src={`http://localhost:8080/images/${data.name}`} className="userImage" key={data.name}/>) : null}
      </div>
    </Modal>
  );
}
