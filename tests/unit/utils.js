// sample
export const bookmarksSample = {
  bookmarks: {
    data: [
      {
        details: {
          'Titel': 'd',
          'Veröffentlichung': '1932'
        },
        availability: {
          days: Number.MAX_SAFE_INTEGER,
          message: 'not available'
        }
      },
      {
        details: {
          'Titel': 'a',
          'Veröffentlichung': '1989'
        },
        availability: {
          days: 12,
          message: '12 days left'
        }
      },
      {
        details: {
          'Titel': 'c',
          'Veröffentlichung': '1919'
        },
        availability: {
          days: -Number.MAX_SAFE_INTEGER,
          message: 'available'
        }
      },
      {
        details: {
          'Titel': 'm',
          'Veröffentlichung': '1990'
        },
        availability: {
          days: -2,
          message: '2 days overdue'
        }
      },
      {
        details: {
          'Titel': 'n',
          'Veröffentlichung': '1996'
        },
        availability: {
          days: 2,
          message: '2 days left'
        }
      },
      {
        details: {
          'Titel': 'dd',
          'Veröffentlichung': '1936'
        },
        availability: {
          days: 0,
          message: '0 days overdue'
        }
      },
      {
        details: {
          'Titel': 'h',
          'Veröffentlichung': '1942'
        },
        availability: {
          days: -8,
          message: '8 days overdue'
        }
      }
    ]
  }
}
