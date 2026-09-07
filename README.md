# commixproject.com

The [Commix Project](https://commixproject.com) website. Static, served by GitHub Pages — no build step.

The tool itself lives in [commixproject/commix](https://github.com/commixproject/commix).

```bash
python3 -m http.server 8000
```

`index.html`, `news.html` and `404.html` are the three pages.

## Three gotchas

**The chrome is injected at runtime.** The navigation, the hero slider with its stats band, and the footer are custom elements — edit `js/header.js`, `js/hero.js` and `js/footer.js`, not the HTML. `footer.js` also carries its own `<style>` block, which beats `style.css`.

**Nothing on the page is hardcoded that the repository already knows.** The star and fork counts, every release on `/news.html`, and the in-development version all come from GitHub at load time. Anything from those responses must go through `commix.escapeHtml()` or `commix.safeUrl()` in `js/main.js` before it reaches the DOM.

**Bump `?v=` after changing a local file**, in all three pages, or returning visitors keep the cached copy.

## License

Built on the uBeasa template by freshDesignweb. Commix Project is GPLv3 licensed © 2014-2026.
