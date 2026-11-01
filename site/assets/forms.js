/* Round four (2026-10-19): sign-up forms for reps and for participating companies.
   Draft only: nothing is sent. On the live site these post to Fran's CRM (Custom Tailored Agents)
   and then open Fran's calendar. Screening happens on the call, not on the website. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const states = (window.US_STATES || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const regionName = { west: 'West', central: 'Central', east: 'East' };

  const stateOptions = states.map(s => `<option value="${s.code}">${s.name}</option>`).join('');

  // The rep sign-up section was removed (Fran, 2026-10-31): rep buttons open a landing door panel instead (doors.js)

  const company = `
  <section class="signup signup-companies" id="signup-companies" aria-labelledby="coTitle"><div class="wrap"><div class="form-dlg" id="coForm">
    <form novalidate>
      <span class="eyebrow blue">Company sign-up</span>
      <h2 id="coTitle" class="h2 display">Companies seeking participation</h2>
      <p class="lead">For founders who want a channel, need to raise capital, or both.</p>

      <div class="row2">
        <label class="f"><span>Company name</span><input name="company" autocomplete="organization" required></label>
        <label class="f"><span>Website</span><input name="website" type="url" placeholder="https://"></label>
      </div>
      <label class="f"><span>What you make or sell</span><input name="product" required></label>
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
      <label class="f"><span>Anything else</span><input name="note"></label>

      <div class="foot">
        <p class="fine">Draft form: nothing is sent yet. On the live site this goes to Fran, then you pick a time on his calendar.</p>
        <button class="btn btn-blue" type="submit"><span class="ico">→</span> Request a call with Fran</button>
      </div>
      <div class="done" hidden><h4 class="display">Thank you</h4><p>On the live site, Fran gets your company details now and you pick a time for a call. This draft sends nothing.</p><button class="btn btn-ghost" type="button" data-reset>Start over</button></div>
    </form>
  </div></div></section>`;

  // The company form is its own section, after the #portfolio anchor (the Portfolio grid itself was removed)
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
  const coDlg = $('#coForm');
  setup(coDlg);

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
      // The map's button: a state opens Master Agents with that state picked, a region opens Master Distributors
      // with that region picked; other rep links open Agents
      const close = $('#menuClose'); if (close && close.offsetParent) close.click();
      const cta = el.querySelector('#spCta');
      const region = cta && (cta.textContent.match(/^Sign up in the (West|Central|East)$/) || [])[1];
      const code = cta && !region ? stateFromCta() : '';
      if (window.BAEdoors) window.BAEdoors.open(region ? 'md' : cta ? 'ma' : 'ag', { state: code, region });
    } else {
      go($('#signup-companies'), $('input[name="company"]', coDlg));
    }
  }, true);
})();
