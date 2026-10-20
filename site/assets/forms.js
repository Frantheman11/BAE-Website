/* Round four (2026-10-19): sign-up forms for reps and for participating companies.
   Draft only: nothing is sent. On the live site these post to Fran's CRM (Custom Tailored Agents)
   and then open Fran's calendar. Screening happens on the call, not on the website. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const states = (window.US_STATES || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const regionName = { west: 'West', central: 'Central', east: 'East' };

  const stateOptions = states.map(s => `<option value="${s.code}">${s.name}</option>`).join('');

  const rep = `
  <section class="signup signup-reps" id="signup-reps" aria-labelledby="repTitle"><div class="wrap"><div class="form-dlg" id="repForm">
    <form novalidate>
      <span class="eyebrow">Rep sign-up</span>
      <h2 id="repTitle" class="h2 display">Master agents, professional agents and social network agents: sign up</h2>
      <p class="lead">Tell us who you are and the seat you want. Fran screens every rep on a call.</p>

      <fieldset><legend>I am a <small>(pick any)</small></legend>
        <div class="chips">
          <label><input type="checkbox" name="kind" value="salesperson"><span>Salesperson</span></label>
          <label><input type="checkbox" name="kind" value="influencer"><span>Influencer</span></label>
          <label><input type="checkbox" name="kind" value="agent"><span>Agent</span></label>
        </div>
      </fieldset>

      <fieldset><legend>The seat I want</legend>
        <div class="seats">
          <label><input type="radio" name="seat" value="regional-director"><span><b>Regional director</b><small>Leads a region: West, Central or East</small></span></label>
          <label><input type="radio" name="seat" value="master-agent"><span><b>Master agent</b><small>Heads one state</small></span></label>
          <label><input type="radio" name="seat" value="network-agent" checked><span><b>Network agent</b><small>Sells under a state's master agent</small></span></label>
        </div>
      </fieldset>

      <div class="row2">
        <label class="f"><span>State</span><select name="state" required><option value="">Choose a state</option>${stateOptions}</select><small class="region-hint" aria-live="polite"></small></label>
        <label class="f"><span>Years in sales</span><select name="years"><option value="">Choose</option><option>Under 2</option><option>2 to 5</option><option>5 to 10</option><option>10 or more</option></select></label>
      </div>
      <div class="row2">
        <label class="f"><span>Full name</span><input name="name" autocomplete="name" required></label>
        <label class="f"><span>Phone</span><input name="phone" type="tel" autocomplete="tel"></label>
      </div>
      <label class="f"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="f"><span>What you sell today</span><input name="sells" placeholder="Products, services or industries"></label>
      <div class="row2">
        <label class="f"><span>Main social platform</span><select name="platform"><option value="">Choose</option><option>LinkedIn</option><option>Instagram</option><option>Facebook</option><option>YouTube</option><option>TikTok</option><option>X</option><option>Other</option></select></label>
        <label class="f"><span>Your handle or page</span><input name="handle" placeholder="@yourname"></label>
      </div>
      <label class="f"><span>Who you know in your market</span><textarea name="network" rows="3" placeholder="Industries, companies, associations, trade shows"></textarea></label>

      <div class="foot">
        <p class="fine">Draft form: nothing is sent yet. On the live site this goes to Fran, then you pick a time on his calendar.</p>
        <button class="btn btn-blue" type="submit"><span class="ico">→</span> Request a call with Fran</button>
      </div>
      <div class="done" hidden><h4 class="display">Thank you</h4><p>On the live site, Fran gets your details now and you pick a time for your call. This draft sends nothing.</p><button class="btn btn-ghost" type="button" data-reset>Start over</button></div>
    </form>
  </div></div></section>`;

  const company = `
  <section class="signup signup-companies" id="signup-companies" aria-labelledby="coTitle"><div class="wrap"><div class="form-dlg" id="coForm">
    <form novalidate>
      <span class="eyebrow blue">Company sign-up</span>
      <h2 id="coTitle" class="h2 display">Companies seeking participation</h2>
      <p class="lead">For founders with an innovative product who want a channel, capital or both.</p>

      <div class="row2">
        <label class="f"><span>Company name</span><input name="company" autocomplete="organization" required></label>
        <label class="f"><span>Website</span><input name="website" type="url" placeholder="https://"></label>
      </div>
      <label class="f"><span>What you make or sell</span><textarea name="product" rows="2" required></textarea></label>
      <div class="row2">
        <label class="f"><span>Stage</span><select name="stage"><option value="">Choose</option><option>Idea</option><option>Product built, early customers</option><option>Growing revenue</option><option>Established</option></select></label>
        <label class="f"><span>State</span><select name="state"><option value="">Choose a state</option>${stateOptions}</select></label>
      </div>

      <fieldset><legend>What you need most <small>(pick any)</small></legend>
        <div class="chips">
          <label class="c-red"><input type="checkbox" name="need" value="foundership"><span>Foundership</span></label>
          <label class="c-blue"><input type="checkbox" name="need" value="capital"><span>Capital</span></label>
          <label class="c-ink"><input type="checkbox" name="need" value="management"><span>Management</span></label>
          <label><input type="checkbox" name="need" value="distribution"><span>Distribution</span></label>
        </div>
      </fieldset>

      <div class="row2">
        <label class="f"><span>Your name</span><input name="name" autocomplete="name" required></label>
        <label class="f"><span>Your title</span><input name="title" placeholder="Founder, CEO"></label>
      </div>
      <div class="row2">
        <label class="f"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="f"><span>Phone</span><input name="phone" type="tel" autocomplete="tel"></label>
      </div>
      <label class="f"><span>Anything else</span><textarea name="note" rows="2"></textarea></label>

      <div class="foot">
        <p class="fine">Draft form: nothing is sent yet. On the live site this goes to Fran, then you pick a time on his calendar.</p>
        <button class="btn btn-blue" type="submit"><span class="ico">→</span> Request a call with Fran</button>
      </div>
      <div class="done" hidden><h4 class="display">Thank you</h4><p>On the live site, Fran gets your company details now and you pick a time for a call. This draft sends nothing.</p><button class="btn btn-ghost" type="button" data-reset>Start over</button></div>
    </form>
  </div></div></section>`;

  // Each form is its own section: reps close the Distribution half, companies follow the portfolio
  ($('#join') || document.body).insertAdjacentHTML('afterend', rep);
  ($('#portfolio') || document.body).insertAdjacentHTML('afterend', company);

  const setup = dlg => {
    const form = $('form', dlg);
    const reset = () => { form.reset(); $('.done', dlg).hidden = true; $$('.foot, fieldset, .row2, .f', form).forEach(el => el.hidden = false); $$('.bad', form).forEach(el => el.classList.remove('bad')); const h = $('.region-hint', dlg); if (h) h.textContent = ''; };
    $$('[data-reset]', dlg).forEach(b => b.addEventListener('click', reset));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const missing = $$('[required]', form).filter(el => !el.value.trim() || (el.type === 'email' && !el.checkValidity()));
      $$('.bad', form).forEach(el => el.classList.remove('bad'));
      if (missing.length) { missing.forEach(el => el.closest('.f').classList.add('bad')); missing[0].focus(); return; }
      $$('.foot, fieldset, .row2, form > .f', form).forEach(el => el.hidden = true);
      $('.done', dlg).hidden = false;
    });
  };
  const repDlg = $('#repForm'), coDlg = $('#coForm');
  setup(repDlg); setup(coDlg);

  const hint = $('.region-hint', repDlg);
  $('select[name="state"]', repDlg).addEventListener('change', e => {
    const s = states.find(x => x.code === e.target.value);
    hint.textContent = s ? `${regionName[s.region] || ''} region` : '';
  });

  // The map remembers the state last clicked, through the "Sign up for <State>" button text
  const stateFromCta = () => {
    const t = ($('#spCta') || {}).textContent || '';
    const m = t.match(/^Sign up for (.+)$/);
    return m ? (states.find(s => s.name === m[1]) || {}).code : '';
  };

  // Sign-up buttons scroll to the sections instead of opening the old "on the live site" notes
  // (capture phase runs before bae.js)
  const go = (sec, field) => { const close = $('#menuClose'); if (close && close.offsetParent) close.click(); sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => field && field.focus({ preventScroll: true }), 600); };
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-note="rep"], [data-note="apply"], a[href="#signup-reps"], a[href="#signup-companies"]');
    if (!el) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (el.dataset.note === 'rep' || el.getAttribute('href') === '#signup-reps') {
      const code = el.querySelector('#spCta') ? stateFromCta() : '';
      if (code) { const sel = $('select[name="state"]', repDlg); sel.value = code; sel.dispatchEvent(new Event('change')); }
      go($('#signup-reps'), $('input[name="kind"]', repDlg));
    } else {
      go($('#signup-companies'), $('input[name="company"]', coDlg));
    }
  }, true);
})();
