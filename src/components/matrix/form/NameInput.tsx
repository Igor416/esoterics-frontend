import { TextField } from "@mui/material"

interface NameInputProps {
  name: string,
  setName: (val: string) => void,
  label: string
}

export function NameInput({name, setName, label}: NameInputProps) {
  return <TextField
    sx={{flex: 1}}
    id='name'
    label={label}
    value={name}
    onChange={e => setName(e.target.value)}
    variant='outlined'
  />
}