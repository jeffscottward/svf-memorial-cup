/**
 * GET /
 * News page.
 */

exports.index = function(req, res) {
  res.render('news', {
    title: 'News'
  });
};
