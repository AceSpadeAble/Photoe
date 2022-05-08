import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import Login from "./components/modals/Login.js";
import SignUp from "./components/modals/SignUp.js";
import ImageList from "./components/modals/ImageList.js";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import { Button } from "react-bootstrap";
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
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [cropSettings, setCropSettings] = useState({});
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageId, setImageId] = useState();
  const [imageSettings, setImageSettings] = useState({});
  const imageEditor = React.createRef();
  const isMounted = useRef(false);
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const loadButton = document.querySelector(
      ".tui-image-editor-header-buttons"
    ).children[0];
    loadButton.removeAttribute("style");
    loadButton.setAttribute("class", "btn btn-light");
    const uploadButton = document.getElementsByClassName(
      "tui-image-editor-load-btn"
    )[1];

    const applyCrop = document.querySelector('.tie-crop-button .apply');
    applyCrop.addEventListener("mouseup", ()=>{
      console.log(imageEditorInst.getCropzoneRect());
      setCropSettings(imageEditorInst.getCropzoneRect());
    });
    uploadButton.addEventListener("change", () => {
      if (user) {
        console.log('event fired!');
        const formData = new FormData();
        formData.append("files", uploadButton.files[0]);
        formData.append("uid", user);

        fetch("http://localhost:8080/photos/upload", {
          method: "POST",
          body: formData,
        }).then(res=>res.text()).then(data=>setImageId(data));
    }
    });
  });

  useEffect(() => {
    if (isMounted.current) {
      const imageEditorInst = imageEditor.current.imageEditorInst;
      imageEditorInst.loadImageFromURL(
        `http://localhost:8080/images/${imageId}`,
        "test"
      ).then(()=>processFilters());
    } else {
      isMounted.current = true;
    }
  }, [imageId]);

  const processFilters = () => {
    if(imageSettings){
     const imageEditorInst = imageEditor.current.imageEditorInst;
     let size = imageSettings.size;
     let angle = imageSettings.angle;
     let crops = imageSettings.crop;
     imageEditorInst.rotate(angle)
     .then(()=>{if(size) imageEditorInst.resize(size)})
     .then((b)=>{if(crops) imageEditorInst.crop({left: crops.left, top:crops.top, width:crops.width, height:crops.height})}).then(()=>{});
     document.querySelector('.tie-rotate-range-value').value = angle;
    }
  };

  const saveImage = () => {
    const ui = imageEditor.current.imageEditorInst.ui;
    //console.log(ui);
    const settings = {size: {width: ui.resize._els.widthRange._value, height:ui.resize._els.heightRange._value}, angle: ui.rotate._value, crop: cropSettings } 
    const data = {uid: user, imageId, settings}
     fetch("http://localhost:8080/photos/saveSettings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  };

  const logOut = () => {
    localStorage.clear();
    window.location.reload(false);
  };

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
      {user ? (
        <>
          <Button
            variant="light"
            uid={user}
            onClick={() => {
              setOpenImageModal(true);
            }}
            className="app-btn loadsaved-btn"
          >
            Load Saved
          </Button>
          <Button
            variant="light"
            onClick={saveImage}
            className="app-btn save-btn"
          >
            Save
          </Button>{" "}
        </>
      ) : null}

      <Button
        variant="light"
        onClick={downloadImage}
        className="app-btn load-btn"
      >
        Download
      </Button>

      {user ? (
        <Button variant="light" onClick={logOut} className="app-btn login-btn">
          Log Out
        </Button>
      ) : (
        <>
          <Button
            variant="light"
            className="app-btn login-btn"
            onClick={() => {
              setOpenLoginModal(true);
            }}
          >
            Log In
          </Button>{" "}
          <Button
            variant="light"
            className="app-btn signup-btn"
            onClick={() => {
              setOpenSignupModal(true);
            }}
          >
            Sign Up
          </Button>
        </>
      )}
      <ImageEditor
        includeUI={{
          loadImage: {
            path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'Blank'
          },
          theme: myTheme,
          menu: ["crop", "resize", "rotate"],
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
      {openImageModal && (
        <ImageList
          closeModal={setOpenImageModal}
          setImage={setImageId}
          setImageSettings={setImageSettings}
          uid={user}
        ></ImageList>
      )}
    </div>
  );
}
export default HomePage;
