# Pesticide NOI Notification System Backend Development Guide
## System Architecture
- Our backend system architecture employs a serverless approach to responding to user web-requests. Instances of our express server are created and run through a Google Cloud Function v2, and are able to scale on demand.

### Local Development
- `index.js` is the main file for this backend.
- To begin local development, make sure to first install all the current dependencies with `npm install`.
- Run `npm run watch` to start the express server with npm-watch. This package automatically runs scripts (in this case, it restarts the express server) when files change. The following snippet from `package.json` determines which files are monitored for changes.

`
...
  "watch": {
    "start": "*"
  },
...
`

- In order for requests regarding the Twilio text message portion of our backend to work with your local instance of our express server, you will have to create an instance of ngrok, as well as run the Google Cloud SQL proxy.