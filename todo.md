# In progress
# TODO
# Needs spec
## Bugs
- document query selector null in l45 Wrapper.vue
## Login
- Error handling and feedback for wrong login
- landing page to explain voebb-web and why to login
- setup process to generate account?
- auto-login with saved cookie?
- logout? what for?
## Mobile
- make app mobile usable
## UI Improvements
- change website title and favicon
- add indication to bookmarks how many bookmarks are available
- empty image frame look ugly
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
## Error handling
## Save state
- save all state constantly (search, bookmarks, etc)
# Done
## 0.2.0 (w10.4)
- fix change in requests (w02,30)
- nicer login (p2 w02,80)
  - check if token is correct
- setup own heroku cors dyno (w0.16)
- make e2e tests run (p4-6, 60%, w4)
- make unit tests run (p2-4, 80%, w0.8)
- linting check (p0.5, 90%, w0.3)