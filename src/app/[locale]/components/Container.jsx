import { Box, Typography } from "@mui/material";
import React, { useState, useRef } from "react";

import * as newelements from "../../../files/Selected.json";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Montserrat } from "next/font/google";
import { useTranslation } from "react-i18next";
import Link from "next/link";
const montserrat = Montserrat({
  style: ["normal"],
  subsets: ["latin"],
});
let elements = newelements.List;
function Carrusel({ Options, selected, cat }) {
  const { t, lang } = useTranslation();
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  function handleMouseDown(e) {
    setIsDown(true);
    sliderRef.current.classList.add("active");
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }

  function handleMouseLeave() {
    setIsDown(false);
    sliderRef.current.classList.remove("active");
  }

  function handleMouseUp() {
    setIsDown(false);
    sliderRef.current.classList.remove("active");
  }

  function handleMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const SCROLL_SPEED = 2;
    const walk = (x - startX) * SCROLL_SPEED;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }

  return (
    <Box
      sx={{
        display: "none",
        width: "100%",
        overflow: "hidden",
        color: "black",
        display: "flex",
        flexDirection: "row",
        //cursor: "pointer",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Box
        component="div"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        sx={{
          display: "flex",
          gap: { xs: 0, md: "0.6%" },
          "overflow-y": "hidden",
          "overflow-x": { xs: "scroll", md: "hidden" },
          scrollSnapType: { xs: " x mandatory", md: "none" },
          WebkitOverflowScrolling: { xs: "touch", md: "none" },

          "@media (orientation: landscape)": {
            width: { sm: "100%", md: "100%" },
            height: { xs: "12vh", sm: "20vw", md: "16vh" },
          },
          "@media (orientation: portrait)": {
            width: "100%",
            height: { xs: "13vh", sm: "16vw", md: "16vh" },
          },
          transition: "scroll-margin-left 3s ease",
        }}
      >
        {elements.map((el, id) => {
          return (
            <Box
              component="div"
              /*  onClick={() => {
                  Options(id);
                }} */

              sx={{
                "background-color": el.color,
                display: "none",

                "@media (orientation: landscape)": {
                  height: { xs: "12vh", sm: "20vw", md: "16vh" },
                  width: {
                    xs: "50%",
                    sm: "50%",
                    md: `${100 / (elements.length - 0.9)}%`,
                  },
                  display: cat === el.title ? "none" : "flex",
                },
                "@media (orientation: portrait)": {
                  height: { xs: "13vh", sm: "16vw", md: "16vh" },
                  width: {
                    xs: "50%",
                    sm: "50%",
                    md: `${100 / (elements.length - 0.9)}%`,
                  },
                  overflow: "hidden",
                },
                transition:
                  "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                flex: "0 0 auto",

                transition:
                  "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                overflow: "auto",

                position: "relative",
                display: {
                  xs: id !== selected ? "flex" : "none",
                  md: id !== selected ? "flex" : "none",
                },

                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",

                height: "14.5vh",
                minWidth: "12rem",
                zIndex: 4,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={el.coverImage}
                style={{
                  objectFit: "cover",
                  width: id === 0 ? "35%" : "35%",
                  height: "100%",
                  objectPosition: id === 0 ? "center  top" : "center top",
                }}
              />
              <NorthEastIcon
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: "1.5rem",
                  margin: "0.5rem",
                }}
              />

              <Typography
                sx={{
                  padding: "0.5rem",
                  fontSize: { xs: "100%" },
                  fontWeight: 600,
                  fontFamily: montserrat.style,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",

                  "@media (orientation: landscape)": {
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1rem" },
                  },

                  "@media (orientation: portrait)": {
                    fontSize: { xs: "100%" },
                  },
                }}
              >
                {/* {id === 0 ? t(`o1Aux`) : t(`o${id + 1}`)} */}
                <Link href={el.title}>{t(`Options.o${id}`)}</Link>
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Carrusel;
