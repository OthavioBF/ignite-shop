import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,

  "@media (max-width: 1440px)": {
    minHeight: 328,
  },

  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0 20rem",
  cursor: "pointer",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    div: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",

      strong: {
        fontSize: "$lg",
        color: "$gray100",
      },

      span: {
        fontSize: "$xl",
        fontWeight: "bold",
        color: "$green300",
      },
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },

  "@media (max-width: 768px)": {
    height: 328,
    flexDirection: "column",
  },
});

export const CartButton = styled("button", {
  height: 48,
  width: 48,
  border: 0,
  borderRadius: 6,
  backgroundColor: "$green500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$green300",
    transition: "all 0.2s ease-in-out",
  },
});
