/* Landing doors (Fran, 2026-10-31; own pages 2026-11-01): each door opens its own page at its own address
   (#master-distributors, #master-agents, #agents, #investors) with a brief explainer, then that door's
   inquiry form. Forms are sent to Fran by send.js (Web3Forms + hCaptcha). Wording comes from the site and from Fran. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  if (!$('#doorPage')) return;

  const states = (window.US_STATES || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const stateSel = `<select name="state" required><option value="">Choose a state</option>${states.map(s => `<option value="${s.code}">${s.name}</option>`).join('')}</select>`;
  const regionSel = `<select name="region" required><option value="">Choose a region</option><option>West</option><option>Central</option><option>East</option></select>`;
  const contact = `
    <div class="row2">
      <label class="f"><span>Full name</span><input name="name" autocomplete="name" required></label>
      <label class="f"><span>Phone</span><input name="phone" type="tel" autocomplete="tel"></label>
    </div>
    <label class="f"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>`;
  const foot = label => `
    ${window.BAEsend ? window.BAEsend.extras() : ''}
    <div class="foot">
      <p class="fine">Your details go to Fran McGrath by email.</p>
      <button class="btn btn-blue" type="submit"><span class="ico">→</span> ${label}</button>
    </div>
    <div class="done" hidden><h4 class="display">Thank you</h4><p>Your details are on their way to Fran.</p><button class="btn btn-ghost" type="button" data-reset>Start over</button></div>`;
  const repPay = 'Reps earn subscription and referral commissions, plus gross margin on resale items, on the customers they bring in. Commissions are paid electronically every month.';

  const doors = {
    md: {
      tone: 'dist', eyebrow: 'Master Distributors', title: 'Head a region',
      explain: `<p>One Master Distributor for each of our three regions: West, Central and East.</p>
        <ul class="dp-qs">
          <li>Are you presently in syndicated investment projects?</li>
          <li>Do you have dealers and distributors throughout one of our three main regions?</li>
          <li>Do you have interest in participating in the high growth, high intelligence of Basic American?</li>
        </ul>`,
      form: `
        <fieldset><legend>Your answers <small>(pick any that apply)</small></legend>
          <div class="chips">
            <label><input type="checkbox" name="yes" value="syndicated"><span>In syndicated investment projects</span></label>
            <label><input type="checkbox" name="yes" value="dealers"><span>Dealers and distributors in a region</span></label>
            <label class="c-red"><input type="checkbox" name="yes" value="interest"><span>Interested in Basic American</span></label>
          </div>
        </fieldset>
        <div class="row2">
          <label class="f"><span>Region</span>${regionSel}</label>
          <label class="f"><span>Company</span><input name="company" autocomplete="organization"></label>
        </div>
        ${contact}
        <label class="f"><span>Your dealers and distributors</span><textarea name="network" rows="3" placeholder="Who they are and where"></textarea></label>
        ${foot('Request a call with Fran')}`
    },
    ma: {
      tone: 'dist', eyebrow: 'Master Agents', title: 'Statewide recruiter and director of Agents and Influencers',
      explain: `<p>${repPay}</p>`,
      form: `
        <div class="row2">
          <label class="f"><span>State</span>${stateSel}</label>
          <label class="f"><span>Years in sales</span><select name="years"><option value="">Choose</option><option>Under 2</option><option>2 to 5</option><option>5 to 10</option><option>10 or more</option></select></label>
        </div>
        ${contact}
        <label class="f"><span>Who you know in your market</span><textarea name="network" rows="3" placeholder="Industries, companies, associations, trade shows"></textarea></label>
        ${foot('Request a call with Fran')}`
    },
    ag: {
      tone: 'dist', eyebrow: 'Agents', title: 'Professional and social network agents',
      explain: `<p>Sell face to face in your own state, online to the people who already follow you, or both. Our Studio writes and schedules your social media under your name.</p><p>${repPay}</p>`,
      form: `
        <fieldset><legend>I want to be a</legend>
          <div class="seats seats2">
            <label><input type="radio" name="seat" value="professional-agent" checked><span><b>Professional agent</b><small>Sells face to face: meetings, handshakes, trade shows</small></span></label>
            <label><input type="radio" name="seat" value="social-network-agent"><span><b>Social network agent</b><small>Sells through your social media following</small></span></label>
          </div>
        </fieldset>
        <label class="f"><span>State</span>${stateSel}</label>
        ${contact}
        <div class="row2">
          <label class="f"><span>Main social platform</span><select name="platform"><option value="">Choose</option><option>LinkedIn</option><option>Instagram</option><option>Facebook</option><option>YouTube</option><option>TikTok</option><option>X</option><option>Other</option></select></label>
          <label class="f"><span>Your handle or page</span><input name="handle" placeholder="@yourname"></label>
        </div>
        ${foot('Request a call with Fran')}`
    },
    inv: {
      tone: 'cap', eyebrow: 'Strategic Investors', title: 'Smart money for smart American companies',
      explain: `<p>Smart money is investment from businesses whose interests line up with the company raising it.</p>
        <p>Every company we represent is open to smart money. Smart money can also be regional: investors in a company's own market, reached through our regional investor network across the West, Central and East regions.</p>`,
      form: `
        <div class="row2">
          <label class="f"><span>Region</span>${regionSel}</label>
          <label class="f"><span>Company or firm</span><input name="company" autocomplete="organization"></label>
        </div>
        ${contact}
        <fieldset class="accredited"><legend>Are you an accredited investor?</legend>
          <p class="acc-note">An accredited investor meets the SEC's income, net worth or professional tests for private investments. For individuals, that generally means a high income in each of the last two years, a high net worth not counting your home, or certain financial licenses. Firms can qualify too. We confirm status before any offering documents are shared.</p>
          <div class="chips">
            <label><input type="radio" name="accredited" value="yes"><span>Yes</span></label>
            <label><input type="radio" name="accredited" value="no"><span>No</span></label>
            <label><input type="radio" name="accredited" value="not-sure"><span>Not sure</span></label>
          </div>
        </fieldset>
        <label class="f"><span>Companies or industries that interest you</span><textarea name="interest" rows="3"></textarea></label>
        ${foot('Request a call with Fran')}`
    }
  };

  // The Capital half sits right under the doors, hidden until the Strategic Investors door opens it (Fran, 2026-10-31)
  const capital = $('#capitalPart'), invBox = $('#invForm');

  // Each form is sent to Fran by send.js (Web3Forms + hCaptcha); its name goes in the email subject
  const wire = (form, name) => {
    if (window.BAEsend) window.BAEsend.prepare(form);
    $$('[data-reset]', form).forEach(b => b.addEventListener('click', () => {
      form.reset(); $('.done', form).hidden = true;
      $$('.bad', form).forEach(el => el.classList.remove('bad'));
      $$('.foot, fieldset, .row2, form > .f, .h-captcha', form).forEach(el => el.hidden = false);
      if (window.BAEsend) window.BAEsend.reset(form);
    }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (window.BAEsend) window.BAEsend.handle(form, name);
    });
  };

  // Door pages (Fran, 2026-11-01): each door has its own address. Opening one hides the rest of the home
  // page; only that door's explainer and form show, under a "Back to home" link. The browser's Back
  // button returns home. Strategic Investors shows the Capital explanation, then the investor form.
  const page = $('#doorPage'), pageBody = $('#doorPageBody');
  const ROUTES = { 'master-distributors': 'md', 'master-agents': 'ma', 'agents': 'ag', 'investors': 'inv' };
  const HASH = Object.fromEntries(Object.entries(ROUTES).map(([h, k]) => [k, h]));
  let current = '';

  const buildInvestors = () => {
    if (invBox.firstChild) return;
    const d = doors.inv;
    invBox.innerHTML = `<form novalidate>
      <span class="eyebrow blue">${d.eyebrow}</span>
      <h2 class="h2 display">Investor inquiry</h2>
      ${d.form}
    </form>`;
    wire($('form', invBox), 'Strategic Investors inquiry');
  };

  const buildDoor = key => {
    const d = doors[key];
    pageBody.innerHTML = `
      <div class="door-panel dp-${d.tone}">
        <div class="dp-explain">
          <span class="eyebrow${d.tone === 'cap' ? ' blue' : ''}">${d.eyebrow}</span>
          <h1 class="dp-title">${d.title}</h1>
          ${d.explain}
        </div>
        <div class="form-dlg dp-form"><form novalidate>
          <span class="eyebrow${d.tone === 'cap' ? ' blue' : ''}">Inquiry</span>
          ${d.form}
        </form></div>
      </div>`;
    wire($('form', pageBody), d.eyebrow + ' inquiry');
  };

  const enter = key => {
    if (current !== key) {
      current = key;
      pageBody.innerHTML = '';
      if (key === 'inv') buildInvestors(); else buildDoor(key);
    }
    document.body.classList.add('door-mode');
    page.hidden = false;
    capital.hidden = key !== 'inv';
    document.title = `${doors[key].eyebrow} · Basic American Enterprises`;
    window.scrollTo(0, 0);
  };

  const leave = () => {
    const was = current;
    current = '';
    document.body.classList.remove('door-mode');
    page.hidden = true; pageBody.innerHTML = '';
    capital.hidden = true;
    document.title = homeTitle;
    return was;
  };

  const homeTitle = document.title;
  const route = () => {
    const name = decodeURIComponent(location.hash.slice(1));
    const key = ROUTES[name];
    if (key) return enter(key);
    const was = current && leave();
    const target = name && name !== 'top' && document.getElementById(name);
    if (target) target.scrollIntoView({ block: 'start' });
    else if (was) $('.doors4').scrollIntoView({ block: 'start' }); // back from a door page: land on the doors
    else if (name === 'top') window.scrollTo(0, 0);
  };
  window.addEventListener('hashchange', route);
  if (ROUTES[location.hash.slice(1)]) route();

  // Older "#capital" links (menu and footer "Smart money") go to the investors page
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href="#capital"]');
    if (!a) return;
    e.preventDefault();
    const x = $('#menuClose'); if (x && x.offsetParent) x.click();
    location.hash = 'investors';
  });

  // Rep buttons elsewhere on the page open a door page (forms.js), with a state or region picked when the map knows it
  window.BAEdoors = {
    open(key, { state, region } = {}) {
      if (location.hash.slice(1) === HASH[key]) route(); else location.hash = HASH[key];
      enter(key);
      const sel = state && $('select[name="state"]', pageBody);
      if (sel) sel.value = state;
      const reg = region && $('select[name="region"]', pageBody);
      if (reg) reg.value = region;
    }
  };
})();
