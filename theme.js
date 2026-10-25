// Light/dark toggle. Follows the system setting until the visitor picks a theme,
// then remembers that choice. Loaded synchronously in <head> so the saved theme is
// applied before first paint; the button itself is added once the DOM is ready.
(function () {
    var KEY = 'theme';
    var root = document.documentElement;
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var THEME_COLOR = { light: '#ffffff', dark: '#121417' };

    var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

    function stored() {
        try {
            var value = localStorage.getItem(KEY);
            return value === 'light' || value === 'dark' ? value : null;
        } catch (e) {
            return null;
        }
    }

    function save(theme) {
        try {
            localStorage.setItem(KEY, theme);
        } catch (e) {
            // Storage can be blocked (private mode); the choice then lasts for this page only.
        }
    }

    function current() {
        return root.dataset.theme || (media.matches ? 'dark' : 'light');
    }

    function apply(theme) {
        root.dataset.theme = theme;
        var metas = document.querySelectorAll('meta[name="theme-color"]');
        for (var i = 0; i < metas.length; i++) {
            metas[i].setAttribute('content', THEME_COLOR[theme]);
        }
    }

    var saved = stored();
    if (saved) {
        root.dataset.theme = saved;
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (saved) {
            apply(saved);
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';

        function render() {
            var dark = current() === 'dark';
            var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
            button.setAttribute('aria-label', label);
            button.title = label;
            button.innerHTML = dark ? SUN : MOON;
        }

        button.addEventListener('click', function () {
            var next = current() === 'dark' ? 'light' : 'dark';
            apply(next);
            save(next);
            render();
        });
        media.addEventListener('change', function () {
            if (!stored()) {
                render();
            }
        });

        render();
        document.body.appendChild(button);
    });
})();
