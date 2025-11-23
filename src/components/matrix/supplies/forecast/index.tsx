import { useState } from "react";
import { Divider, Stack, Box } from "@mui/material";
import { IInfo } from "../../MatrixData";
import { Carousel } from "./Carousel";
import { ContentWrapper } from "../contentWrapper";

interface ForecastProps {
  info: IInfo
}

export function Forecast({info}: ForecastProps) {
  const [selected, setSelected] = useState(15)

  return <Stack>
    <Carousel ages={info.blocks.map(b => b.title)} selected={selected} setSelected={setSelected} />
    <Divider />
    <Box sx={{py: 1, px: 2}}>
      <ContentWrapper content={info.blocks[selected].content} />
    </Box>
  </Stack>
}