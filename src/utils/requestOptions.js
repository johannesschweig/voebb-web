const proxy = 'https://cors-anywhere.herokuapp.com/'
// request options for landing page
export const landingPageOptions = {
  'method': 'GET',
  'url': proxy + 'https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00',
  'headers': {
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
  }
}

// request options for results page
export function resultsPageOptions (session, searchTerm) {
  return {
    'method': 'POST',
    'url': proxy + 'https://voebb.de/aDISWeb/app;jsessionid=' + session,
    'headers': {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://voebb.de',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    },
    'form': {
      'service': 'direct/1/POOLVX00@@@@@@@@_4B031500_383B2A80/$Form.form',
      'sp': 'S0',
      'Form0': 'focus,keyCode,stz,source,selected,requestCount,scriptEnabled,scrollPos,scrDim,winDim,imgDim,$Autosuggest,select,$FormConditional,textButton',
      'focus': 'THEMA2_1',
      'keyCode': '13',
      'stz': '',
      'source': '',
      'selected': '',
      'requestCount': '0',
      'scriptEnabled': 'true',
      'scrollPos': '0',
      'scrDim': '1920;1080',
      'winDim': '1920;1080',
      'imgDim': '',
      '$FormConditional': 'T',
      '$Autosuggest': searchTerm,
      'select': 'Überall+suchen',
      'textButton': 'Suchen'
    }
  }
}

// request options for the next results page
// page: number of the page starting with 2 for the second page
export function nextPageOptions (session, page) {
  return {
    'method': 'POST',
    'url': proxy + 'https://voebb.de/aDISWeb/app;jsessionid=' + session,
    'headers': {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://www.voebb.de',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    },
    'form': {
      'service': 'direct/1/POOLVX00@@@@@@@@_4B033700_00000000/$Form.form',
      'sp': 'S0',
      'Form0': 'focus,keyCode,stz,source,selected,requestCount,scriptEnabled,scrollPos,scrDim,winDim,imgDim,$Autosuggest,select,$FormConditional,textButton,$LinkSubmit$0,$LinkSubmit,$LinkSubmit$1,$Toolbar,cellCheck,cellCheck$0,cellCheck$1,cellCheck$2,cellCheck$3,cellCheck$4,cellCheck$5,cellCheck$6,cellCheck$7,cellCheck$8,cellCheck$9,cellCheck$10,cellCheck$11,cellCheck$12,cellCheck$13,cellCheck$14,cellCheck$15,cellCheck$16,cellCheck$17,cellCheck$18,cellCheck$19,cellCheck$20,$FormConditional$0,textButton$0,$FormConditional$1,textButton$1,$FormConditional$2,textButton$2,$FormConditional$3,textButton$3,$FormConditional$4,textButton$4,$FormConditional$5,textButton$5,$FormConditional$6,textButton$6,$FormConditional$7,textButton$7,textButton$8,textButton$9,textButton$10,textButton$11,textButton$12,textButton$13,textButton$14,$Toolbar$0',
      'focus': '',
      'keyCode': '0',
      'stz': '',
      'source': '',
      'selected': '',
      'requestCount': page,
      'scriptEnabled': 'true',
      'scrollPos': '0',
      'scrDim': '1920;1080',
      'winDim': '1920;1080',
      'imgDim': '',
      '$FormConditional': 'T',
      '$FormConditional$0': 'T',
      '$FormConditional$1': 'T',
      '$FormConditional$2': 'T',
      '$FormConditional$3': 'T',
      '$FormConditional$4': 'T',
      '$FormConditional$5': 'T',
      '$FormConditional$6': 'T',
      '$FormConditional$7': 'T',
      'select': 'Überall+suchen',
      '_linkSubmit': '',
      '$Toolbar_3.x': '15',
      '$Toolbar_3.y': '18'
    }
  }
}

// page with single result when calling 'Zitierlink'
export function singleResultPageOptions (identifier) {
  return {
    'method': 'GET',
    'url': proxy + 'https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=S' + identifier,
    'headers': {
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'Origin': 'https://voebb.de',
      'Upgrade-Insecure-Requests': '1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
      'Sec-Fetch-User': '?1',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7'
    }
  }
}

// page with result
export function resultPageOptions (session) {
  return {
    'method': 'POST',
    'url': proxy + 'https://voebb.de/aDISWeb/app;jsessionid=' + session,
    'headers': {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://voebb.de',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    },
    form: {
      'service': 'direct/1/POOLVX00@@@@@@@@_4B033700_00000000/$Form.form',
      'sp': 'S0',
      'Form0': 'focus,keyCode,stz,source,selected,requestCount,scriptEnabled,scrollPos,scrDim,winDim,imgDim,$Autosuggest,select,$FormConditional,textButton,$LinkSubmit$0,$LinkSubmit,$LinkSubmit$1,$Toolbar,cellCheck,$FormConditional$0,textButton$0,$FormConditional$1,textButton$1,$FormConditional$2,textButton$2,$FormConditional$3,textButton$3,$FormConditional$4,textButton$4,$FormConditional$5,textButton$5,$FormConditional$6,textButton$6,$FormConditional$7,textButton$7,textButton$8,textButton$9,textButton$10,textButton$11,textButton$12,textButton$13,textButton$14,$Toolbar$0',
      'focus': '',
      'keyCode': '0',
      'stz': '',
      'source': '',
      'selected': 'ZTEXT+++++++AK12009789',
      'requestCount': '0',
      'scriptEnabled': 'true',
      'scrollPos': '0',
      'scrDim': '1920;1080',
      'winDim': '1920;1080',
      'imgDim': '',
      '$FormConditional': 'T',
      '$FormConditional$0': 'T',
      '$FormConditional$1': 'T',
      '$FormConditional$2': 'T',
      '$FormConditional$3': 'T',
      '$FormConditional$4': 'T',
      '$FormConditional$5': 'T',
      '$FormConditional$6': 'T',
      '$FormConditional$7': 'T',
      '$Autosuggest': '',
      'select': 'Überall+suchen',
      '_linkSubmit': ''
    }
  }
}
