import React, { useState } from "react";
import Modal from "./Modal.js";
import "./imagelist.css";

export default function ImageList(props) {

   const chooseImage = (id)=>{
        props.setImage(id);
        props.closeModal(false);
    } 

    const getImageList = ()=>{
      fetch('http://localhost:8080/photos/getImages', {
        method: 'GET',
        body: {uid: props.uid}
      }).then((res)=>{
          res.map((link)=>{
            console.log(link);
            <img className="image" src={`http://localhost:8080/images/${link}`} onClick={()=>chooseImage(i)} key={i}/>
        });
      });
        /*const images = [];

        for(let i=0; i<5; i++){
            images.push(<span className="image" onClick={()=>chooseImage(i)} key={i}>{i}</span>);
        } */
    }
  return (
    <Modal header="Select a Project" closeModal={props.closeModal}>
        {getImageList()}
    </Modal>
  );
}
