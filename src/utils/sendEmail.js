const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body
        },
        Text: {
          Charset: "UTF-8",
          Data: `
Welcome to DevTinder! 🚀

Hi Natansh,

Thank you for joining DevTinder!

We're excited to have you on board. DevTinder helps developers connect, collaborate, and grow their professional network.

Get Started:
https://yourwebsite.com

If you did not create this account, you can safely ignore this email.

----------------------------------------
© 2026 DevTinder
Connecting Developers ❤️
`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
    ],
  });
};

const run = async (subject, body) => {
  const sendEmailCommand = createSendEmailCommand(
    "natansh.sot010075@pwioi.com",
    "khurananatansh@gmail.com",
    subject,
    body,
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports =  { run };
