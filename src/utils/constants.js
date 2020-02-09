// navigation strings
export const PAGE = 'Page'
export const SEARCH_WRAPPER = 'SearchWrapper'
export const BOOKMARKS_WRAPPER = 'BookmarksWrapper'
export const SETTINGS_PAGE = 'SettingsPage'
export const PREVIEW = 'Preview'
export const DETAILS = 'Details'
export const COPIES = 'Copies'

// states for loading data
export const INITIAL = 'initial'
export const LOADING = 'loading'
export const TOO_MANY_HITS = 'tooManyHits'
export const NO_HITS = 'noHits'
export const DONE = 'done'

// pages
export const SEARCH = 'Search'
export const BOOKMARKS = 'Bookmarks'

// sorting
export const MOST_RELEVANT = 'Most relevant'
export const NEWEST = 'Newest'
export const TITLE_A_Z = 'Title (A-Z)'
export const TITLE_Z_A = 'Title (Z-A)'
export const AVAILABLE = 'Available'
export const SEARCH_PAGE_CRITERIONS = [ MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A ]
export const BOOKMARKS_PAGE_CRITERIONS = [ AVAILABLE, TITLE_A_Z, TITLE_Z_A, NEWEST ]

// filter
export const ALL = 'All'

export const detailsBlacklist = [
  '',
  'Anmerkungen',
  'Land',
  'Gesamtwerk',
  'Schlagwortkette',
  'Verbundsystematik',
  'Weitere Titel',
  'Nummer',
  'Inhaltsverzeichnis',
  'Sprache Original',
  'FSK/USK',
  'Physische Beschreibung',
  'Bevorzugter Titel',
  'Ausgabe',
  'Freie Schlagwörter',
  'Sammelrezension',
  'Erläuterungen',
  'URL',
  'Link zur Onleihe',
  'Besitzende Bibliotheken'
]

// contains the medium - font awesome class mappings
export const mediumIcons = [
  {
    icon: 'fas fa-film',
    text: [ 'DVD', 'DVD-ROM', 'Blu-ray Disc' ]
  },
  {
    icon: 'fas fa-compact-disc',
    text: [ 'CD', 'CD-ROM', 'Schallplatte' ]
  },
  {
    icon: 'fas fa-book',
    text: [ 'Buch', 'Band', 'Stücktitel/Band', 'Gebundenes Werk' ]
  },
  {
    icon: 'far fa-file-audio',
    text: [ 'E-Audio', 'MP3', 'E-Music' ]
  },
  {
    icon: 'fas fa-atlas',
    text: [ 'E-Book', 'E-Learning', 'E-Ressource', 'E-Journal' ]
  },
  {
    icon: 'fas fa-video',
    text: [ 'Video' ]
  },
  {
    icon: 'fab fa-itunes-note',
    text: [ 'Noten' ]
  },
  {
    icon: 'far fa-newspaper',
    text: [ 'Zeitschrift', 'Zeitschriftenheft', 'Aufsatz', 'Zeitschriftenartige Reihe', 'Beitrag' ]
  },
  {
    icon: 'fas fa-dice',
    text: [ 'Konventionelles Spiel' ]
  },
  {
    icon: 'fas fa-map-marked-alt',
    text: [ 'Karte/Plan' ]
  },
  {
    icon: 'fas fa-gamepad',
    text: [ 'Konsolenspiel', 'Computerspiel' ]
  },
  {
    icon: 'fas fa-swatchbook',
    text: [ 'Mehrteiliges Werk', 'Serie/Reihe', 'Medienkombination' ]
  }
]

