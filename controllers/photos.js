/**
 * GET /
 * Photos page.
 */

exports.index = function(req, res) {
  res.render('photos', {
    title: 'Photos'
  });
};
