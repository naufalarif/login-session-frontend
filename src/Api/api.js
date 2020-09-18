import { config } from "../config"

const url = config.baseURL

export const signupUser = async (data) => {
  const response = await fetch(`${url}/signup`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 'Content-Type' : 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return response.json()
}

export const loginUser = async (data) => {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 'Content-Type' : 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return response.json()
}

export const getUserProfile = async (token) => {
  const response = await fetch(`${url}/profile`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 
      'Content-Type' : 'application/json',
      'token' : `${token}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })

  return response.json()
}

export const deleteUser = async (token) => {
  const response = await fetch(`${url}/profile/delete`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 
      'Content-Type' : 'application/json',
      'token' : `${token}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })

  return response.json()
}

export const updateUserProfile = async (data) => {
  const token = data.token
  delete data.token
  const response = await fetch(`${url}/profile/update`, {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 
      'Content-Type' : 'application/json',
      'token' : `${token}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return response.json()
}