import { Box } from "@mui/material";
import style from "./Tile.module.css"

export default function Tile({ size, img,elevation,distanceToObstacle }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        padding: "2px",
        boxSizing: "border-box",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <p>{distanceToObstacle}</p>
      <p>{elevation}</p>
      <img src={img} className={style.img} alt="" />
    </Box>
  );
}
