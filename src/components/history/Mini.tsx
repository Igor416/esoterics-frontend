import { useContext } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { Records } from "./Records";

import { HistoryContext, MatrixRequestsContext, TabContext } from "../../contexts";
import { ChevronRight } from "@mui/icons-material";

interface MiniHistoryProps {
  compatibility: boolean
}

export function MiniHistory({compatibility}: MiniHistoryProps) {
  const {setTab} = useContext(TabContext)
  const {setMatrixRequest} = useContext(MatrixRequestsContext)
  const {history, setHistory} = useContext(HistoryContext)
  
  if (history && history.filter(item => compatibility === (item.gender === 'c')).length === 0) {
    return <></>
  }

  return <Stack>
    <Divider />
    <Stack direction='row' sx={{mt: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography color='textPrimary' textAlign='center' variant='h5'>История:</Typography>
      <ChevronRight onClick={() => setTab(3)} />
    </Stack>
    <Records
      onPick={(item) => {setMatrixRequest(item);setTab(item.gender === 'c' ? 2 : 1)}}
      history={history?.filter(item => compatibility === (item.gender === 'c')).filter((_, i) => i < 2)}
      action='mini'
      handleResp={setHistory}
    />
  </Stack>
}