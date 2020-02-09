import utils from '../utils'

describe('Launch', function () {
  before(utils.before)
  after(utils.after)

  it('shows the proper application title', function () {
    return this.app.client
      .getTitle()
      .then(title => {
        expect(title).to.equal('voebb-app')
      })
  })
})
