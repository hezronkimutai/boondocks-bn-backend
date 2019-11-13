import pug from 'pug';
import sgMail from '@sendgrid/mail';
import config from '../config';

sgMail.setApiKey(config.SENDGRID_API_KEY);

/**
* Class representing a .
*/
export default class mailer {
  /**
   * Create a point.
   * @param {object} mailOptionsObject - contains the details to be sent
   * @return {object} status - it has sent of the sent email
   */
  static async sendEmail(mailOptionsObject) {
    const html = pug.renderFile(
      `${__dirname}/../utils/templates/emails/${mailOptionsObject.htmlPath}`,
      mailOptionsObject.data
    );

    const msg = {
      to: mailOptionsObject.toAddress,
      from: 'no-reply@barefoot.com',
      subject: mailOptionsObject.subject,
      html,
      mail_settings: {
        sandbox_mode: {
          enable: config.env === 'test',
        },
      }
    };
    const status = await sgMail.send(msg);
    return status;
  }

  /**
   * Sends the verification email
   * @param {string} name - the name of the person.
   * @param {string} hostUrl - the host url
   * @param {string} to - the email sending to
   * @param {string} token - token to verify the email
   * @return {null} nothing.
   */
  static async sendVerificationEmail(name, hostUrl, to, token) {
    await this.sendEmail({
      toAddress: to,
      subject: 'Email Verification',
      data: {
        name,
        message: 'token',
        link: `${hostUrl}/api/v1/auth/verification?token=${token}`,
        regenerateLink: `${hostUrl}/api/v1/auth/reverifyUser?email=${to}`
      },
      htmlPath: 'emailVerification.pug'
    });
  }
}
