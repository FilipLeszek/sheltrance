import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type attachmentData = {
  filename: string;
  path: string;
  contentType: "application/pdf";
};

type AddresseeConfig = { name: string; address: string };

const SHELTRANCE_MAILER_CONF: SMTPTransport.Options = {
  service: "gmail",
  auth: { user: "noreplysheltrance@gmail.com", pass: "KochamStudiowac123!" },
};

const SHELTRANCE_ADDR_CONF: AddresseeConfig = {
  name: "Lendy - ubezpieczenie konia i jeźdźca",
  address: "noreplysheltrance@gmail.com",
};

class Mailer {
  private smtpOptions: SMTPTransport.Options;
  private transporter!: Transporter<SentMessageInfo>;
  protected addrConfig: AddresseeConfig;

  constructor(mailerConf: SMTPTransport.Options, addrConfig: AddresseeConfig) {
    this.smtpOptions = mailerConf;
    this.addrConfig = addrConfig;
    this.transporter = nodemailer.createTransport(this.smtpOptions);
  }

  async sendHtml(
    to: string | string[],
    subject: string,
    html: string,
    attachmentData?: attachmentData[],
    bcc?: string | string[],
    replyTo?: string
  ) {
    const result = await this.transporter.sendMail({
      from: this.addrConfig,
      to: to,
      subject: subject,
      html: html,
      bcc: bcc,
      attachments: attachmentData ? attachmentData : undefined,
      replyTo: replyTo,
    });
    return result;
  }
}

export class MailerLendy extends Mailer {
  constructor() {
    super(SHELTRANCE_MAILER_CONF, SHELTRANCE_ADDR_CONF);
  }
}

export default Mailer;
