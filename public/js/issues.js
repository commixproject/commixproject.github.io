$(document).ready(function() {
  var issueLink =
    'https://api.github.com/repos/commixproject/commix/issues';

  var rawissueTemplate = $('.issue-template').remove().html()
  var $issueTemplate = $(rawissueTemplate);
  var $issueContainer = $('.each-block.issues b');

  $.ajax({
    url: issueLink
  }).done(function(result) {
    var plural = ""
      if (result.length > 1 ) {
          plural = "s"
      }
      $issueContainer.append(result.length + " open issue" + plural);
  });
});
