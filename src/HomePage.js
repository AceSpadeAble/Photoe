import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Login from "./components/modals/Login.js";
import SignUp from "./components/modals/SignUp.js";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import { Button } from 'react-bootstrap';
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");
const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};


function HomePage() {

  const [imageSrc, setImageSrc] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  useEffect(()=>{
    const loadButton = document.querySelector(".tui-image-editor-header-buttons").children[0];
    loadButton.removeAttribute("style");
    loadButton.setAttribute("class", "btn btn-light");
  });
  const imageEditor = React.createRef();
  const downloadImage = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  };

  
  return (
    <div className="App">
      <Button variant="light" onClick={downloadImage} className="app-btn load-btn">Download</Button>
      <Button variant="light" onClick={downloadImage} className="app-btn save-btn">Save</Button>
      <Button variant="light" className="app-btn login-btn" onClick={()=>{setOpenLoginModal(true)}}>Log In</Button>
      <Button variant="light" className="app-btn signup-btn" onClick={()=>{setOpenSignupModal(true)}}>Sign Up</Button>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: imageSrc,
            name: "image",
          },
          theme: myTheme,
          menu: [],
          initMenu: "",
          uiSize: {
            height: `100vh`,
          },
          menuBarPosition: "left",
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
        ref={imageEditor}
      />
      {openLoginModal && <Login closeModal={setOpenLoginModal}></Login>}
      {openSignupModal && <SignUp closeModal={setOpenSignupModal}></SignUp>}
      </div>
  );
}
export default HomePage;