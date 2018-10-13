$(document).ready(function() {
  var contributorLink =
    'https://api.github.com/repos/commixproject/commix/contributors';

  var rawContributorTemplate = $('.contributor-template').remove().html()
  var $contributorTemplate = $(rawContributorTemplate);
  var $contributorContainer = $('.each-block.contributors ul');

  $.ajax({
    url: contributorLink
  }).done(function(result) {
    for (var i = 0; i < result.length; i++) {
      var contributorInfo = result[i];
      var $eachContributor = $contributorTemplate.clone();

      $eachContributor
        .find('a').attr('href', contributorInfo.html_url).end()
        .find('.avatar').attr('src', contributorInfo.avatar_url).end()
        .find('.name').text(contributorInfo.login).end()
        .find('.html_url').text(contributorInfo.html_url).end()
        .find('.contributions').text(contributorInfo.contributions)

      $contributorContainer.append($eachContributor);
    }
  });
});
