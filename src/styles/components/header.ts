import { styled } from "..";

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "@media (max-width: 768px)": {
    background: "red",
    padding: "2rem 2rem",
  },
});

export const CartButton = styled("button", {
  height: 48,
  width: 48,
  border: 0,
  borderRadius: 6,
  backgroundColor: "$gray800",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",

  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$gray300",
    transition: "all 0.2s ease-in-out",
  },
});

export const CartCount = styled("div", {
  position: "absolute",
  right: -7,
  top: -7,
  height: 24,
  width: 24,
  border: "3px solid $gray900",
  borderRadius: "50%",
  backgroundColor: "$green500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  span: {
    color: "$white",
  },
});
