"use client";
import React, { useState, useEffect, lazy } from "react";
import Image from "next/image";
/* import styles from "./page.module.css"; */
import NavBar from "./components/NavBar";
import { Box, Typography, Button, Grid } from "@mui/material";

import SocialMedia from "./components/SocialMedia";
/* import DownloadMain from "./components/DownloadMain"; */
const DownloadMain = lazy(() => import("./components/DownloadMain"));
import { Business } from "@mui/icons-material";
const Options = lazy(() => import("./components/Options"));
const Life = lazy(() => import("./components/Life"));
const People = lazy(() => import("./components/People"));
const HowToUse = lazy(() => import("./components/HowToUse"));
const BusinessComp = lazy(() => import("./components/BusinessComp"));
const Selected = lazy(() => import("./components/Selected"));
const Footer = lazy(() => import("./components/Footer"));
import parse from "html-react-parser";

const wals = ["./wal1.svg", "./wal2.svg", "./wal3.svg"];
import * as textList from "../../files/Selected.json";
import NewDownloadImage from "./components/NewDownloadMain";

const colors = [" #a9cce3", "#af7ac5", "#273746"];

/* translated */

import { useTranslation, Trans } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
export default function Home() {
  //console.log(dictionary)

  const { t, i18n } = useTranslation("Business");
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const [backgroundChanger, setBackgroundChanger] = useState(0);
  const [image, setImage] = useState(colors[backgroundChanger]);
  //const [text, setText] = useState(texts[backgroundChanger]);

  const [optionChosen, setOptionChosen] = useState(-1);

  const OptionsToChoose = (option) => {
    setOptionChosen(option);
  };

  useEffect(() => {
    const changeIndexColor = setInterval(() => {
      // Decrease the countdown value every second
      setBackgroundChanger(
        (prevCountdown) => (prevCountdown + 1) % colors.length
      );
    }, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(changeIndexColor);
  }, []);

  useEffect(() => {
    setImage(wals[backgroundChanger]);
    //setText(texts[backgroundChanger]);
  }, [backgroundChanger, wals]);

  const [navbarHeight, setNavbarHeight] = useState(0);

  const handleNavbarHeight = (height) => {
    setNavbarHeight(height);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        // overflow: "hidden",
      }}
    >
      <NavBar
        onHeightChange={handleNavbarHeight}
        optionChosen={optionChosen}
        OptionsToChoose={OptionsToChoose}
        color={
          optionChosen > 0
            ? textList.List[optionChosen].secondColor
            : optionChosen === -1 && "#202020"
        }
      />

      <Box
        sx={{
          width: "100%",
          position: "relative",
          alignItems: "center",
          //height: `calc(100vh - ${navbarHeight}px)`,
          height: "89vh",
          display: "flex",
          bgcolor: "red",
          flexDirection: "column",
        }}
      >
        <NewDownloadImage
          optionChosen={optionChosen}
          navbarHeight={navbarHeight}
        />
      </Box>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Box
          sx={{
            height: "50vh",
            width: "100%",
            bgcolor: "#20201f",
            position: "relative",
          }}
        >
          <Options
            OptionsToChoose={OptionsToChoose}
            optionChosen={optionChosen}
          />
        </Box>
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Box
          sx={{
            height: "100vh",
            backgroundImage: "url('/LifeWallpaper.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            //position: "relative",
          }}
        >
          <Life />
        </Box>
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Box
          sx={{
            height: "100vh",
            bgcolor: "#20201F",

            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <People />
        </Box>
      </React.Suspense>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Box
          sx={{
            //minHeight: "100vh",
            padding: "3rem 6rem",
            background: "#202020",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <HowToUse />
        </Box>
      </React.Suspense>

      <Box
        sx={{
          height: "100vh",
          //padding: "3rem 6rem",
          width: "100vw",
          //background: "url('/BusinessWallpaper.svg')",
          //backgroundImage: "url('/BusinessWallpaper.svg')",
          //backgroundRepeat: "no-repeat",
          //backgroundSize: "100%",
          //backgroundPosition: "bottom",
          display: "flex",
          //opacity: 0.5,
          flexDirection: "column",
          position: "relative",
          //padding: "2rem 4rem 2rem 4rem",
        }}
      >
        <Image
          src="/BusinessWallpaper.svg"
          alt="BusinessWallpaper"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "bottom",
            zIndex: -1,
          }}
        />
        <BusinessComp />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 4rem",
            background:
              "linear-gradient(93.25deg, #FFE6FB 34.35%, #D385D6 150.82%)",
            //position: "relative",
            height: "10%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "unset",
              fontSize: "1.5rem",
            }}
          >
            <Trans i18nKey="Business">
              {t("sponsorship")} <strong>Stable®?</strong>
            </Trans>
          </Typography>
          <Button
            sx={{
              textTransform: "none",
              borderRadius: "0",
              fontFamily: "unset",
              fontSize: "1.2rem",
              color: "black",
              bgcolor: "rgba(211, 133, 214, 1)",
              //fontWeight: "bold",
              "&:hover": {
                cursor: "pointer",
                bgcolor: "rgba(211, 133, 214, 0.8)",
              },
            }}
          >
            {t("button")}
          </Button>
        </Box>
      </Box>

      <Footer optionChosen={-1} />
    </Box>
  );
}
