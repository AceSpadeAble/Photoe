import React from "react";
import Modal from "./Modal.js";
import Images from "./../../Images.js";

export default function ImageList(props) {
 
  return (
    <Modal header="Select a Project" closeModal={props.closeModal}>
      <Images closeModal={props.closeModal} setImage={props.setImage} setImageSettings={props.setImageSettings} uid={props.user} columns={4}></Images>
    </Modal>
  );
}
