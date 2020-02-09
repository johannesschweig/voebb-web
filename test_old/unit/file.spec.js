import { exportBookmarksFile } from '@/utils/file.js'
import fs from 'fs'
import os from 'os'
import path from 'path'

const data = [{
  identifier: '123',
  details: [
    { 'Titel': 'foo' },
    { 'Person': 'bar' },
    { 'NotWhitelisted': 'test' }
  ]
}]

const output = /My VOEBB Bookmarks(\n)(\n)Titel: foo(\n)Person: bar(\n)id: 123(\n)(\n)Exported on.*/

const filePath = path.join(os.homedir(), 'bookmarks-export.txt')

// prevent error related to not implemented alert in jest
window.alert = () => { }

describe('file.js', () => {
  it('saves string as file', () => {
    // remove file
    fs.unlink(filePath, (err) => {
      if (err) throw err
    })
    // write new file
    exportBookmarksFile(data)
    fs.readFile(filePath, 'utf-8', (err, contents) => {
      if (err) throw err
      expect(contents).toMatch(output)
      // remove file
      fs.unlink(filePath, (err) => {
        if (err) throw err
      })
    })
  })

  it('does not overwrite an existing file', () => {
    // write fake file
    fs.writeFileSync(filePath, 'foo')
    exportBookmarksFile(data)
    fs.readFile(filePath, 'utf-8', (_err, contents) => {
      expect(contents).toEqual('foo')
    })
    // remove file
    fs.unlink(filePath, (err) => {
      if (err) throw err
    })
  })
})
