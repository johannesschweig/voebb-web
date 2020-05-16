# In progress
# TODO
# Needs spec
## Bugs
- document query selector null in l45 Wrapper.vue
## Login
- landing page to explain voebb-web and why to login
- setup process to generate account?
- auto-login with saved cookie?
- logout? what for?
- warning when logged in and refreshing that you will be logged out
## Mobile
- make app mobile usable
## UI Improvements
- add indication to bookmarks nav icon how many bookmarks are available
- change card to rows
- indication of clicked row in search when going back
## Logging
- add logging how long a request took
- introduce proper logging
## Export bookmarks
- remove export bookmarks
- fix export bookmarks file (unit test works :D)
## Technical
- introduce a magic command (such as _test123) to return some mocked search results
- libraries-settings e2e super flaky
- add ids for libraries for easier migration (maybe google plus code or random or encrypted address?)
- replace all ../.. imports with @ imports
## Search
- faster search (w0.3)
  - multiple pages: search length is linear with page length (e.g. 1000 results for Simone de Beauvoir)
  - voebb: landing page 1.6s, first search 2s, concurrent searches .7s, next page .4s
  - voebb-web: 3s session, 3s search one page, 12s search 5 pages (1.2s per additional page)
  - make search return results one request by one?
- add search as query to url (...?q="koppetsch")
- more covers with different API (google books or amazon)
- back to the top button
## Error handling
## Save state
- save all state constantly (search, bookmarks, etc)

# Done
## 0.3.0
- empty image frame look ugly (p0.5h w0.5)
- change website title and favicon
- fixing medium icons (p1 w1.25)
## 0.2.0 (w10.4)
- fix change in requests (w02,30)
- nicer login (p2 w02,80)
  - check if token is correct
  - Error handling and feedback for wrong login
- setup own heroku cors dyno (w0.16)
- make e2e tests run (p4-6, 60%, w4)
- make unit tests run (p2-4, 80%, w0.8)
- linting check (p0.5, 90%, w0.3)