/* Builds the news page from the repository's own releases, so a published release is the only
   thing anyone has to do to update it. */

/* The release notes use a small subset of Markdown: inline code, links, bold and @mentions. */
function newsInline(text) {
  return commix.escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    /* Only http(s) is matched, and the text has already been escaped above. */
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)"']+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/@([A-Za-z0-9][A-Za-z0-9-]*)/g, '<a href="https://github.com/$1" target="_blank" rel="noopener noreferrer">@$1</a>');
}

/* Every line is "* Label: what changed". The label is worth pulling out: it is how the changelog
   is scanned. */
function newsEntries(body) {
  var lines = (body || "").split("\n");
  var out = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.indexOf("* ") !== 0 && line.indexOf("- ") !== 0) continue;

    var text = line.slice(2).trim();
    var label = "";
    var match = text.match(/^(Added|Fixed|Revised|Removed|Updated|Changed|Improved)\s*:\s*/i);

    if (match) {
      label = match[1];
      text = text.slice(match[0].length);
    }

    out.push(
      '<li>' +
      (label ? '<span class="news-tag news-tag-' + label.toLowerCase() + '">' + label + "</span>" : "") +
      newsInline(text) +
      "</li>"
    );
  }

  return out.join("");
}

/* Who published it, as GitHub reports it. A release made by a token rather than a person has no
   author, so the block is skipped rather than left half-drawn. */
function newsAuthor(author) {
  if (!author || !author.login) return "";

  var src = commix.safeUrl(author.avatar_url);
  var avatar = src === "#" ? "" :
    '<img class="news-avatar" src="' + src + (src.indexOf("?") === -1 ? "?" : "&amp;") +
    's=56" alt="" width="28" height="28" loading="lazy">';

  return (
    '<span class="news-sep" aria-hidden="true">-</span>' +
    '<a class="news-author" href="' + commix.safeUrl(author.html_url) + '" target="_blank" rel="noopener noreferrer">' +
    avatar + "@" + commix.escapeHtml(author.login) + "</a>"
  );
}

function newsRelease(release, isLatest) {
  var version = commix.version(release);
  var entries = newsEntries(release.body);

  return (
    '<article class="news-item' + (isLatest ? " news-item-latest" : "") + '">' +
      '<header class="news-head">' +
        '<h2><a href="' + commix.safeUrl(release.html_url) + '" target="_blank" rel="noopener noreferrer">' +
          "Commix " + commix.escapeHtml(version) + " Released</a></h2>" +
        '<p class="news-meta">' +
          commix.escapeHtml(commix.formatMonth(release.published_at)) +
          (release.prerelease ? ' <span class="news-pre">pre-release</span>' : "") +
          newsAuthor(release.author) +
        "</p>" +
      "</header>" +
      (entries ? '<ul class="news-changes">' + entries + "</ul>" : "") +
    "</article>"
  );
}

/* The unreleased revision on master. It has no GitHub release to read, so the version comes from
   the same constants the tool prints for itself, and only digits are taken out of them. */
function newsDev(source) {
  var stable = /STABLE_RELEASE\s*=\s*True/.test(source);
  if (stable) return "";

  var num = source.match(/VERSION_NUM\s*=\s*"([0-9][0-9.]*)"/);
  var rev = source.match(/REVISION\s*=\s*"([0-9]+)"/);
  if (!num || !rev) return "";

  var version = num[1] + ".dev" + rev[1];
  var repo = "https://github.com/commixproject/commix";

  return (
    '<article class="news-item news-item-dev">' +
      '<header class="news-head">' +
        '<h2><a href="' + repo + '/commits/master" target="_blank" rel="noopener noreferrer">' +
          "Commix " + commix.escapeHtml(version) + " In Development</a></h2>" +
        '<p class="news-meta">Unreleased' +
          '<span class="news-sep" aria-hidden="true">-</span>' +
          '<a href="' + repo + '/commits/master" target="_blank" rel="noopener noreferrer">follow the commits</a>' +
        "</p>" +
      "</header>" +
      '<ul class="news-changes"><li>' +
        "The revision currently on master. Everything here lands in the next stable release; " +
        "expect it to move under you." +
      "</li></ul>" +
    "</article>"
  );
}

function loadDev() {
  return fetch("https://raw.githubusercontent.com/commixproject/commix/master/src/utils/settings.py")
    .then(function (r) { return r.ok ? r.text() : ""; })
    .then(newsDev)
    .catch(function () { return ""; });
}

/* How many releases are on the page to begin with, and how many each press adds. The archive runs
   to thirty entries, which is a great deal of changelog to land on. */
var NEWS_FIRST = 1;
var NEWS_STEP = 5;

function newsPager(list, button, releases, latest) {
  var shown = 0;

  function showMore() {
    var next = releases.slice(shown, shown + (shown === 0 ? NEWS_FIRST : NEWS_STEP));
    list.insertAdjacentHTML(
      "beforeend",
      next.map(function (r) { return newsRelease(r, r === latest); }).join("")
    );
    shown += next.length;

    var left = releases.length - shown;
    button.hidden = left <= 0;
    if (left > 0) {
      button.textContent = "Show " + Math.min(left, NEWS_STEP) + " older releases";
    }
  }

  button.addEventListener("click", showMore);
  showMore();
}

function loadNews() {
  var list = document.getElementById("news-list");
  if (!list) return;

  var button = document.getElementById("news-more");

  Promise.all([
    fetch(commix.api + "/releases?per_page=30").then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }),
    loadDev(),
  ])
    .then(function (results) {
      var releases = results[0];
      var dev = results[1];
      if (!releases.length) throw new Error("empty");

      // The newest stable release, which is not necessarily the first entry.
      var latest = releases.filter(function (r) { return !r.prerelease && !r.draft; })[0];

      list.innerHTML = dev;
      newsPager(list, button, releases, latest);
    })
    .catch(function () {
      if (button) button.hidden = true;
      list.innerHTML =
        '<p class="news-error">The releases could not be loaded just now. They are all on ' +
        '<a href="https://github.com/commixproject/commix/releases" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>';
    });
}

document.addEventListener("DOMContentLoaded", loadNews);
