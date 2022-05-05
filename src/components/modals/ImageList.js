import React, { useState } from "react";
import Modal from "./Modal.js";
import "./imagelist.css";

export default function ImageList(props) {

   const chooseImage = (id)=>{
        props.setImage(id);
        props.closeModal(false);
    } 

    const getImageList = ()=>{
        const images = [];

        for(let i=0; i<5; i++){
            images.push(<span className="image" onClick={()=>chooseImage(i)} key={i}>{i}</span>);
        }
        return images;
    }
  return (
    <Modal header="Select a Project" closeModal={props.closeModal}>
        {getImageList()}
    </Modal>
  );
}
