
  /*const { google } = require("googleapis");

  // changes 
  const { spawnSync } = require("child_process");

  const {
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN,
  } = require("./credentials");
  
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const repliedUsers = new Set();

  //changes 
  function generateReply(emailContent) {
    const result = spawnSync("python", ["./setupllama.py", emailContent]);
    return result.stdout.toString();
  }
  const emailContent1="";
  const replyContent1="";
  
  async function checkEmailsAndSendReplies() {
    try {
      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  
      // Get the list of unread messages.
      const res = await gmail.users.messages.list({
        userId: "me",
        q: "is:unread",
      });
      const messages = res.data.messages;
  
      if (messages && messages.length > 0) {
        // Fetch the complete message details.
        const currentTime = Date.now();
        const timeWindow = 5 * 60 * 1000; //logic for replying the recent messages nearly before 5 minutes
        for (const message of messages) {
          const email = await gmail.users.messages.get({
            userId: "me",
            id: message.id,
          });

          const from = email.data.payload.headers.find(
            (header) => header.name === "From"
          );
          const toHeader = email.data.payload.headers.find(
            (header) => header.name === "To"
          );
          const Subject = email.data.payload.headers.find(
            (header) => header.name === "Subject"
          );
          const internalDate = parseInt(email.data.internalDate);
          if (currentTime - internalDate > timeWindow) {
            continue;
          }
          //who sends email extracted
          const From = from.value;
          //who gets email extracted
          const toEmail = toHeader.value;
          //subject of unread email
          const subject = Subject.value;
          console.log("email come From", From);
          console.log("to Email", toEmail);
          //check if the user already  replied
          if (repliedUsers.has(From)) {
            console.log("Already replied to : ", From);
            continue;
          }
          //changes
          const emailContent = email.data.snippet;
          emailContent1=emailContent
          const replyContent = generateReply(emailContent);
          replyContent1=replyContent


          // Check if the email has any replies before
          const thread = await gmail.users.threads.get({
            userId: "me",
            id: message.threadId,
          });
  
          //changes 

          // const replies = thread.data.messages.slice(1);
          if (replies.length === 0) {
            // Reply to the email.
            await gmail.users.messages.send({
              userId: "me",
              requestBody: {
                raw: await createReplyRaw(toEmail, From, subject),
              },
            });
  
            // Add a label to the email.
            const labelName = "Testing";
            await gmail.users.messages.modify({
              userId: "me",
              id: message.id,
              requestBody: {
                addLabelIds: [await createLabelIfNeeded(labelName)],
              },
            });
  
            console.log("Sent reply to email:", From);
            //Add the user to replied users set
            repliedUsers.add(From);
          }
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  
  async function createReplyRaw(from, to, subject) {
    const emailContent = `From: ${from}\nTo: ${to}\nSubject: ${subject}\n\n${replyContent1}`;

    //const emailContent = `From: ${from}\nTo: ${to}\nSubject: ${subject}\n\n Hi, this is sourav and i'm sending this mail to let you know that it is auto generated mail because i'm working on an automated mail responder`;
    const base64EncodedEmail = Buffer.from(emailContent1)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  
    return base64EncodedEmail;
  }
  
  // add a Label to the email and move the email to the label
  async function createLabelIfNeeded(labelName) {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const res = await gmail.users.labels.list({ userId: "me" });
    const labels = res.data.labels;
  
    const existingLabel = labels.find((label) => label.name === labelName);
    if (existingLabel) {
      return existingLabel.id;
    }
  
    const newLabel = await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        name: labelName,
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      },
    });
  
    return newLabel.data.id;
  }
  
  //repeating the steps as every 45 seconds and 125 seconds
  function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  setInterval(checkEmailsAndSendReplies, getRandomInterval(45, 120) * 1000);

  */

  const express = require('express');
  const axios = require('axios');
  const app = express();
  const port = 3000;
  
  // Function to call the Python Flask API
  async function generateReply(emailContent) {
      try {
          const response = await axios.get('http://localhost:5000/ask', {
              params: { prompt: emailContent }
          });
          return response.data.response;
      } catch (error) {
          console.error('Error generating reply:', error);
          return 'Error generating reply.';
      }
  }
  
  const {
      CLIENT_ID,
      CLEINT_SECRET,
      REDIRECT_URI,
      REFRESH_TOKEN,
  } = require("./credentials");
  
  const { google } = require("googleapis");
  
  const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLEINT_SECRET,
      REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  const repliedUsers = new Set();
  
  async function checkEmailsAndSendReplies() {
      try {
          const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  
          // Get the list of unread messages.
          const res = await gmail.users.messages.list({
              userId: "me",
              q: "is:unread",
          });
          const messages = res.data.messages;
  
          if (messages && messages.length > 0) {
              // Fetch the complete message details.
              const currentTime = Date.now();
              const timeWindow = 2 * 60 * 1000; // logic for replying to recent messages within the last 5 minutes
              for (const message of messages) {
                  const email = await gmail.users.messages.get({
                      userId: "me",
                      id: message.id,
                  });
  
                  const from = email.data.payload.headers.find(
                      (header) => header.name === "From"
                  );
                  const toHeader = email.data.payload.headers.find(
                      (header) => header.name === "To"
                  );
                  const Subject = email.data.payload.headers.find(
                      (header) => header.name === "Subject"
                  );
                  const internalDate = parseInt(email.data.internalDate);
                  if (currentTime - internalDate > timeWindow) {
                      continue;
                  }
                  // Who sends the email
                  const From = from.value;
                  // Who gets the email
                  const toEmail = toHeader.value;
                  // Subject of the unread email
                  const subject = Subject.value;
                  console.log("Email from:", From);
                  console.log("To Email:", toEmail);
  
                  // Check if the user already replied
                  if (repliedUsers.has(From)) {
                      console.log("Already replied to:", From);
                      continue;
                  }
  
                  const emailContent = email.data.snippet;
                  const replyContent = await generateReply(emailContent);
                  console.log(replyContent.toString())
                  // Check if the email has any replies before
                  const thread = await gmail.users.threads.get({
                      userId: "me",
                      id: message.threadId,
                  });
  
                  const replies = thread.data.messages.slice(1);
                  if (replies.length === 0) {
                      // Reply to the email.
                      await gmail.users.messages.send({
                          userId: "me",
                          requestBody: {
                              raw: createReplyRaw(From, toEmail, subject, replyContent),
                          },
                      });
  
                      // Add a label to the email.
                      const labelName = "Testing";
                      await gmail.users.messages.modify({
                          userId: "me",
                          id: message.id,
                          requestBody: {
                              addLabelIds: [await createLabelIfNeeded(labelName)],
                          },
                      });
  
                      console.log("Sent reply to email:", From);
                      // Add the user to the replied users set
                      repliedUsers.add(From);
                  }
              }
          }
      } catch (error) {
          console.error("Error occurred:", error);
      }
  }
  
  function createReplyRaw(from, to, subject, replyContent) {
      const emailContent = `From: ${to}\nTo: ${from}\nSubject: ${subject}\n\n${replyContent}`;
      const base64EncodedEmail = Buffer.from(emailContent)
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");
      return base64EncodedEmail;
  }
  
  async function createLabelIfNeeded(labelName) {
      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      const res = await gmail.users.labels.list({ userId: "me" });
      const labels = res.data.labels;
  
      const existingLabel = labels.find((label) => label.name === labelName);
      if (existingLabel) {
          return existingLabel.id;
      }
  
      const newLabel = await gmail.users.labels.create({
          userId: "me",
          requestBody: {
              name: labelName,
              labelListVisibility: "labelShow",
              messageListVisibility: "show",
          },
      });
  
      return newLabel.data.id;
  }
  
  function getRandomInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  setInterval(checkEmailsAndSendReplies, getRandomInterval(45, 120) * 1000);
  
  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
  });
  