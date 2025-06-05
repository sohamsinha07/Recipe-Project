import { useMemo } from "react";
import SwiperCore from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

import "../../styles/homePage.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

// prettier-ignore
const imageModules = import.meta.glob(
  "/src/assets/homePage_slideshow/*.jpg",
  { eager: true, query: "?url", import: "default" }
);

function shuffleArray(arr) {
  const a = arr.slice(); // copy
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

SwiperCore.use([Autoplay, EffectFade]);

export default function TitleSection({ loading }) {
  const slideUrls = useMemo(() => {
    const urls = Object.values(imageModules);
    return shuffleArray(urls);
  }, []);

  if (loading) {
    return (
      <Box sx={{ backgroundColor: "#d3d3d3", textAlign: "center", px: 3, py: 10 }}>
        <Skeleton
          variant="text"
          animation="wave"
          width={470}
          height={87}
          sx={{ mx: "auto", mt: 4, mb: 1 }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={550}
          height={30}
          sx={{ mx: "auto", mb: 3.6 }}
        />

        <Box className="title-section-button-row" sx={{ display: "inline-flex", gap: 2, mb: 5.5 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={180}
            height={48}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={160}
            height={48}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="title-section-container">
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Swiper
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={2000}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        >
          {slideUrls.map((url, idx) => (
            <SwiperSlide key={idx}>
              <Box
                className="zoom-slide"
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box className="slide-overlay" />

      <Box className="title-section-content">
        <Typography variant="h3" className="title-section-heading">
          Welcome to Savorly
        </Typography>
        <Typography variant="subtitle1" className="title-section-subtitle">
          Discover, create, and share amazing recipes with our community
        </Typography>

        <Box className="title-section-button-row">
          <Button
            variant="contained"
            className="title-section-browse-button"
            startIcon={<AutoStoriesIcon className="title-section-browse-icon" />}
            component={RouterLink}
            to="/recipes"
          >
            Browse Recipes
          </Button>

          <Button
            variant="outlined"
            className="title-section-create-button"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/create_recipe"
          >
            Create Recipe
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
