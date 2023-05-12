# frontend-js

Frontend package to help accelerate authillo integration for javascript (or typescript) based frontends

## Initialization

1. ### Create Your platform
1. ### Install @authillo/frontend-js
   Install the npm package by running the following command
   `npm i @authillo/frontend-js`
1. ### Import the Authillo package
   We recommend that you import Authillo at the beginning of your frontend javascript code execution (you'll likely call this function in an index.(some-file-extension) file )
   ```javascript
   import { Authillo } from "@authillo/frontend-js";
   ```
1. ### Initialize Authillo Instance
   Initialize your Authillo instance with your platform’s configuration by calling the initialize function as outlined below
   ```javascript
   Authillo.initialize({
   	clientId: "your_client_id",
   	defaultRedirectUri: "your_default_redirect_uri",
   });
   ```

## Login or Verify a user

1. ### Initialize your instance
   Ensure you've completed all the tasks in the initialization steps above
1. ### Perform Authorization Request

   Perform the Authorization Request by calling the `Authillo.begin()` function with the relevant information you’d like the user to verify. During the Authorization request, the user will be redirected to authillo’s website to perform the relevant verifications

   ```javascript
   Authillo.begin(["face"]);
   ```

1. ### Handle User Returning

   We then redirect the user back to your site at the `redirect_uri` that you provided during the Authorization Request step (or to the `defaultRedirectUri` that you specified during `Authillo.initialize()` )

   - In this step, you’ll want to grab the authorizationCode and state parameters from the querystring parameters. For convenience, we’ve created a utility function that parses the parameters for you and returns them as a javascript object

   - ```javascript
     const { code, state } = Authillo.parseResultsFromQueryString();
     ```

1. ### Perform Token Request

   - Send a request from your frontend to your backend that includes the following information
     - the authorizationCode (stored in the `code` variable in the above code snippet)
     - the state (stored in the `state` variable in the above code snippet)
   - In your backend, perform the token request as outlined in authillo’s documentation

1. ### Perform User Info Request
   - Once you’ve received tokens, you can perform a userInfo request as outlined in authillo’s documentation
1. ### Return JWT
   - Return the user’s ID token to the frontend
