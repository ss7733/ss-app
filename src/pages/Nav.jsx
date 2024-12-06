import { Link } from "react-router-dom";
import Logo from "../imgs/ss-icon.png";
import { ReactComponent as MenuIcon } from "../svgs/menu.svg";
import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
const Nav = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="Nav">
      <img alt="" src={Logo} />
      {width > 600 ? (
        <div className="List">
          <Link to="/ss-app">Home</Link>
          <div>/</div>
          <Link to="/ss-app/Experience">Experience</Link>
          <div>/</div>
          <Link to="/ss-app/Education">Education</Link>
          <div>/</div>
          <Link to="/ss-app/Portfolio">Portfolio</Link>
        </div>
      ) : (
        <div>
          <PopMenu />
        </div>
      )}
    </div>
  );
};

export default Nav;

const PopMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the PopMenu container
  const popMenuRef = useRef(null); // Ref for the actual dropdown menu
  const listArray = ["Home", "Experience", "Education", "Portfolio"];

  const [running, setRunning] = useState(false);
  const handleOpen = () => {
    if (open) {
      handleAnimation();
      setTimeout(() => {
        setOpen(!open);
      }, 1000);
    } else {
      setOpen(!open);
      setTimeout(() => {
        handleAnimation();
      }, 100);
    }
  };
  const handleIconRotate = () => {
    anime({
      targets: ".Img",
      keyframes: [
        { rotate: "0turn", duration: 0 }, // Reset to initial state instantly
        { rotate: "1turn", duration: 1000 }, // Perform the actual animation
      ],
    });
  };
  const handleAnimation = () => {
    console.log("open", open);
    if (!running) {
      setRunning(true);
      anime({
        targets: ".Link",
        opacity: open ? [1, 0] : [0, 1],
        translateY: open ? [0, -20] : [-20, 0],
        delay: anime.stagger(100, {
          grid: [listArray.length, 1],
          from: open ? "last" : "first",
        }),
        complete: () => {
          setRunning(false); // Unlock the animation once complete
        },
      });
      handleIconRotate();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if clicking outside
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        handleAnimation();

        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  useEffect(() => {
    if (open && popMenuRef.current) {
      popMenuRef.current.style.right = 0;
    }
  }, [open]);

  return (
    <div
      ref={menuRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Menu button */}
      <MenuIcon
        className="NavImg"
        onClick={() => !running && handleOpen()}
        style={{ cursor: "pointer" }}
      />

      {open && (
        <div ref={popMenuRef} className="PopMenu">
          <div className="List">
            {listArray.map((item) => (
              <Link
                key={item}
                className="Link"
                style={{ opacity: 0 }}
                onClick={() => !running && handleOpen()}
                to={item === "Home" ? "/ss-app" : "/ss-app/" + item}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
