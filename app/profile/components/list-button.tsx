import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Typography from "@mui/material/Typography";

export default function ListButton({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        p: 2,
      }}
    >
      <Typography className="body-large">{title}</Typography>
      <ArrowOutwardRoundedIcon />
    </ButtonBase>
  );
}
