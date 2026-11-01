/* Landing doors (Fran, 2026-10-31): clicking a door opens a panel right under the doors with a brief
   explainer, then that door's inquiry form. Clicking another door swaps the panel; the same door closes it.
   Draft only: nothing is sent. Wording comes from the site and from Fran. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const panel = $('#doorPanel');
  if (!panel) return;

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
    <div class="foot">
      <p class="fine">Draft form: nothing is sent yet. On the live site this goes to Fran, then you pick a time for a call.</p>
      <button class="btn btn-blue" type="submit"><span class="ico">→</span> ${label}</button>
    </div>
    <div class="done" hidden><h4 class="display">Thank you</h4><p>On the live site, Fran gets your details now and you pick a time for a call. This draft sends nothing.</p><button class="btn btn-ghost" type="button" data-reset>Start over</button></div>`;
  const repPay = 'Reps earn subscription and referral commissions, plus gross margin on resale items, on the customers they bring in from their state. Commissions are paid electronically every month.';

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
      tone: 'dist', eyebrow: 'Master Agents', title: 'Statewide Master Agent',
      explain: `<p>Recruiter and director of Agents and Influencers in your state.</p><p>${repPay}</p>`,
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
        <p>Every company in our portfolio is open to smart money. Smart money can also be regional: investors in a company's own market, reached through our regional investor network across the West, Central and East regions.</p>`,
      form: `
        <div class="row2">
          <label class="f"><span>Region</span>${regionSel}</label>
          <label class="f"><span>Company or firm</span><input name="company" autocomplete="organization"></label>
        </div>
        ${contact}
        <label class="f"><span>Companies or industries that interest you</span><textarea name="interest" rows="3"></textarea></label>
        ${foot('Request a call with Fran')}`
    }
  };

  let open = '';
  const close = () => {
    open = ''; panel.hidden = true; panel.innerHTML = '';
    $$('.doors4 [data-door]').forEach(a => { a.classList.remove('on'); a.setAttribute('aria-expanded', 'false'); });
  };

  const show = key => {
    const d = doors[key];
    open = key;
    $$('.doors4 [data-door]').forEach(a => { const on = a.dataset.door === key; a.classList.toggle('on', on); a.setAttribute('aria-expanded', String(on)); });
    panel.className = `door-panel dp-${d.tone}`;
    panel.innerHTML = `
      <button class="dp-x" type="button" aria-label="Close">×</button>
      <div class="dp-explain">
        <span class="eyebrow${d.tone === 'cap' ? ' blue' : ''}">${d.eyebrow}</span>
        <h3 class="dp-title">${d.title}</h3>
        ${d.explain}
      </div>
      <div class="form-dlg dp-form"><form novalidate>
        <span class="eyebrow${d.tone === 'cap' ? ' blue' : ''}">Inquiry</span>
        ${d.form}
      </form></div>`;
    panel.hidden = false;

    const form = $('form', panel);
    $('.dp-x', panel).addEventListener('click', close);
    $$('[data-reset]', panel).forEach(b => b.addEventListener('click', () => {
      form.reset(); $('.done', form).hidden = true;
      $$('.foot, fieldset, .row2, form > .f', form).forEach(el => el.hidden = false);
    }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const missing = $$('[required]', form).filter(el => !el.value.trim() || (el.type === 'email' && !el.checkValidity()));
      $$('.bad', form).forEach(el => el.classList.remove('bad'));
      if (missing.length) { missing.forEach(el => el.closest('.f').classList.add('bad')); missing[0].focus(); return; }
      $$('.foot, fieldset, .row2, form > .f', form).forEach(el => el.hidden = true);
      $('.done', form).hidden = false;
    });
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  $$('.doors4 [data-door]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    a.dataset.door === open ? close() : show(a.dataset.door);
  }));
})();
