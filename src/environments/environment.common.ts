export const commonEnvironments = {
  // api key
  apiKey: 'AIzaSyBhUi3BrrUqpJ_fJn8wYs8sBfWhM9Y6qvM',
  // blogger api host
  // `3591293219003751160` is blog id to get data
  apiHost: 'https://www.googleapis.com/blogger/v3/blogs/3591293219003751160',
  // client id for blogger api
  clientId: '872042937877-gm0o2gnkl3962vlsrfp8ei650fc11aci.apps.googleusercontent.com',
  // blog theme for comment editor
  // it's not used for now since the comment iframe isn't working correctly because of the CORS issue
  blogTheme: 'soho',
  // set displayable labels for post list
  displayableLabels: 3,
  // set admin email link
  // the user can sign in if the email is same with this value
  adminEmail: 'tk2rush90@gmail.com',
  // set the labels that can be categorized
  // `value` field is exact label
  // `label` field is displaying text for category
  categories: [
    {
      label: 'Dev Notes',
      value: 'dev-notes',
    },
    {
      label: 'Side Projects',
      value: 'side-projects',
    }
  ],
  // instagram profile url
  instagramUrl: 'https://www.instagram.com/scripter_90',
  // github url
  githubUrl: 'https://github.com/tk2rush90',
  // tablet breaking width
  tabletBreakingWidth: 768,
  // key of previous path
  previousPathKey: 'SCRIPTER_PREV_PATH',
};
