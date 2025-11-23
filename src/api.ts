import { WebAppUser } from '@vkruglikov/react-telegram-web-app'
import { IMatrixData } from './components/matrix/MatrixData'
import { MatrixRequest, TokenPair, User } from './JSONTypes'

//const SERVER_URL = '/'
const SERVER_URL = 'http://localhost:8000/'

export function getMatrixData(date: string) {
  const url = SERVER_URL + `data/matrix/${date}/`
  return sendGetRequest<IMatrixData>(url)
}

export function getCompatilityMatrixData(date1: string, date2: string) {
  const url = SERVER_URL + `data/matrix/${date1}/${date2}/`
  return sendGetRequest<IMatrixData>(url)
}

export async function sendInitData(initData: WebAppUser & {joined_by?: string}) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(initData)
  }
  const response = await fetch(SERVER_URL + 'user/user/', options);
  const data = await response.json();
  return data
}

export async function getUser(tokenPair: TokenPair) {
  const url = SERVER_URL + 'user/user/'
  return sendGetRequest<User>(url, tokenPair);
}

export function sendMatrixRequest(matrixRequest: MatrixRequest, tokenPair: TokenPair) {
  const url = SERVER_URL + 'user/matrix_requests/'
  return sendPostRequest<MatrixRequest, MatrixRequest>(url, matrixRequest, tokenPair);
}

export function getMatrixRequests(tokenPair: TokenPair) {
  return getMatrixRequest<MatrixRequest[]>('all', tokenPair);
}

export function getMatrixRequest<T = MatrixRequest>(id: string, tokenPair: TokenPair) {
  const url = SERVER_URL + `user/matrix_requests/${id}/`
  return sendGetRequest<T>(url, tokenPair);
}

export function deleteMatrixRequests(tokenPair: TokenPair) {
  return deleteMatrixRequest('all', tokenPair)
}

export function deleteMatrixRequest(id: string, tokenPair: TokenPair) {
  const url = SERVER_URL + `user/matrix_requests/${id}/`
  return sendDeleteRequest<null, MatrixRequest[]>(url, null, tokenPair)
}

async function sendGetRequest<T>(url: string, tokenPair?: TokenPair) {
  return sendRequest<T, T>(url, 'GET', tokenPair)
}

async function sendPostRequest<T, R>(url: string, body: T, tokenPair?: TokenPair) {
  return sendRequest<T, R>(url, 'POST', tokenPair, body)
}

async function sendDeleteRequest<T, R>(url: string, body: T, tokenPair?: TokenPair) {
  return sendRequest<T, R>(url, 'DELETE', tokenPair, body)
}

async function sendRequest<T, R>(url: string, method: 'GET' | 'POST' | 'DELETE', tokenPair?: TokenPair, body?: T): Promise<[R, TokenPair]> {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (tokenPair) {
    Object.assign(options.headers, {'Authorization': 'Bearer ' + tokenPair.access})
  }
  if (body) {
    Object.assign(options, {body: JSON.stringify(body)})
  }
  const response = await fetch(url, options);
  if (response.status === 401 && tokenPair) {
    const refreshResponse = await fetch(SERVER_URL + '/user/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({refresh: tokenPair.refresh})
    })
    const data = await refreshResponse.json();
    return sendRequest<T, R>(url, method, data, body);
  }
  const data = await response.json();
  return [data, tokenPair ?? {access: '', refresh: ''}];
}