import React, { useState, useEffect, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import "./menu.css";

export default function Menu(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const loadButton = document.querySelector(
      ".tui-image-editor-header-buttons"
    ).children[0];

    if (props.source == "home" && show) {
      loadButton.classList.add("slid-in");
      loadButton.classList.remove("slid-out");
    } else {
      loadButton.classList.remove("slid-in");
      loadButton.classList.add("slid-out");
    }

    if (show) {
      let buttons = document.getElementsByClassName("app-btn");
      buttons = [...buttons, loadButton];
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => setShow(false));
      }
    }
  }, [show]);
  return (
    <>
      {!show ? (
        <div className="borgir" onClick={() => setShow(!show)}>
          <svg
            height="32px"
            id="borgir__icon"
            version="1.1"
            viewBox="0 0 32 32"
            width="32px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
              style={{ fill: "#fff" }}
            />
          </svg>
        </div>
      ) : null}

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{props.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
