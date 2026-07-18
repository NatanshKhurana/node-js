const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, subject) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,.1);">

          <!-- Header -->
          <tr>
            <td
              style="background:linear-gradient(90deg,#2563eb,#7c3aed);padding:30px;text-align:center;">
              <h1 style="margin:0;color:white;font-size:30px;">
                🚀 Welcome to DevTinder
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <h2 style="margin-top:0;color:#111827;">
                Hi Natansh 👋
              </h2>

              <p style="font-size:16px;line-height:28px;color:#4b5563;">
                Thank you for joining <strong>DevTinder</strong>.
                We're excited to have you on board.
              </p>

              <p style="font-size:16px;line-height:28px;color:#4b5563;">
                Build meaningful developer connections, discover amazing
                people, and grow your network.
              </p>

              <div style="text-align:center;margin:40px 0;">

                <a href="https://yourwebsite.com"
                  style="
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    padding:16px 32px;
                    border-radius:8px;
                    display:inline-block;
                    font-size:16px;
                    font-weight:bold;">
                  Get Started
                </a>

              </div>

              <hr style="border:none;border-top:1px solid #e5e7eb;">

              <p style="font-size:14px;color:#6b7280;">
                If you did not create this account, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="background:#111827;padding:20px;text-align:center;color:#d1d5db;font-size:13px;">

              © 2026 DevTinder<br>
              Connecting Developers ❤️

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
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

const run = async (subject) => {
  const sendEmailCommand = createSendEmailCommand(
    "natansh.sot010075@pwioi.com",
    "khurananatansh@gmail.com",
    subject,
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