// contains the medium - filter mappings
export const mediumFilter = [
  {
    label: 'Movies',
    text: [ 'DVD', 'DVD-ROM', 'Blu-ray Disc', 'Video' ]
  },
  {
    label: 'CD',
    text: [ 'CD', 'CD-ROM' ]
  },
  {
    label: 'Vinyl',
    text: [ 'Schallplatte' ]
  },
  {
    label: 'Book',
    text: [ 'Buch', 'Band', 'Stücktitel/Band', 'Gebundenes Werk', 'Mehrteiliges Werk', 'Serie/Reihe', 'Medienkombination' ]
  },
  {
    label: 'Audio',
    text: [ 'E-Audio', 'MP3', 'E-Music' ]
  },
  {
    label: 'Digital',
    text: [ 'E-Book', 'E-Learning', 'E-Ressource', 'E-Journal' ]
  },
  {
    label: 'Article',
    text: [ 'Zeitschrift', 'Zeitschriftenheft', 'Aufsatz', 'Zeitschriftenartige Reihe', 'Beitrag', 'Zeitschriftenband', 'Hochschulschrift' ]
  },
  {
    label: 'Map',
    text: [ 'Karte/Plan' ]
  },
  {
    label: 'Game',
    text: [ 'Konsolenspiel', 'Computerspiel', 'Konventionelles Spiel' ]
  }
]

// mapping of status text to message for the user
export const statusMapping = [
  {
    message: 'lost',
    text: [ 'nicht im regal', 'verloren', 'zurzeit vermisst' ]
  },
  {
    message: 'reserved',
    text: [ 'reserviert' ]
  },
  {
    message: 'borrowed',
    text: [ 'ausgeliehen' ]
  },
  {
    message: 'unknown',
    text: [ 'siehe vollanzeige' ]
  }
]

