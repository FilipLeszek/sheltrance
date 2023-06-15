import { MailerSheltrance } from "../Mailer";

test("sending mail", async () => {
  const mailer = new MailerSheltrance();
  await mailer.sendPassResetHref("filip.leszek@lkfss.com", "dawd", "dawd")
});
