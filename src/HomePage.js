import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import Login from "./components/modals/Login.js";
import SignUp from "./components/modals/SignUp.js";
import ImageList from "./components/modals/ImageList.js";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import { Button, Alert } from "react-bootstrap";
import Menu from "./Menu";

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
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const loadButton = document.querySelector(
      ".tui-image-editor-header-buttons"
    ).children[0];
    loadButton.removeAttribute("style");
    loadButton.setAttribute("class", "btn btn-light slid-out");
    const uploadButton = document.getElementsByClassName(
      "tui-image-editor-load-btn"
    )[1];
    const applyCrop = document.querySelector(".tie-crop-button .apply");
    applyCrop.addEventListener("mouseup", () => {
      //console.log(imageEditorInst.getCropzoneRect());
      setCropSettings(imageEditorInst.getCropzoneRect());
    });
    uploadButton.addEventListener("change", () => {
      if (user) {
        setImageSettings({});
        const formData = new FormData();
        formData.append("files", uploadButton.files[0]);
        formData.append("uid", user);
        fetch("http://localhost:8080/photos/upload", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.text())
          .then((data) => {
            setImageId(data);
          });
      } else {
        setImageId("loaded");
      }
    });
  }, []);

  useEffect(async () => {
    if (isMounted.current) {
      const imageEditorInst = imageEditor.current.imageEditorInst;
      imageEditorInst
        .loadImageFromURL(`http://localhost:8080/images/${imageId}`, "test")
        .then(() => processFilters());
    } else {
      isMounted.current = true;
    }
  }, [imageId]);

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 4000);
  }, [alert]);
  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const processFilters = async () => {
    if (imageSettings.filters) {
      const imageEditorInst = imageEditor.current.imageEditorInst;
      let size = imageSettings.size;
      let angle = imageSettings.angle;
      let crops = imageSettings.crop;
      // console.log(imageEditorInst);
      let filters = Object.keys(imageSettings.filters).map(function (key) {
        return imageSettings.filters[key];
      });
      //console.log(filters);

      await imageEditorInst.rotate(angle);
      if (size) await imageEditorInst.resize(size);
      if (crops)
        await imageEditorInst.crop({
          left: crops.left,
          top: crops.top,
          width: crops.width,
          height: crops.height,
        });
      let triggers = document.querySelectorAll(
        '.tui-image-editor-menu-filter [class^="tie-"]'
      );
      for (let i = 0; i < 7; i++) {
        if (triggers[i].checked) {
          triggers[i].click();
          triggers[i].checked = false;
        }
      }
      if (triggers[18].checked) {
        triggers[18].click();
        triggers[18].checked = false;
      }
      for (let i = 0; i < 7; i++) {
        if (filters[i]) {
          await sleep(10);
          triggers[i].click();
        }
      }
      if (filters[7].checked) {
        await sleep(100);
        document.querySelector(".tui-colorpicker-palette-hex").value =
          filters[7].color;
        document
          .querySelector(".tui-colorpicker-palette-preview")
          .setAttribute(
            "style",
            `background-color:${filters[7].color};color:${filters[7].color}`
          );
        document
          .querySelector(".color-picker-value")
          .setAttribute("style", `background-color:${filters[7].color}`);
        imageEditorInst.ui.filter.colorPickerControls[0]._color =
          filters[7].color;
        triggers[18].click();
      }

      document.querySelector(".tie-rotate-range-value").value = angle;
    }
  };

  const saveImage = () => {
    const ui = imageEditor.current.imageEditorInst.ui;
    const inst = imageEditor.current.imageEditorInst._graphics;
    const filters = ui.filter.checkedMap;
    const colorPickers = ui.filter.colorPickerControls[0];
    // console.log(imageEditor.current.imageEditorInst);
    const settings = {
      size: { width: inst._canvas.width, height: inst._canvas.height },
      angle: inst.canvasImage.angle,
      crop: cropSettings,
      filters: {
        grayscale: filters.grayscale.checked,
        invert: filters.invert.checked,
        sepia: filters.sepia.checked,
        vintage: filters.vintage.checked,
        blur: filters.blur.checked,
        sharpen: filters.sharpen.checked,
        emboss: filters.emboss.checked,
        tint: {
          checked: filters.tint.checked,
          color: colorPickers._color,
        },
      },
    };
    const data = { uid: user, imageId, settings };
    fetch("http://localhost:8080/photos/saveSettings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => setAlert("Save successful!"));
  };

  const logOut = () => {
    localStorage.clear();
    setUser("");
    window.location.replace("/");
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
      {alert ? (
        <Alert
          variant="success"
          style={{
            position: "absolute",
            width: "100%",
            top: 0,
            height: "30px",
            paddingTop: "0px",
            fontWeight: "bold",
            zIndex: 999999,
          }}
        >
          {alert}
        </Alert>
      ) : null}
      <Menu source="home">
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
        {imageId ? (
          <Button
            variant="light"
            onClick={downloadImage}
            className="app-btn load-btn"
          >
            Download
          </Button>
        ) : null}
        {user ? (
          <Button
            variant="light"
            onClick={logOut}
            className="app-btn login-btn"
          >
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
      </Menu>

      <ImageEditor
        includeUI={{
          loadImage: {
            path: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            name: "Blank",
          },
          theme: myTheme,
          menu: ["crop", "resize", "rotate", "filter"],
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
      {openLoginModal && (
        <Login
          closeModal={setOpenLoginModal}
          openImages={setOpenImageModal}
          alert={setAlert}
          setUser={setUser}
        ></Login>
      )}
      {openSignupModal && (
        <SignUp
          closeModal={setOpenSignupModal}
          alert={setAlert}
          setUser={setUser}
        ></SignUp>
      )}
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