export const allLibraries = [
  'Charlottenburg-Wilmersdorf: Adolf-Reichwein-Bibliothek',
  'Charlottenburg-Wilmersdorf: Dietrich-Bonhoeffer-Bibliothek',
  'Charlottenburg-Wilmersdorf: Eberhard-Alexander-Burgh-Bibliothek',
  'Charlottenburg-Wilmersdorf: Heinrich-Schulz-Bibliothek mit Musikabteilung',
  'Charlottenburg-Wilmersdorf: Ingeborg-Bachmann-Bibliothek',
  'Charlottenburg-Wilmersdorf: Johanna-Moosdorf-Bibliothek',
  'Charlottenburg-Wilmersdorf: Stadtteilbibliothek Halemweg',
  'Friedrichshain - Kreuzberg: Else-Ury-Bibliothek',
  'Friedrichshain - Kreuzberg: Friedrich-von-Raumer-Bibliothek',
  'Friedrichshain - Kreuzberg: Pablo-Neruda-Bibliothek',
  'Friedrichshain - Kreuzberg: Schulbibliothek Blücherstr. (nicht öffentlich)',
  'Friedrichshain - Kreuzberg: Wilhelm-Liebknecht-/Namik-Kemal-Bibliothek',
  'Lichtenberg: Anna-Seghers-Bibliothek',
  'Lichtenberg: Anton-Saefkow-Bibliothek',
  'Lichtenberg: Bodo-Uhse-Bibliothek',
  'Lichtenberg: Egon-Erwin-Kisch-Bibliothek',
  'Marzahn - Hellersdorf: Bibl. Kaulsdorf - Nord',
  'Marzahn - Hellersdorf: Bibl. Mahlsdorf',
  'Marzahn - Hellersdorf: Ehm-Welk-Bibliothek',
  'Marzahn - Hellersdorf: Erich-Weinert-Bibliothek',
  'Marzahn - Hellersdorf: Heinrich-von-Kleist-Bibliothek',
  'Marzahn - Hellersdorf: Mark-Twain-Bibliothek',
  'Marzahn - Hellersdorf: Musikbibliothek',
  'Mitte: Bibliothek Tiergarten Süd',
  'Mitte: Bibliothek am Luisenbad',
  'Mitte: Bruno-Loesche-Bibliothek',
  'Mitte: Fahrbibliothek Mitte Bus 1',
  'Mitte: Fahrbibliothek Mitte Bus 2',
  'Mitte: Fahrbibliothek Mitte Bus 3',
  'Mitte: Hansabibliothek',
  'Mitte: Kurt-Tucholsky-Bibliothek (Mitte)',
  'Mitte: Philipp-Schaeffer-Bibliothek',
  'Mitte: Schiller-Bibliothek mit @hugo Jugendmedienetage',
  'Neukoelln: Bibliothek Britz Süd',
  'Neukoelln: Bibliothek Rudow',
  'Neukoelln: Bibliothek im Gemeinschaftshaus',
  'Neukoelln: Helene-Nathan-Bibliothek',
  'Neukoelln: Museum Neukölln (kein Ausgabeort)',
  'Pankow: Bettina-von-Arnim-Bibliothek',
  'Pankow: Bibliothek Buch',
  'Pankow: Bibliothek Karow',
  'Pankow: Bibliothek am Wasserturm',
  'Pankow: Heinrich-Böll-Bibliothek',
  'Pankow: Janusz-Korczak-Bibliothek',
  'Pankow: Kurt-Tucholsky-Bibliothek (Pankow)',
  'Pankow: Museumsarchiv Pankow (kein Ausgabeort)',
  'Pankow: Wolfdietrich-Schnurre-Bibliothek',
  'Reinickendorf: Bibl. Frohnau',
  'Reinickendorf: Bibl. Märkisches Viertel',
  'Reinickendorf: Bibl. Reinickendorf - West',
  'Reinickendorf: Bibliothek am Schäfersee  Stadtteilbibliothek Reinickendorf-Ost',
  'Reinickendorf: Humboldt-Bibliothek',
  'Reinickendorf: Humboldtschule (nicht öffentlich)',
  'Reinickendorf: Ju.bibl. Humboldt-Bibliothek',
  'Reinickendorf: Kleiner Bücherbus Reinickendorf',
  'Spandau: Fahrbibliothek Spandau',
  'Spandau: Hauptbibliothek Spandau',
  'Spandau: Kinder- und Jugendbibliothek Spandau',
  'Spandau: Schulbibliothek Carlo Schmid (nicht oeffentlich)',
  'Spandau: Stadtteilbibliothek Falkenhagener Feld',
  'Spandau: Stadtteilbibliothek Haselhorst',
  'Spandau: Stadtteilbibliothek Heerstrasse',
  'Spandau: Stadtteilbibliothek Kladow',
  'Steglitz - Zehlendorf: Fahrbibliothek Steglitz-Zehlendorf',
  'Steglitz - Zehlendorf: Gottfried-Benn-Bibliothek',
  'Steglitz - Zehlendorf: Ingeborg-Drewitz-Bibliothek',
  'Steglitz - Zehlendorf: Stadtteilbibliothek Lankwitz',
  'Tempelhof-Schöneberg: Bezirkszentralbibliothek Tempelhof-Schöneberg',
  'Tempelhof-Schöneberg: Fahrbibliothek Tempelhof-Schöneberg',
  'Tempelhof-Schöneberg: Mittelpunktbibliothek Schöneberg',
  'Tempelhof-Schöneberg: Stadtteilbibliothek Lichtenrade',
  'Tempelhof-Schöneberg: Stadtteilbibliothek Marienfelde',
  'Tempelhof-Schöneberg: Stadtteilbibliothek Schöneberg-Nord',
  'Tempelhof-Schöneberg: Thomas-Dehler-Bibliothek',
  'Treptow - Koepenick: Fahrbibliothek Treptow-Köpenick',
  'Treptow - Koepenick: Fahrbibliothek Treptow-Köpenick Kleiner Bus',
  'Treptow - Koepenick: Mittelpunktbibliothek Köpenick Alter Markt',
  'Treptow - Koepenick: Mittelpunktbibliothek Treptow Alte Feuerwache',
  'Treptow - Koepenick: Stadtteilbibliothek Adlershof Stefan Heym',
  'Treptow - Koepenick: Stadtteilbibliothek Alt-Treptow Manfred Bofinger',
  'Treptow - Koepenick: Stadtteilbibliothek Altglienicke',
  'Treptow - Koepenick: Stadtteilbibliothek Friedrichshagen',
  'ZLB Kinder- und Jugendbibliothek',
  'ZLB: Berliner Stadtbibliothek  (BStB)',
  'ZLB: Außenmagazin Berliner Stadtbibliothek',
  'ZLB: Amerika-Gedenkbibliothek (AGB)',
  'ZLB: Außenmagazin Amerika-Gedenkbibliothek',
  'ZLB: Berlin-Sammlungen'
]
