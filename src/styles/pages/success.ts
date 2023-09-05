import { styled } from "..";

export const Container = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    marginTop: "2rem",
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "1.5rem",
    lineHeight: 1.4,
  },

  a: {
    display: "block",
    marginTop: "4rem",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",

    "&:hover": {
      color: "$gray300",
    },
  },
});

export const ImagesContainer = styled("div", {
  marginTop: "8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "div + div": {
    marginLeft: "-50px",
  },
});

export const ImageContainer = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  width: "100%",
  maxWidth: 130,
  borderRadius: "50%",
  padding: "0.25rem",
  height: 130,
  boxShadow: "0 0 60px #121214",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});
