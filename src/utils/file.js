import fs from 'fs'
import path from 'path'
import os from 'os'

// exports the user's bookmarks to a text file
export function exportBookmarksFile (data) {
  // gather output
  let output = 'My VOEBB Bookmarks\n\n'
  let whitelist = ['Medienart', 'Verfasser', 'Titel', 'Veröffentlichung', 'ISBN', 'Person']
  data.forEach(bookmark => {
    for (var key in bookmark.details) {
      // only whitelisted details or short details allowed
      if (Object.prototype.hasOwnProperty.call(bookmark.details, key) && whitelist.indexOf(key) !== -1) {
        output += key + ': ' + bookmark.details[key] + '\n'
      }
    }
    output += 'id: ' + bookmark.identifier + '\n\n'
  })
  output += 'Exported on ' + new Date()
  // write file
  let filePath = path.join(os.homedir(), 'bookmarks-export.txt')
  fs.writeFile(filePath, output, {'flag': 'wx'}, (err) => {
    if (err) {
      return alert('There is already a file named "bookmarks-export" in your home directory. Remove it before proceeding.')
    }
    return alert('Exported your bookmarks to\n' + filePath)
  })
}
