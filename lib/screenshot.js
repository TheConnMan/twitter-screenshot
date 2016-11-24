var phantom = require('phantom');

module.exports = {
  capture: function(user, statusId) {
    var _ph, _page, _outObj;

    return phantom.create().then(ph => {
      _ph = ph;
      return _ph.createPage();
    }).then(page => {
      page.property('viewportSize', {
        width: 1024,
        height: 768 }
      );
      page.property('clipRect', {
        top: 0,
        left: 0,
        width: 1024,
        height: 768
      });
      _page = page;
      return _page.open('https://twitter.com/' + user + '/status/' + statusId);
    }).then(status => {
      return _page.render(statusId + '.png');
    }).then(content => {
      _page.close();
      _ph.exit();
      console.log('Completed a screenshot of https://twitter.com/' + user + '/status/' + statusId);
      return statusId + '.png';
    });
  }
};
