import { styled } from "..";

// export const ProductContainer = styled("main", {
//   "@media (max-width: 768px)": {
//     display: "flex",
//     justifyContent: "center",
//     width: "100%",
//     flexDirection: "column",
//     padding: "0 1rem",
//   },
// });

export const Container = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  justifyContent: "center",
  gap: "4rem",
  maxWidth: 1180,
  margin: "0 auto",

  "@media (max-width: 768px)": {
    display: "flex",
    flexDirection: "column",
    padding: "0 1rem",
  },
});

export const ImageContainer = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  padding: "0.25rem",
  width: "100%",
  minHeight: 656,
  borderRadius: 8,
  maxWidth: 576,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  "@media (max-width: 1440px)": {
    minHeight: 328,
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    padding: "1.25rem",

    border: 0,
    borderRadius: 8,

    fontSize: "$md",
    fontWeight: "bold",

    backgroundColor: "$green500",
    color: "$white",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "$green300",
    },
  },

  "@media (max-width: 768px)": {
    button: {
      marginTop: "2rem",
    },
  },
});
