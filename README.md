# automated-mail-respond

## Description:

**This is a repository for Auto_reply_gmail_api_app App Developed using Node.js and Google APIs. This app is able to respond to emails sent to your Gmail mailbox while you’re dealing with other things.**

## Features

- **Node.js Clusters Support**: Utilizes Node.js cluster module to improve performance by distributing incoming requests across multiple instances of the application.
- **Checks for New Emails**: Periodically checks a specified Gmail ID for new, unread emails.
- **Sends Replies**: Automatically generates and sends replies to emails that have no prior replies.
- **Adds Labels**: Adds a specified label to the replied email and moves the email to that label.
- **Random Interval Checking**: Checks for new emails at random intervals between 45 and 120 seconds.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Python 3.x (for the Flask API)
- Google API credentials for Gmail
