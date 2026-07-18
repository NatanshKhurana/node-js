const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");

cron.schedule("30 15 * * *", async () => {
  // write code here which is to be scheduled
  // scheduling sending email code everyday at 8 am

  try {
    const today = subDays(new Date(), 0);
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gt: todayStart,
        $lt: todayEnd,
      },
    }).populate("toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.email)),
    ];
    console.log(listOfEmails);

    for (const email of listOfEmails) {
      try {
        const resEmail = await sendEmail.run(
          "You have new connection requests",
          `Please login to ${email}, You have some new connection requests`,
        );
        console.log(resEmail);
      } catch (err) {
        console.log(err.message);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});
