import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../AuthContext";
import SwiperCore from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import components
import FormHeader from "../components/registerPage/FormHeader";
import NameFields from "../components/registerPage/NameFields";
import UsernameField from "../components/registerPage/UsernameField";
import EmailField from "../components/registerPage/EmailField";
import PasswordFields from "../components/registerPage/PasswordFields";
import DateOfBirthField from "../components/registerPage/DateOfBirthField";
import SubmitSection from "../components/registerPage/SubmitSection";

import SavorlyLogo from "../assets/icon.png";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import "../styles/loginAndRegister.css";

// prettier-ignore
const imageModules = import.meta.glob(
  "/src/assets/registerPage_images/*.jpg",
  { eager: true, query: "?url", import: "default" }
);

export default function RegisterPage() {
  const imageUrls = useMemo(() => {
    return Object.values(imageModules);
  }, []);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "", // will hold a YYYY-MM-DD string
  });

  const [errors, setErrors] = useState({
    email: "",
    confirmPassword: "",
  });

  const [usernameStatus, setUsernameStatus] = useState("idle");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShow = (which) =>
    which === "pwd" ? setShowPwd((x) => !x) : setShowConfirm((x) => !x);

  const handleUsernameBlur = async () => {
    const username = values.username.trim();

    // If the field is blank, reset to "idle" and skip checking
    if (!username) {
      setUsernameStatus("idle");
      return;
    }

    // Immediately show "Checking availability…" in the helperText
    setUsernameStatus("checking");

    setTimeout(async () => {
      // Validate against regex
      if (!/^[A-Za-z0-9._]{2,32}$/.test(username)) {
        setUsernameStatus("invalid");
        return;
      }

      // If format is valid, call the backend endpoint
      try {
        const res = await axios.get(
          `/auth/check-username?username=${encodeURIComponent(username)}`
        );
        if (res.data.exists) {
          setUsernameStatus("taken");
        } else {
          setUsernameStatus("available");
        }
      } catch (err) {
        console.error("Error checking username availability:", err);
        setUsernameStatus("idle");
      }
    }, 3000);
  };

  const handleEmailBlurAsync = async () => {
    const email = values.email.trim();

    // If blank, reset and skip
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "" }));
      setEmailStatus("idle");
      return;
    }

    // Immediately show "Checking email…"
    setEmailStatus("checking");
    setErrors((prev) => ({ ...prev, email: "" }));

    setTimeout(async () => {
      // Validate email format
      const isValidFormat = /\S+@\S+\.\S+/.test(email);
      if (!isValidFormat) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email (e.g. user@example.com).",
        }));
        setEmailStatus("invalidFormat");
        return;
      }

      try {
        const res = await axios.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
        if (res.data.exists) {
          setErrors((prev) => ({
            ...prev,
            email: "Account with this email already exists.",
          }));
          setEmailStatus("taken");
        } else {
          setEmailStatus("available");
        }
      } catch (err) {
        console.error("Error checking email availability:", err);
        setEmailStatus("idle");
      }
    }, 3000);
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [field]: val }));
    setErrorMessage("");

    // If the user is editing email or username, clear previous status
    if (field === "username") {
      setUsernameStatus("idle");
    }
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
      setEmailStatus("idle");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Native HTML5 validation
    const form = e.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    // Check passwords match
    if (values.password !== values.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));
      return;
    }

    // Ensure email & username availability before sending
    if (emailStatus === "taken" || emailStatus === "invalidFormat") {
      setErrorMessage("Please fix your email first.");
      return;
    }
    if (usernameStatus === "taken" || usernameStatus === "invalid") {
      setErrorMessage("Please fix your username first.");
      return;
    }

    try {
      const payload = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        dateOfBirth: values.dateOfBirth,
      };

      const response = await axios.post("/auth/register", payload);
      if (response.status === 201) {
        await login({ email: values.email, password: values.password });
        navigate("/my_kitchen");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left half: image */}
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          position: "relative",
          display: { xs: "none", md: "block" },
          backgroundColor: "#f0f0f0",
          overflow: "hidden",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            p: 2,
            borderRadius: 1,
            zIndex: 20,
          }}
        >
          <Box
            component="img"
            src={SavorlyLogo}
            alt="Savorly logo"
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
            Savorly
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 10, // below logo/text but above slides
          }}
        />

        <Swiper
          effect="fade"
          autoplay={{
            delay: 4000, // change slide every 4 seconds
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          modules={[Autoplay, EffectFade, Pagination]}
          pagination={{
            clickable: true,
            bulletClass: "custom-swiper-bullet",
            bulletActiveClass: "custom-swiper-bullet-active",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {imageUrls.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Box
                component="img"
                src={src}
                alt={`slide-${idx}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Right half: form */}
      <Box
        sx={{
          flex: 1.4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
            zIndex: 5, // below logo/text but above slides
          }}
        />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: "100%",
            maxWidth: 450,
            bgcolor: "#ffffff",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <FormHeader />

          {/* Form Fields */}
          <Box sx={{ px: 3, py: 4 }}>
            <NameFields
              firstName={values.firstName}
              lastName={values.lastName}
              onFirstNameChange={handleChange("firstName")}
              onLastNameChange={handleChange("lastName")}
            />

            <UsernameField
              username={values.username}
              onUsernameChange={handleChange("username")}
              onUsernameBlur={handleUsernameBlur}
              usernameStatus={usernameStatus}
            />

            <EmailField
              email={values.email}
              onEmailChange={handleChange("email")}
              onEmailBlur={handleEmailBlurAsync}
              emailStatus={emailStatus}
              emailErrorMessage={errors.email}
            />

            <PasswordFields
              password={values.password}
              onPasswordChange={handleChange("password")}
              confirmPassword={values.confirmPassword}
              onConfirmPasswordChange={handleChange("confirmPassword")}
              onConfirmPasswordBlur={() => {
                if (values.password !== values.confirmPassword) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "Passwords must match",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }
              }}
              confirmErrorMessage={errors.confirmPassword}
              showPwd={showPwd}
              toggleShowPwd={() => toggleShow("pwd")}
              showConfirm={showConfirm}
              toggleShowConfirm={() => toggleShow("confirm")}
            />

            <DateOfBirthField
              dateOfBirth={values.dateOfBirth}
              onDateChange={handleChange("dateOfBirth")}
            />

            <SubmitSection onSubmitError={errorMessage} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
