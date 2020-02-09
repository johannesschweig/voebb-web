import electron from 'electron'
import { Application } from 'spectron'
import fs from 'fs'
import os from 'os'
import path from 'path'

// constants for settings paths
const storage = path.join(os.homedir(), '.config/Electron/storage/')
const bookmarksPath = path.join(storage, 'bookmarks.json')
const librariesPath = path.join(storage, 'libraries.json')

export default {
  after () {
    this.timeout(0)
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  },
  before () {
    this.timeout(0)
    this.app = new Application({
      path: electron,
      args: ['dist/electron/main.js'],
      startTimeout: 20000,
      waitTimeout: 20000,
      env: {
        NODE_ENV: 'development'
      }
    })

    return this.app.start()
  },
  // write string to bookmark settings file
  writeBookmarks (str) {
    fs.writeFileSync(bookmarksPath, str)
  },
  // read bookmarks settings file
  readBookmarks () {
    return fs.readFileSync(bookmarksPath, 'utf-8')
  },
  // write string to libraries settings file
  writeLibraries (str) {
    fs.writeFileSync(librariesPath, str)
  },
  // read bookmarks settings file
  readLibraries () {
    return fs.readFileSync(librariesPath, 'utf-8')
  },
  books: [
    {
      identifier: 'AK12009789',
      title: 'Mit Goethe in Italien : Tagebuch und Briefe des Dichters aus Italien',
      year: 1908
    },
    {
      identifier: 'AK12015560',
      title: 'Tagebuch der italienischen Reise 1786',
      year: 1976
    },
    {
      identifier: 'AK12116312',
      title: 'Auf Goethes Spuren in Italien : Tagebuch einer Reise',
      year: 1960
    },
    {
      identifier: 'AK12070211',
      title: 'Tagebücher und Briefe Goethes aus Italien an Frau von Stein und Herder',
      year: 1886
    },
    {
      identifier: 'AK04245892',
      title: 'Tagebuch der italienischen Reise 1786',
      year: 1982
    },
    {
      identifier: 'AK16296497',
      title: 'Gesamtausgabe der Werke und Schriften : in 22 Bänden - Poetische Werke. - 9. Autobiographische Schriften, zweiter Teil',
      year: 1982
    },
    {
      identifier: 'AK12811097',
      title: 'Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 2: Briefe, Tagebücher und Gespräche. Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 2: Briefe, Tagebücher und Gespräche.. - 3. Italien, im Schatten der Revolution : Briefe, Tagebücher und Gespräche vom 3. September 1786 bis 12. Juni 1794',
      year: 1991
    },
    {
      identifier: 'AK12531333',
      title: 'Reise-Tagebuch 1786 : (italienische Reise) ; [eine Publikation des Arbeitskreises Selbständiger Kultur-Institute e.V. - AsKI, Bonn und der Stiftung Weimarer Klassik, Weimar aus Anlass der Eröffnung der vom AsKI getragenen Casa di Goethe, Via del Corso, Rom]',
      year: 0
    },
    {
      identifier: 'AK10166794',
      title: 'Tagebuch der italienischen Reise 1786 : [Hörbuch]',
      year: 2007
    },
    {
      identifier: 'AK13851041',
      title: 'Goethes Briefe an Frau von Stein : mit dem Tagebuch aus Italien und Briefen der Frau von Stein ; in vier Bänden',
      year: 1924
    },
    {
      identifier: 'AK12164088',
      title: 'Goethes Vater reist in Italien',
      year: 1972
    },
    {
      identifier: 'AK12812835',
      title: 'Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 1: Sämtliche Werke. Sämtliche Werke, Briefe, Tagebücher und Gespräche. - Abt. 1: Sämtliche Werke.. - 27. Amtliche Schriften : Teil 2: Aufgabengebiete seit der Rückkehr aus Italien',
      year: 1999
    },
    {
      identifier: 'AK16160272',
      title: 'Goethe - Kunstwerk des Lebens : Biographie',
      year: 2013
    },
    {
      identifier: 'AK06019641',
      title: 'Tagebuch aus dem Warschauer Ghetto 1942',
      year: 1992
    },
    {
      identifier: 'AK05008927',
      title: 'Italienische Reise',
      year: 1987
    },
    {
      identifier: 'AK15496769',
      title: 'Italienische Reise',
      year: 0
    },
    {
      identifier: 'AK16344973',
      title: 'Kafka geht ins Kino',
      year: 2017
    },
    {
      identifier: 'AK16090383',
      title: 'The originals : legendary recordings from the Deutsche Grammophon catalogue ; [CD]. - Volume II. The Originals - Legendary Recordings',
      year: 2016
    },
    {
      identifier: 'AK03473444',
      title: 'Goethes Werke : in 14 Bänden. - Bd. 11.. Autobiographische Schriften : Bd. 3',
      year: 2002
    },
    {
      identifier: 'AK12676845',
      title: 'Goethes Werke : in 14 Bänden. - Bd. 11.. Autobiographische Schriften : Bd. 3',
      year: 1981
    }
  ]
}
