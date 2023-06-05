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

### Deploying to Google Cloud Functions
It is possible to deploy changes to the code through the CLI or through the Google Cloud Console
- https://cloud.google.com/sdk/gcloud/reference/functions/deploy
- https://console.cloud.google.com/welcome?project=noi-notification-system


# API Use Guide
The PNSS database can be queried for information about pesticides in two ways: by location, or by county

- ## By location (/findNearbyNOI)
  - This endpoint will return a JSON object containing a list of all the NOIs within a specified radius of a specified location
  - ### Query Parameters
    - **Required**
      - **latitude** (numeric): The latitude coordinate of the desired location
      - **longitude** (numeric): The longitude coordinate of the desired location
      - **radius** (numeric): The radius in which to look for NOIs
    - **Special Modes**
      - **count** ('true' or 'false'): When this parameter is true, the query will **only** return the number of results in the query; there will be no actual NOI information
      - **map** ('true' or 'false'): When this parameter is true, the query will **only** return the coordinates of the NOIs within the given radius; there will be no specific details
    - **Optional**
      - **order** ('asc' or 'desc'): This parameter specifies the order by which the data returned will be sorted
      - ~~**orderParam** ('distance' or 'time'): This parameter specifies to sort by distance or time~~ Depracated
      - **startDate** (YYYY-MM-DD): This parameter specifies the start of the date range to be filtering the response data by
      - **endDate** (YYYY-MM-DD): This parameter specifies the end of the date range to be filtering the response data by
      - **page** (integer > 0): This parameter specifies which page of the pagination sequence for the set of returned data to return
      - **pageSize** (integer >= 10): This parameter specifies how many items to return per "page" of the request.
