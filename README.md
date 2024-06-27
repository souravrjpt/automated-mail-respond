# automated-mail-respond

## Description:

**This is a repository for Auto_reply_gmail_api_app App Developed using Node.js and Google APIs. This app is able to respond to emails sent to your Gmail mailbox while you’re dealing with other things. The reply is generated using LLAMA model.**

## Features

- **Node.js Clusters Support**: Utilizes Node.js cluster module to improve performance by distributing incoming requests across multiple instances of the application.
- **Checks for New Emails**: Periodically checks a specified Gmail ID for new, unread emails.
- **Sends Replies**: Automatically generates and sends replies to emails that have no prior replies.
- **Adds Labels**: Adds a specified label to the replied email and moves the email to that label.
- **Random Interval Checking**: Checks for new emails at random intervals between 45 and 120 seconds.
- **Reply through LLM generated mail**: The mail is generated using llama model which will make the response more accurate.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Python 3.x (for the Flask API)
- Google API credentials for Gmail
- Llama model should be installed in your local computer ( If you don't have any api of any generative model as like me:) )

## Libraries

### 1. googleapis

This package is imported from the `googleapis` module and provides the necessary functionality to interact with various Google APIs, including the Gmail API. 

### 2. OAuth2

The `OAuth2` class from the `google.auth` module is used to authenticate the application and obtain an access token for making requests to the Gmail API. It handles token refresh and retrying requests if necessary.

### 3. Flask

For making api to request the model for response.

## Getting Started

To set up OAuth 2.0 authentication for your application and enable the Gmail API, follow these steps:

### 1. Create a New Project in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.developers.google.com) and create a new project.
2. Provide a suitable name for your project and click on the **Create** button.
3. Once the project is created, click on the project name to navigate to the project dashboard.

### 2. Set Up OAuth 2.0 Credentials

1. In the left sidebar, click on the **Credentials** tab under the **APIs & Services** section.
2. On the Credentials page, click on the **Create credentials** button and select **OAuth client ID** from the dropdown menu.
3. Select the application type as **Web application** and provide a name for the OAuth 2.0 client ID.
4. In the **Authorized redirect URIs** field, enter the redirect URI where you want to receive the authorization code. For this example, you can use https://developers.google.com/oauthplayground.
5. Click on the **Create** button to create the OAuth client ID. A modal will display the client ID and client secret. Copy the values of the client ID and client secret.
6. Ensure that the Gmail API is enabled for your project. Go to the **Library** tab under the **APIs & Services** section, search for "Gmail API," and enable it.

### 3. Use the OAuth 2.0 Playground

1. Open the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Click on the settings icon (gear icon) on the top right corner.
3. In the **OAuth 2.0 configuration** section, enter the client ID and client secret obtained in the previous step.
4. Scroll down to the **Step 1: Select & authorize APIs** section.
5. In the input box, enter `https://mail.google.com` and select the appropriate Gmail API scope.
6. Click on the **Authorize APIs** button. It will redirect you to the Google account login page.
7. Sign in with the Google account associated with the Gmail account you want to use for auto-reply.
8. After successful authorization, the OAuth 2.0 Playground will display an authorization code. Copy this code.
9. Click on the **Exchange authorization code for tokens** button. It will exchange the authorization code for a refresh token.
10. The OAuth 2.0 Playground will display the refresh token. Copy the refresh token value.

### 4. Update Your Code

1. Open your `credentials.js` file.
2. Replace the placeholder values with the respective values you obtained:
   - Replace `CLIENT_ID` with the client ID value.
   - Replace `CLIENT_SECRET` with the client secret value.
   - Replace `REDIRECT_URI` with the redirect URI value.
   - Replace `REFRESH_TOKEN` with the refresh token value.
3. Save the `credentials.js` file.

You are now set up to use the Gmail API with OAuth 2.0 authentication in your application.

### You can use these easy steps to set up the project
```bash
# Get the latest snapshot
git clone https://github.com/souravrjpt/automated-mail-respond.git

# Install NPM dependencies
cd automated-mail-respond
npm install

# Install googleapis and nodemon
npm install googleapis nodemon

# Then simply start your app
npm start
```

### Now you need to setup your LLM locally

Simply download from https://llama.meta.com/llama-downloads/ 
Then you need to interact with LLM using api. I made an api in flask (which you can grab from `llm.py` file.). And whenever you make any request to it, Llama model will return a response to it which you can easily use in you reply.

Setup virtual environment for flask, first install it by `pip i virtualenv`

```bash
python -m venv env

# activate the virtual environment
env\Scripts\activate

```

After doing all this write these two belowm commands to run both server

```bash
#To run flask app 
flask --app llm run

#To run gmail api
node index.js
```
Now try to mail to the gmail that you've registered and wait for your response
( The response will take a little time as your model is running locally)

## Ideas for improvement and code optimization
 - We can use redis or its tools for better queing and management of recent emails.
 - Can add more prompt in template for better output.

