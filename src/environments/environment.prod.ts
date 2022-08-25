export const environment = {
  production: true,
  appUrl: 'http://milala.co.il',
  serverUrl: 'https://guessmyword.azurewebsites.net',
  guessTries: 6,
  languages: [
    {
      value: 'hebrew',
      display: 'עברית'
    },
    {
      value: 'english',
      display: 'English'
    }
  ],
  defaultLanguage: {
    value: 'hebrew',
    display: 'עברית'
  },
  minLength: 3,
  maxLength: 9,
  defaultRandomLength: 5,
};
