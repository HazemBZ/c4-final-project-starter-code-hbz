// DONE: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'd4ttqazwf6'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // DONE: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-g87fb2-p.us.auth0.com',            // Auth0 domain
  clientId: 'AQfJlJN0eL6EqcjNkmAyMaiB4lvB4FeH',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
