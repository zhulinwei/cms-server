const config = require('../configs').mail;
const nodemailer = require('nodemailer');

class Mail {
  constructor() {
    this._host = config.host;
    this._port = config.port;
    this._user = config.user;
    this._pass = config.password;
    const options = {
      host: this._host,
      port: this._port,
      auth: {
        user: this._user,
        pass: this._pass,
      }
    };
    this._transporter = nodemailer.createTransport(options);
  }

  async send(body) {
    let { from, to, subject, text, html, attachments } = body;
    if (!to) to = this._user;
    if (!from) from = this._user;
    if (!subject) throw new Error('邮件标题不存在');
    if (!html) throw new Error('邮件主体不存在');

    let options = { from, to, subject, html };
    if (text) options.text = text;
    if (attachments) options.attachments = attachments;

    return await this._transporter.sendMail(options).catch(err => err)
  }
}

module.exports = new Mail();
