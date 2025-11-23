import { useRef, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { MatrixBackground, MatrixBackground1, MatrixForeground2 } from "../../representation";

interface LoadingMatrixProps {
  compatibility: boolean
}

export function LoadingMatrix({compatibility}: LoadingMatrixProps) {
  const [combinations, setCombinations] = useState<{[key: string]: number}>({})
  const ref = useRef<HTMLDivElement>(null)

  const fillCombinations = useCallback(() => {
    const resp: {[key: string]: number} = {};
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'z'].forEach(letter => {
      resp[letter] = Math.floor(Math.random() * 21) + 1
    });
    setCombinations(resp)
  }, [])

  useEffect(() => {
    fillCombinations()
  }, [fillCombinations])

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.animate([
          {opacity: 1},
          {opacity: 0},
          {opacity: 1},
        ], 750)
      }
      setTimeout(fillCombinations, 375)
    }, 1500);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [fillCombinations, ref])


  return <Box ref={ref} sx={{width: '100%', height: '100%'}}>
    {compatibility ? <MatrixBackground1 /> : <MatrixBackground />}
    <MatrixForeground2 data={{
      info: [],
      combinations: combinations,
      numbers: {}
    }} />
  </Box>
}