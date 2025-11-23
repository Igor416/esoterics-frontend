import { Stack, Typography, Divider, Box } from "@mui/material";
import { MiniHistory } from "../../history";
import { NameInput } from "./NameInput";
import { GenderPicker, SmallGenderPicker } from "./GenderPicker";
import { DatePicker } from "./DatePicker";
import { DateInput } from "./DateInput";
import { MatrixRequest } from "../../../JSONTypes";
export { SubmitButton } from "./SubmitButton";

interface FormProps {
  compatibility: boolean,
  request: MatrixRequest,
  setRequest: (val: MatrixRequest) => void
}

export function Form({compatibility, request, setRequest}: FormProps) {
  return <Stack gap={2} sx={{p: 2}}>
    <Typography color='textPrimary' textAlign='center' variant='h5'>
      {
      compatibility
      ?
      'Матрица Совместимости'
      :
      'Матрица судьбы'
      }
    </Typography>
    <Stack direction='row' sx={{alignItems: 'center'}} spacing={2}>
      <NameInput name={request.name} label={`Имя ${compatibility ? 1 : ''}`} setName={(t) => setRequest({...request, name: t})} />
      {compatibility && <SmallGenderPicker initGender='f' />}
    </Stack>
    {!compatibility && <>
      <GenderPicker gender={request.gender} setGender={(t) => setRequest({...request, gender: t})} />
      <DatePicker date={request.date} setDate={(t) => setRequest({...request, date: t})} color={request.gender === 'm' ? 'primary' : 'secondary'} />
    </>}
    <DateInput date={request.date} label='Дата рождения' setDate={(t) => setRequest({...request, date: t})} />
    {compatibility && <>
      <Box sx={{flex: 1}}></Box>
      <Divider />
      <Box sx={{flex: 1}}></Box>
      <Stack direction='row' sx={{alignItems: 'center'}} spacing={2}>
        <NameInput name={request.name2} label='Имя 2' setName={(t) => setRequest({...request, name2: t})} />
        <SmallGenderPicker initGender='m' />
      </Stack>
      <DateInput date={request.date2} label='Дата рождения' setDate={(t) => setRequest({...request, date2: t})} />
    </>}
    <MiniHistory compatibility={compatibility} />
  </Stack>
}