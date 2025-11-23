export interface TokenPair {
  access: string,
  refresh: string
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  username: string
}

export interface MatrixRequest {
  id?: string,
  name: string,
  date: string,
  gender: string,
  name2: string,
  date2: string,
}