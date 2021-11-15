/*
 * @Author: 尉旭胜(Riansin)
 * @LastEditors: 尉旭胜(Riansin)
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const tag = 'shijing';
    const spe = 'shijing';
    const url = `https://rainsin-1305486451.cos.ap-nanjing.myqcloud.com/poet-database/${tag}/${spe}.json`;
    const res = await ctx.curl(url, { dataType: 'json' });
    const rus = await ctx.app.mysql.get('blog', { id: 1 });
    ctx.body = rus;
  }
}

module.exports = HomeController;
