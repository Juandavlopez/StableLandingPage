import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AppBar,
  Menu,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
  Select,
  Button,
  Container,
  Drawer,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import useTranslation from "next-translate/useTranslation";

import Head from "next/head";
/* import * as options from "../components/files/optionsdb.js"; */
import { Language } from "@mui/icons-material";

const BurgerButton = () => {
  //const { t, lang } = useTranslation();
  const { t, lang } = useTranslation("common:Links");
  const Links = t("common:Links", {}, { returnObjects: true });
  const languages = {
    en: "English",
    es: "Español",
  };

  const [languageSelected, setLanguageSelected] = useState("es");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [display, setDisplay] = useState(false);
  const open = Boolean(anchorEl);

  // Updates the value to display in the select accordind to the language detected
  /*   useEffect(() => {
    setLanguageSelected(languages[lang]);
  }, [lang]);
 */
  const handleChangeLanguage = (e) => {
    setLanguageSelected(e.target.value);
  };

  const displayAlert = (setAlert) => {
    setDisplay(setAlert);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [orientation, seOrientation] = useState(0);
  useEffect(() => {
    function handleresize() {
      seOrientation(window.screen.orientation.angle);
    }

    window.addEventListener("resize", handleresize);

    return () => window.removeEventListener("resize", handleresize);
  }, []);
  return (
    <Box>
      <Box
        sx={{
          "@media (orientation: portrait)": {
            display: { md: "none" },
          },
          "@media (orientation: landscape)": {
            display: { md: "none" },

            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <IconButton onClick={handleClick}>
          <MenuIcon
            sx={{
              fontSize: "2.5rem",
              color: "#EFEFEF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            ".MuiMenu-paper": {
              borderRadius: 0,
              marginTop: "3%",
              bgcolor: "black",
              color: "white",
              width: 280,
            },
          }}
        >
          {/* Languages */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "1rem 2rem",
              color: "white",
            }}
          >
            <Typography
              sx={{
                fontFamily: "unset",
                color: "white",
                //display: { xs: "none", md: "flex" },
              }}
            >
              Formulario
            </Typography>

            <Typography
              sx={{
                fontFamily: "unset",
                //display: { xs: "none", md: "flex" },
              }}
            >
              Centro de ayuda
            </Typography>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default BurgerButton;
