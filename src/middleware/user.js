const Service = require('../service');

class UserMiddelware {
  constructor() {}

  async check(ctx, next) {
    const uid = ctx.cookies.get('uid') || ctx.request.body.uid;
    const user = yield Service.user.userInfo(uid);
    if (!this.state) this.state = {};
    this.state.uid = uid;
    this.state.utk = utk;
    this.state.user = user;
    yield* next;
  }
}
module.exports = new UserMiddelware();
