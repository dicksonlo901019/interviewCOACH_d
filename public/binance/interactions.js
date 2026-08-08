(() => {
  'use strict';

  const desktopMedia = window.matchMedia('(min-width: 901px)');
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.menu-label');
  const closeButton = document.querySelector('.close-menu');
  const scrim = document.querySelector('.scrim');
  const navToggle = document.querySelector('#nav-toggle');
  const storageKey = 'binance-sidebar-collapsed';
  let returnFocus = null;

  if (!sidebar || !menuButton || !closeButton || !scrim || !navToggle) return;

  sidebar.id = 'binance-sidebar';
  sidebar.setAttribute('aria-label', '面試攻略章節');
  navToggle.hidden = true;
  navToggle.setAttribute('aria-hidden', 'true');
  navToggle.tabIndex = -1;
  menuButton.id = 'binance-menu-button';
  menuButton.removeAttribute('for');
  menuButton.tabIndex = 0;
  menuButton.setAttribute('role', 'button');
  menuButton.setAttribute('aria-controls', sidebar.id);
  menuButton.setAttribute('aria-keyshortcuts', 'Alt+M');
  closeButton.tabIndex = 0;
  closeButton.removeAttribute('for');
  closeButton.setAttribute('role', 'button');
  closeButton.setAttribute('aria-label', '關閉章節選單');
  scrim.tabIndex = -1;
  scrim.removeAttribute('for');

  function sidebarControls() {
    return [...sidebar.querySelectorAll('a, button, input, summary, [tabindex]')];
  }

  function isKeyboardReachable(element) {
    if (element.tabIndex < 0 || element.offsetParent === null) return false;
    const closedDetails = element.closest('details:not([open])');
    if (!closedDetails) return true;
    return element.matches('summary') && element.parentElement === closedDetails;
  }

  function setSidebarInteractive(interactive) {
    sidebar.toggleAttribute('inert', !interactive);
    if (interactive) sidebar.removeAttribute('aria-hidden');
    else sidebar.setAttribute('aria-hidden', 'true');

    sidebarControls().forEach((element) => {
      if (!interactive) {
        if (!element.hasAttribute('data-binance-tabindex')) {
          element.dataset.binanceTabindex = element.hasAttribute('tabindex') ? element.getAttribute('tabindex') : '';
        }
        element.tabIndex = -1;
        return;
      }
      if (!element.hasAttribute('data-binance-tabindex')) return;
      const previous = element.dataset.binanceTabindex;
      if (previous === '') element.removeAttribute('tabindex');
      else element.setAttribute('tabindex', previous);
      delete element.dataset.binanceTabindex;
    });
  }

  function updateMenuButton(expanded) {
    const desktop = desktopMedia.matches;
    const label = expanded ? '收合左側選單' : '展開左側選單';
    menuButton.setAttribute('aria-expanded', String(expanded));
    menuButton.setAttribute('aria-label', desktop ? label : (expanded ? '關閉章節選單' : '開啟章節選單'));
    menuButton.title = desktop ? `${label}（Alt+M）` : (expanded ? '關閉章節選單' : '開啟章節選單');
    menuButton.textContent = desktop && !expanded ? '→' : '☰';
  }

  function setDesktopCollapsed(collapsed, persist = true) {
    document.body.classList.toggle('binance-sidebar-collapsed', collapsed);
    document.body.classList.remove('binance-nav-open');
    navToggle.checked = false;
    scrim.setAttribute('aria-hidden', 'true');
    setSidebarInteractive(!collapsed);
    updateMenuButton(!collapsed);
    if (persist) localStorage.setItem(storageKey, collapsed ? 'true' : 'false');
  }

  function openMobile(invoker = document.activeElement) {
    returnFocus = invoker instanceof HTMLElement ? invoker : menuButton;
    navToggle.checked = true;
    document.body.classList.add('binance-nav-open');
    scrim.setAttribute('aria-hidden', 'false');
    setSidebarInteractive(true);
    updateMenuButton(true);
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeMobile({ restoreFocus = false } = {}) {
    const focusTarget = restoreFocus && returnFocus?.isConnected ? returnFocus : null;
    if (focusTarget) focusTarget.focus();
    navToggle.checked = false;
    document.body.classList.remove('binance-nav-open');
    scrim.setAttribute('aria-hidden', 'true');
    setSidebarInteractive(false);
    updateMenuButton(false);
    returnFocus = null;
  }

  function toggleSidebar(event) {
    event?.preventDefault();
    if (desktopMedia.matches) {
      setDesktopCollapsed(!document.body.classList.contains('binance-sidebar-collapsed'));
      return;
    }
    if (document.body.classList.contains('binance-nav-open')) closeMobile({ restoreFocus: true });
    else openMobile(menuButton);
  }

  function syncViewport() {
    if (desktopMedia.matches) {
      setDesktopCollapsed(localStorage.getItem(storageKey) === 'true', false);
      return;
    }
    document.body.classList.remove('binance-sidebar-collapsed');
    const open = document.body.classList.contains('binance-nav-open');
    navToggle.checked = open;
    scrim.setAttribute('aria-hidden', String(!open));
    setSidebarInteractive(open);
    updateMenuButton(open);
  }

  function updateActiveNavigation() {
    const hash = decodeURIComponent(location.hash || '#quick');
    document.querySelectorAll('.sidebar a[href^="#"], .topbar a[href^="#"]').forEach((link) => {
      const active = link.getAttribute('href') === hash;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const current = sidebar.querySelector(`a[href="${CSS.escape(hash)}"]`);
    current?.closest('details')?.setAttribute('open', '');
  }

  function focusHashTarget() {
    const target = document.querySelector(location.hash || '#quick');
    if (!target) return;
    const heading = target.matches('section') ? target.querySelector('h1, h2') : target;
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }

  menuButton.addEventListener('click', toggleSidebar);
  menuButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') toggleSidebar(event);
  });
  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    closeMobile({ restoreFocus: true });
  });
  closeButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeMobile({ restoreFocus: true });
    }
  });
  scrim.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeMobile({ restoreFocus: true });
  });

  sidebar.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    if (!desktopMedia.matches) closeMobile();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      updateActiveNavigation();
      focusHashTarget();
    }));
  });

  document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key.toLowerCase() === 'm') {
      event.preventDefault();
      toggleSidebar();
      return;
    }
    if (event.key === 'Escape' && document.body.classList.contains('binance-nav-open')) {
      closeMobile({ restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab' || !document.body.classList.contains('binance-nav-open')) return;
    const focusable = sidebarControls().filter(isKeyboardReachable);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('hashchange', updateActiveNavigation);
  window.addEventListener('resize', syncViewport);
  syncViewport();
  updateActiveNavigation();
})();
