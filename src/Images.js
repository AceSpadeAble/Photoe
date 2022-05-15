import React, { useState, useEffect } from "react";
import "./imagelist.css";

export default function Images(props) {
  const [images, setImages] = useState({});

  const chooseImage = (data) => {
    props.setImageSettings({});
    props.setImage(data.name);
    if (data.settings) {
      props.setImageSettings(JSON.parse(data.settings));
    }
    props.closeModal(false);
  };

  const getTemplateColumns = (cols) => {
    let frs = [];
    for (let i = 0; i < cols; i++) {
      frs.push("1fr");
    }
    return frs.join(" ");
  };

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8080/photos/getImages", {
      method: "POST",
      "Content-Type": "application/json",
      body: { uid: props.uid },
    });
    const js = await response.json();
    setImages({ ar: js, loaded: true });
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div className="container" style={{ textAlign: "center" }}>
      {images.loaded ? (
        images.ar.length > 0 ? (
          <div
            className="image-container"
            style={{ gridTemplateColumns: getTemplateColumns(props.columns) }}
          >
            {images.ar.map((data) => (
              <img
                onClick={() => chooseImage(data)}
                src={`http://localhost:8080/images/${data.name}`}
                className="userImage"
                key={data.name}
              />
            ))}
          </div>
        ) : (
          <h3 style={{ marginTop: "5%" }}>You don't have any projects yet!</h3>
        )
      ) : null}
    </div>
  );
}
