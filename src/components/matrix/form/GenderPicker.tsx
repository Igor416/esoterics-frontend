import { Female, Male } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface GenderPickerProps {
  gender: string,
  setGender: (val: string) => void
}

export function GenderPicker({gender, setGender}: GenderPickerProps) {
  return <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
    <Typography color='textPrimary' variant='h6'>
      Ваш пол:&nbsp;{gender === 'f' ? 'женский' : 'мужской'}
    </Typography>
    <Stack direction='row' spacing={2}>
      <Avatar sx={{transition: '0.5s', transform: `scale(${gender === 'f' ? 1 : 0.8})`}} onClick={() => setGender('f')} className='female-bg'>
        <Female />
      </Avatar>
      <Avatar sx={{transition: '0.5s', transform: `scale(${gender === 'm' ? 1 : 0.8})`}} onClick={() => setGender('m')} className='male-bg'>
        <Male />
      </Avatar>
    </Stack>
  </Stack>
}

interface SmallGenderPickerProps {
  initGender: string
}

export function SmallGenderPicker({initGender}: SmallGenderPickerProps) {
  const [gender, setGender] = useState(initGender)
  
  return <Avatar
    sx={{transition: '0.5s'}}
    className={gender === 'f' ? 'female-bg' : 'male-bg'}
    onClick={() => setGender(gender === 'f' ? 'm' : 'f')}
  >
    {gender === 'f' ? <Female /> : <Male />}
  </Avatar>
}