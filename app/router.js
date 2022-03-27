/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/music', controller.home.music);
  router.get('/getsong', controller.home.getsong);
  router.get('/getmagnet', controller.home.getMagnetList);
  router.get('/searchtg', controller.home.searchtg);
  router.get('/biliapi/search', controller.home.getBilibili);
  router.get('/biliapi/search/type', controller.home.getBilibilitype);
  router.get('/img', controller.home.getBilibiliImg);
  router.get('/login', controller.home.loginBilibili);
  router.get('/getImg', controller.home.getimg);

  // router.get('/tg/sendCode', controller.home.sendCode);
};
