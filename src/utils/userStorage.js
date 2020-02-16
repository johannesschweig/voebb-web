import { FAILED } from './constants'
var rp = require('request-promise-native')

// gets user data from storage
export const getUserData = (user, file, accessToken) => {
  return new Promise(resolve  => {
    rp({
      'method': 'POST',
      'url': 'https://content.dropboxapi.com/2/files/download',
      'headers': {
        'Authorization': 'Bearer ' + accessToken,
        'Dropbox-API-Arg': `{"path": "/${user}/${file}.json"}`
      }
    }).then(data => {
      resolve(JSON.parse(data))
    }).catch(() => resolve(FAILED))
  })
}

export function setUserData (user, file, data, accessToken) {
  rp({
    'method': 'POST',
    'url': 'https://content.dropboxapi.com/2/files/upload',
    'headers': {
      'Authorization': 'Bearer ' + accessToken,
      'Dropbox-API-Arg': `{"path": "/${user}/${file}.json","mode": "overwrite","autorename": true,"mute": false,"strict_conflict": false}`,
      'Content-Type': 'application/octet-stream'
    },
    'body': JSON.stringify(data)
  })
}
