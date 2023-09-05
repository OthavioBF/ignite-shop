import { styled } from "..";

export const Container = styled("main", {
  position: "fixed",
  padding: "3rem",
  width: 480,
  backgroundColor: "$gray800",
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  zIndex: 9999,
  overflow: "hidden",

  transform: "translateX(110%)",
  opacity: 0,
  transition: "all 0.2s ease-in-out",

  variants: {
    open: {
      true: { transform: "translateX(0%)", opacity: 1 },
    },
  },

  "@media (max-width: 768px)": {
    right: 0,
    left: 0,
    bottom: 0,

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    variants: {
      open: {
        true: { transform: "translateY(0%)", opacity: 1 },
      },
    },
  },
});

export const ItemsContainer = styled("section", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",

  button: {
    width: "26px",
    border: 0,
    backgroundColor: "$gray800",
    alignSelf: "flex-end",
    cursor: "pointer",
  },

  h1: {
    fontSize: "$lg",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
});

export const ScrollView = styled("div", {
  maxHeight: "600px",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "0",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
  },

  "@media (max-width: 1440px)": {
    maxHeight: "300px",
  },
});

export const CartItem = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
  marginBottom: "1.5rem",

  div: {
    display: "flex",
    flexDirection: "column",
    strong: {
      color: "$gray300",
      fontSize: "$md",
    },

    span: {
      marginTop: "2px",
      marginBottom: "0.5rem",
      color: "$gray100",
      fontSize: "$md",
      fontWeight: "bold",
    },

    button: {
      alignSelf: "flex-start",
      color: "$green500",
      fontSize: "1rem",
      fontWeight: "bold",
      rigth: 0,
      border: 0,
      backgroundColor: "$gray800",
    },
  },
});

export const ImageContainer = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  width: 101,
  height: 95,
  borderRadius: 8,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const PriceSection = styled("section", {
  display: "flex",
  flexDirection: "column",

  div: {
    display: "block",

    div: {
      marginTop: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      p: {
        fontSize: "$md",
        color: "$gray100",
      },

      strong: {
        fontSize: "$xl",
        color: "$gray100",
      },

      span: {
        fontSize: "$md",
        color: "$gray100",
      },
    },
  },

  button: {
    marginTop: "3.5rem",
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
});
