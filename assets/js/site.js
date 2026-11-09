/* جواهری قسمتی — shared site script (header, footer, cards, reveals, carousels).
   All store content comes from data.js. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const S = window.SITE || {};
  const CATS = window.CATEGORIES || [];
  const PRODUCTS = window.PRODUCTS || [];
  const USED = window.USED || [];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const links = {
    insta: `https://instagram.com/${S.instagram || ''}`,
    dm: `https://ig.me/m/${S.instagram || ''}`,
    tel: `tel:${S.phoneLink || ''}`,
    map: S.mapUrl || '#',
    product: i => `product.html?p=${i}`,
    used: i => `product.html?u=${i}`,
    collection: id => `collection.html${id ? '?c=' + encodeURIComponent(id) : ''}`,
  };
  const catName = id => (CATS.find(c => c.id === id) || {}).name || '';
  const logoSrc = S.logo || 'images/logo.png';

  // ---------- SVG sprite: calligraphy wordmark + icons ----------
  const CALLI = { vb: '30 -1664 3958 2045', d: 'M275 361Q194 361 144.5 324.5Q95 288 72.5 225.5Q50 163 50 85Q50 15 63.0 -62.5Q76 -140 98.0 -217.5Q120 -295 148 -364L180 -354Q146 -255 122.0 -168.5Q98 -82 98 8Q98 64 120.5 110.0Q143 156 187.5 182.5Q232 209 297 209Q351 209 397.0 191.0Q443 173 479.5 144.5Q516 116 541.5 84.0Q567 52 580.5 22.0Q594 -8 594 -27Q594 -47 586.0 -61.0Q578 -75 569 -79Q537 -71 513 -71Q458 -71 426.0 -107.5Q394 -144 394 -215Q394 -244 401.0 -272.0Q408 -300 419 -327Q444 -327 451 -308Q447 -296 447 -281Q447 -226 496 -226Q520 -226 554 -238Q581 -238 606.5 -200.0Q632 -162 632 -88Q632 -15 605.5 58.5Q579 132 537 196Q488 268 421.5 314.5Q355 361 275 361ZM564 -677Q557 -677 546 -680Q515 -690 497.0 -710.5Q479 -731 479 -752Q479 -769 488.0 -783.0Q497 -797 504 -806L540 -853H546Q554 -826 578.5 -810.0Q603 -794 628 -789L695 -879H701Q709 -853 731.0 -839.0Q753 -825 778 -820Q795 -816 795 -803Q795 -795 788 -785L739 -715Q730 -703 718 -703Q711 -703 700 -706Q676 -715 658.0 -728.5Q640 -742 631 -755L585 -689Q576 -677 564 -677ZM451 -308Q428 -310 419 -327Q440 -377 475.0 -424.0Q510 -471 550 -500Q572 -516 597.0 -526.0Q622 -536 644 -536Q665 -536 681 -525Q686 -515 689.0 -483.5Q692 -452 690 -423Q675 -431 659.0 -434.0Q643 -437 627 -437Q589 -437 553.0 -420.0Q517 -403 490.0 -374.0Q463 -345 451 -308ZM694 -420Q668 -420 647 -440Q652 -465 661.0 -485.5Q670 -506 681 -525Q691 -504 713 -504Q738 -504 769.5 -525.5Q801 -547 825 -575Q845 -597 861.0 -611.5Q877 -626 890 -626Q905 -650 932.0 -665.0Q959 -680 978 -682Q1007 -670 1028.0 -651.0Q1049 -632 1049 -606Q1049 -585 1038.0 -563.5Q1027 -542 1012.5 -524.0Q998 -506 987 -493Q935 -532 892 -532Q846 -532 806 -491Q773 -457 746.0 -438.5Q719 -420 694 -420ZM890 -626Q890 -679 911.5 -727.5Q933 -776 966.5 -813.5Q1000 -851 1036.5 -872.5Q1073 -894 1104 -894Q1126 -868 1156 -868Q1182 -868 1206.0 -889.5Q1230 -911 1240 -945H1259Q1266 -931 1274.0 -924.0Q1282 -917 1296 -917Q1314 -917 1333.0 -935.0Q1352 -953 1365 -989L1382 -992Q1378 -949 1365.0 -912.5Q1352 -876 1331.5 -853.5Q1311 -831 1281 -831Q1261 -831 1240 -842Q1221 -811 1192.5 -793.5Q1164 -776 1134 -776Q1116 -776 1096.5 -783.5Q1077 -791 1060 -806Q1029 -803 1005.0 -788.0Q981 -773 967.5 -753.0Q954 -733 954 -716Q954 -693 978 -682Q978 -670 964.5 -655.0Q951 -640 931.0 -631.0Q911 -622 890 -626ZM1406 -1442Q1399 -1442 1388 -1445Q1357 -1455 1339.0 -1475.5Q1321 -1496 1321 -1517Q1321 -1534 1330.0 -1548.0Q1339 -1562 1346 -1571L1382 -1618H1388Q1396 -1591 1420.5 -1575.0Q1445 -1559 1470 -1554L1537 -1644H1543Q1551 -1618 1573.0 -1604.0Q1595 -1590 1620 -1585Q1637 -1581 1637 -1568Q1637 -1560 1630 -1550L1581 -1480Q1572 -1468 1560 -1468Q1553 -1468 1542 -1471Q1518 -1480 1500.0 -1493.5Q1482 -1507 1473 -1520L1427 -1454Q1418 -1442 1406 -1442ZM1425 -880Q1406 -880 1384.0 -887.5Q1362 -895 1351 -908Q1352 -925 1360.5 -950.0Q1369 -975 1382 -992Q1391 -979 1406.0 -970.5Q1421 -962 1449 -962Q1477 -962 1500.5 -975.5Q1524 -989 1538.5 -1009.0Q1553 -1029 1553 -1046Q1553 -1067 1533 -1079Q1521 -1071 1507.0 -1067.5Q1493 -1064 1480 -1064Q1453 -1064 1430.5 -1081.5Q1408 -1099 1408 -1142L1462 -1295Q1468 -1300 1480.5 -1306.0Q1493 -1312 1509 -1312Q1542 -1312 1562.0 -1288.0Q1582 -1264 1591.0 -1229.0Q1600 -1194 1600 -1160Q1600 -1125 1593.5 -1086.5Q1587 -1048 1576.0 -1014.0Q1565 -980 1551 -958Q1530 -923 1498.0 -901.5Q1466 -880 1425 -880ZM2045 361Q1963 361 1913.5 324.5Q1864 288 1842.0 224.5Q1820 161 1820 82Q1820 16 1832.5 -59.0Q1845 -134 1867.5 -212.0Q1890 -290 1918 -364L1950 -354Q1913 -252 1890.0 -159.5Q1867 -67 1868 14Q1869 70 1893.0 114.5Q1917 159 1961.0 184.0Q2005 209 2067 209Q2125 209 2172.0 190.0Q2219 171 2254.5 141.0Q2290 111 2314.5 78.0Q2339 45 2351.5 17.0Q2364 -11 2364 -26Q2364 -47 2356.0 -61.0Q2348 -75 2339 -79Q2325 -75 2308.0 -73.0Q2291 -71 2280 -71Q2221 -71 2192.5 -111.5Q2164 -152 2164 -217Q2164 -263 2178.5 -318.0Q2193 -373 2218.5 -428.0Q2244 -483 2278.0 -529.0Q2312 -575 2351.0 -602.5Q2390 -630 2431 -630Q2448 -630 2455.0 -622.5Q2462 -615 2462 -606Q2462 -598 2459.5 -588.5Q2457 -579 2452 -567L2414 -465H2404Q2387 -483 2380 -483Q2351 -483 2322.0 -465.5Q2293 -448 2268.5 -419.0Q2244 -390 2229.0 -355.5Q2214 -321 2214 -288Q2214 -263 2225.5 -244.5Q2237 -226 2266 -226Q2277 -226 2292.5 -229.0Q2308 -232 2324 -238Q2354 -238 2378.0 -197.0Q2402 -156 2402 -88Q2402 -16 2376.5 57.5Q2351 131 2307 195Q2258 267 2191.0 314.0Q2124 361 2045 361ZM2400 205 2397 189Q2447 163 2495.0 121.5Q2543 80 2581 32Q2646 -51 2692.5 -129.5Q2739 -208 2786 -267Q2817 -306 2859.0 -336.5Q2901 -367 2953 -367Q2979 -367 3006 -358Q2985 -293 2942 -260Q2907 -262 2878.0 -248.0Q2849 -234 2827.5 -214.5Q2806 -195 2792 -180Q2758 -143 2729.5 -96.0Q2701 -49 2666.5 3.5Q2632 56 2578 110Q2564 124 2536.5 145.5Q2509 167 2473.5 184.5Q2438 202 2400 205ZM2824 -213 2875 -345Q2901 -360 2924.5 -366.0Q2948 -372 2969 -372Q2985 -372 2999.0 -369.0Q3013 -366 3024 -363L3049 -425Q3053 -426 3056.5 -426.5Q3060 -427 3064 -427Q3086 -427 3094.0 -410.0Q3102 -393 3102 -371Q3102 -338 3081.5 -307.0Q3061 -276 3031.0 -256.5Q3001 -237 2973 -237Q2969 -237 2954.5 -243.0Q2940 -249 2916 -249Q2897 -249 2874.0 -241.5Q2851 -234 2824 -213ZM2965 112Q2925 112 2905.5 86.0Q2886 60 2886 26Q2886 -11 2904.0 -44.5Q2922 -78 2951.0 -108.0Q2980 -138 3012 -162L3030 -149Q2996 -122 2968.5 -85.5Q2941 -49 2941 -19Q2941 7 2965 21Q2977 -1 2999 -1Q3016 -1 3026.0 11.0Q3036 23 3036 43Q3036 67 3017.5 89.5Q2999 112 2965 112ZM3222 -81V-455Q3222 -489 3224.0 -512.5Q3226 -536 3231.0 -557.0Q3236 -578 3246.5 -603.0Q3257 -628 3275 -664L3291 -659L3286 -325Q3285 -255 3273.0 -194.5Q3261 -134 3241 -81ZM3349 15 3341 -11 3437 -67Q3504 -106 3541 -136Q3554 -147 3562.0 -159.0Q3570 -171 3570 -179Q3570 -190 3564.5 -197.0Q3559 -204 3555 -204Q3551 -200 3535.0 -189.5Q3519 -179 3489 -179Q3464 -179 3440.5 -195.0Q3417 -211 3417 -257L3471 -410Q3482 -419 3495.0 -423.0Q3508 -427 3518 -427Q3559 -427 3584.0 -384.5Q3609 -342 3609 -271Q3609 -226 3596.5 -181.5Q3584 -137 3565.5 -100.0Q3547 -63 3529 -39Q3514 -19 3502.5 -13.5Q3491 -8 3468 -4ZM3778 140Q3774 140 3769.5 139.5Q3765 139 3760 138Q3720 127 3700.5 104.5Q3681 82 3681 61Q3681 43 3690.5 28.5Q3700 14 3707 5L3744 -43H3749Q3764 -17 3785.0 -1.0Q3806 15 3839 22Q3857 25 3857 37Q3857 44 3849 55L3799 128Q3794 135 3789.5 137.5Q3785 140 3778 140ZM3579 -211V-306Q3609 -306 3649.0 -322.5Q3689 -339 3730.5 -372.0Q3772 -405 3806 -454Q3785 -465 3764.0 -480.0Q3743 -495 3720.0 -506.5Q3697 -518 3672 -518Q3652 -518 3637.5 -508.5Q3623 -499 3594 -466L3571 -483Q3600 -536 3623.5 -562.0Q3647 -588 3667.5 -596.5Q3688 -605 3710 -605Q3736 -605 3759.0 -593.5Q3782 -582 3804.0 -567.0Q3826 -552 3848.5 -540.5Q3871 -529 3894 -529Q3920 -529 3950 -549L3968 -529L3927 -482Q3907 -459 3888.0 -450.5Q3869 -442 3847 -442H3846Q3808 -368 3762.0 -316.5Q3716 -265 3668.5 -238.0Q3621 -211 3579 -211Z' };
  const sprite = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="calli" viewBox="${CALLI.vb}"><path d="${CALLI.d}"/></symbol>
    <linearGradient id="goldText" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8A6624"/><stop offset=".28" stop-color="#C9A04E"/><stop offset=".45" stop-color="#EBD08E"/>
      <stop offset=".5" stop-color="#FFF4D2"/><stop offset=".55" stop-color="#EBD08E"/><stop offset=".72" stop-color="#C9A04E"/><stop offset="1" stop-color="#8A6624"/>
      <animateTransform id="shimmer" attributeName="gradientTransform" type="translate" from="-1 0" to="0 0" dur="2.6s" begin="indefinite" fill="freeze"/>
    </linearGradient>
    <symbol id="i-insta" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></g></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="M5 3.5h3.2l1.6 4-2 1.3a11 11 0 0 0 7.4 7.4l1.3-2 4 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.2 1.6 1.6 0 0 1 5 3.5z"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-6.5-6-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.4"/></g></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></g></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" d="M4 8h16M4 16h16"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></symbol>
    <symbol id="i-left" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M14.5 6l-6 6 6 6"/></symbol>
    <symbol id="i-right" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M9.5 6l6 6-6 6"/></symbol>
    <symbol id="i-orn" viewBox="0 0 72 14"><g fill="none" stroke="currentColor" stroke-width="1"><path d="M0 7h26M46 7h26"/><path d="M36 1l6 6-6 6-6-6z"/><circle cx="36" cy="7" r="1.6" fill="currentColor"/></g></symbol>
  </svg>`;
  document.body.insertAdjacentHTML('afterbegin', sprite);

  // ---------- Header ----------
  const page = document.body.dataset.page || '';
  const nav = [
    ['collection.html', 'کلکسیون', 'collection'],
    ['secondhand.html', 'طلای دست دوم', 'secondhand'],
    ['about.html', 'درباره ما و تماس', 'about'],
  ];
  const headerEl = $('[data-header]');
  if (headerEl) {
    headerEl.outerHTML = `
    <a class="skip" href="#main">رفتن به محتوا</a>
    <header class="site-header" id="site-header">
      <div class="wrap">
        <nav class="nav" aria-label="منوی اصلی">
          ${nav.map(([href, label, id]) => `<a href="${href}"${page === id ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
        <button class="icon-btn menu-btn" aria-label="باز کردن منو" data-open-menu><svg aria-hidden="true"><use href="#i-menu"/></svg></button>
        <a class="logo" href="index.html" aria-label="${esc(S.name)} — صفحه اصلی"><img src="${esc(logoSrc)}" alt=""></a>
        <div class="header-tools">
          <a class="icon-btn" href="${links.insta}" target="_blank" rel="noopener" aria-label="اینستاگرام"><svg aria-hidden="true"><use href="#i-insta"/></svg></a>
          <a class="icon-btn hide-m" href="${links.tel}" aria-label="تماس"><svg aria-hidden="true"><use href="#i-phone"/></svg></a>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="top">
        <svg class="wordmark" style="height:34px;aspect-ratio:3958/2045;fill:var(--gold-light)" aria-hidden="true"><use href="#calli"/></svg>
        <button class="icon-btn" aria-label="بستن منو" data-close-menu><svg aria-hidden="true"><use href="#i-close"/></svg></button>
      </div>
      <nav aria-label="منوی موبایل">
        <a href="index.html">خانه</a>
        ${nav.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}
      </nav>
      <div class="contact">
        <a href="${links.tel}">${esc(S.phoneDisplay)}</a>
        <a href="${links.insta}" target="_blank" rel="noopener" dir="ltr" style="text-align:right">@${esc(S.instagram)}</a>
        <span>${esc(S.hours)}</span>
      </div>
    </div>`;
  }
  const header = $('#site-header');
  const darkTop = document.body.classList.contains('dark-top');
  if (!darkTop) document.body.classList.add('light-top');
  const onScroll = () => header && header.classList.toggle('solid', !darkTop || scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const menu = $('#mobile-menu');
  const openMenu = open => {
    if (!menu) return;
    menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('[data-close-menu]', menu).focus();
  };
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-menu]')) openMenu(true);
    if (e.target.closest('[data-close-menu]')) openMenu(false);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu && menu.classList.contains('open')) openMenu(false); });

  // ---------- Footer ----------
  const footerEl = $('[data-footer]');
  if (footerEl) {
    footerEl.outerHTML = `
    <footer class="site-footer" id="contact">
      <svg class="foot-giant" aria-hidden="true"><use href="#calli"/></svg>
      <div class="wrap">
        <div class="foot-top">
          <div class="foot-brand">
            <img src="${esc(logoSrc)}" alt="${esc(S.name)}">
            <p>تأسیس ${esc(S.since)}</p>
          </div>
          <div>
            <h4>فروشگاه</h4>
            <ul>
              <li><a href="collection.html">همه کلکسیون</a></li>
              ${CATS.slice(0, 5).map(c => `<li><a href="${links.collection(c.id)}">${esc(c.name)}</a></li>`).join('')}
              <li><a href="secondhand.html">طلای دست دوم</a></li>
            </ul>
          </div>
          <div>
            <h4>نشانی و ساعت کاری</h4>
            <ul class="foot-contact">
              <li><svg aria-hidden="true"><use href="#i-pin"/></svg><span>${esc(S.address)}</span></li>
              <li><svg aria-hidden="true"><use href="#i-clock"/></svg><span>${esc(S.hours)}</span></li>
              <li><svg aria-hidden="true"><use href="#i-pin"/></svg><a href="${links.map}" target="_blank" rel="noopener">مسیریابی روی نقشه</a></li>
            </ul>
          </div>
          <div>
            <h4>در تماس باشید</h4>
            <ul class="foot-contact">
              <li><svg aria-hidden="true"><use href="#i-phone"/></svg><a href="${links.tel}">${esc(S.phoneDisplay)}</a></li>
              <li><svg aria-hidden="true"><use href="#i-insta"/></svg><a href="${links.insta}" target="_blank" rel="noopener" dir="ltr">@${esc(S.instagram)}</a></li>
              <li><svg aria-hidden="true"><use href="#i-insta"/></svg><a href="${links.dm}" target="_blank" rel="noopener">پیام در دایرکت</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom"><span>${esc(S.name)}</span><span>قیمت‌ها بر اساس نرخ روز طلا</span></div>
      </div>
    </footer>`;
  }

  // ---------- Cards ----------
  function card(p, i, kind) {
    const href = kind === 'u' ? links.used(i) : links.product(i);
    const bits = [];
    if (p.karat) bits.push(`<span>${esc(p.karat)} عیار</span>`);
    if (p.weight) bits.push(`<span>${esc(p.weight)} گرم</span>`);
    if (!bits.length && p.note) bits.push(`<span>${esc(p.note)}</span>`);
    const badge = kind === 'u'
      ? (p.sold ? '<span class="badge sold">فروخته شد</span>' : '<span class="badge">دست دوم</span>')
      : '';
    return `<a class="card${p.sold ? ' sold' : ''}" href="${href}">
      <div class="media">${badge}<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></div>
      <h3>${esc(p.name)}</h3>
      <div class="meta">${bits.join('')}</div>
      <span class="more">مشاهده جزئیات</span>
    </a>`;
  }

  // ---------- Carousels ----------
  function wireRail(root) {
    const rail = $('.rail', root), prev = $('[data-prev]', root), next = $('[data-next]', root);
    if (!rail || !prev || !next) return;
    const step = () => rail.clientWidth * 0.8;
    // RTL: scrollLeft runs from 0 (start, right) to negative values (end, left)
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth, x = Math.abs(rail.scrollLeft);
      prev.disabled = x < 4; next.disabled = x > max - 4;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: step() }));
    next.addEventListener('click', () => rail.scrollBy({ left: -step() }));
    rail.addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    // drag to scroll with a mouse
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.style.scrollSnapType = 'none'; rail.style.scrollBehavior = 'auto'; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) moved = true; rail.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; rail.style.scrollSnapType = ''; rail.style.scrollBehavior = ''; });
    rail.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  }

  // ---------- Reveal on scroll ----------
  function observeReveals(root = document) {
    const els = $$('.reveal, .fade', root);
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    els.forEach(e => io.observe(e));
  }

  // ---------- Parallax (editorial images) ----------
  function parallax() {
    const els = $$('[data-parallax]');
    if (reduceMotion || !els.length) return;
    let ticking = false;
    const run = () => {
      els.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.transform = `translate3d(0, ${(-p * 9 - 8).toFixed(2)}%, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  // ---------- Fill simple data bindings ----------
  $$('[data-bind]').forEach(el => { const v = S[el.dataset.bind]; if (v != null) el.textContent = v; });
  $$('[data-href]').forEach(el => { const v = links[el.dataset.href]; if (typeof v === 'string') el.href = v; });

  window.GJ = { S, CATS, PRODUCTS, USED, links, catName, card, esc, $, $$, wireRail, observeReveals, parallax, reduceMotion };
  document.addEventListener('DOMContentLoaded', () => { observeReveals(); parallax(); $$('[data-rail]').forEach(wireRail); });
})();
