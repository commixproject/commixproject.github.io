$(document).ready(function() {
  var pullLink =
    'https://api.github.com/repos/commixproject/commix/pulls';

  var rawpullTemplate = $('.pull-template').remove().html()
  var $pullTemplate = $(rawpullTemplate);
  var $pullContainer = $('.each-block.pulls b');

  $.ajax({
    url: pullLink
  }).done(function(result) {
      var plural = " is "
      if (result.length > 1 ) {
          plural = "s are "
      }
      if (result.length >= 1 ) {
        $pullContainer.append(result.length + " pull request" + plural + " waiting");
      } else {
        $pullContainer.append("no pull requests are waiting");
      }
  });
});
