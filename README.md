# commixproject.com

The [Commix Project](https://commixproject.com) website. 

A static site, served by GitHub Pages from the `CNAME` in this repository — there is no build step, no generator and no dependency install. 

What is committed is what is served.

The tool itself lives in [commixproject/commix](https://github.com/commixproject/commix).

## Layout

```
index.html              the site
404.html                not-found page, same chrome
preview-features.html   staging ground for changes not yet on the front page
css/style.css           everything this project styles
css/animate.css         vendored, animate.css
css/flexslider.css      vendored, FlexSlider
js/header.js            the navigation bar, as a <header-component> custom element
js/footer.js            the footer, as a <footer-component> custom element
js/main.js              hero slider, scroll behaviour, off-canvas menu
js/jquery.*.js          vendored, easing / waypoints / FlexSlider
images/                 logo, hero background, sponsor logo
```

Bootstrap 3.3.7, jQuery 3.3.1, Font Awesome 6.7.2 and the *Exo 2* typeface load from CDNs; everything else is in the repository.

## Two things to know before editing

**The header and footer are not in the HTML.** They are injected at runtime by custom elements, so `index.html` and `404.html` contain only `<header-component></header-component>` and `<footer-component></footer-component>`. 

Editing the navigation or the footer text means editing `js/header.js` or `js/footer.js` — searching the HTML for that text will find nothing.

**Bump the asset version when you change a local file.** 

The four files this project owns are requested with a version query:

```html
<link rel="stylesheet" href="/css/style.css?v=20260905">
<script src="/js/main.js?v=20260905"></script>
<script src="/js/header.js?v=20260905" type="text/javascript" defer></script>
<script src="/js/footer.js?v=20260905" type="text/javascript" defer></script>
```

Without it, a returning visitor keeps the copy their browser already has and simply does not see the change — a `defer`-loaded script is held onto stubbornly, and a normal reload will not always shift it. 

After editing `style.css`, `main.js`, `header.js` or `footer.js`, raise the date in `index.html` and `404.html`. 

The vendored libraries carry their version in the filename and are left alone.

## Working on it locally

Any static server will do, from the repository root so that the absolute `/css` and `/js` paths resolve:

```bash
python3 -m http.server 8000
```

Then open <http://127.0.0.1:8000>. 

While iterating on CSS or the injected header and footer, a server that refuses to let the browser cache saves a great deal of confusion:

```bash
python3 -c "
import functools
from http.server import SimpleHTTPRequestHandler, HTTPServer
class H(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
HTTPServer(('127.0.0.1', 8000), functools.partial(H, directory='.')).serve_forever()"
```

## Credit

Built on the uBeasa template by freshDesignweb. 

## License

Commix Project is GPLv3 licensed © 2014-2026.
