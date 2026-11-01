/* Basic American Enterprises concept site. No backend, no forms, nothing sends. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Clock (Pacific time, like the template's city + time)
  const clock = $('#clock');
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' }) + ' PT'; };
  tick(); setInterval(tick, 30000);

  // Nav turns solid after the hero
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  // Menu overlay
  const overlay = $('#overlay');
  $('#menuOpen').addEventListener('click', () => overlay.classList.add('open'));
  $('#menuClose').addEventListener('click', () => overlay.classList.remove('open'));
  $$('a', overlay).forEach(a => a.addEventListener('click', () => overlay.classList.remove('open')));
  addEventListener('keydown', e => { if (e.key === 'Escape') overlay.classList.remove('open'); });

  // Hero headline: words arrive in a stagger, blur to sharp
  const h1 = $('#heroLine');
  const words = h1.textContent.trim().split(/\s+/);
  h1.innerHTML = words.map((w, i) => `<span class="w" style="animation-delay:${0.15 + i * 0.045}s">${w}</span>`).join(' ');

  // Reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.rv, .rv-kids').forEach(el => io.observe(el));

  // Map: the page's feature. Three regions; states pop on hover (Fran wants the movement his
  // current map has); a click lists that state's reps (names only) and offers the sign-up.
  // REPS is empty on purpose: every state is open today. Add names as Fran signs people,
  // e.g. REPS.WI = ['Joe Schmo (master)'].
  const REGION = {
    west: { name: 'West', office: 'Long Beach, California' },
    central: { name: 'Central', office: 'Austin, Texas' },
    east: { name: 'East', office: 'Philadelphia, Pennsylvania' },
  };
  const REPS = {};
  const STATES = window.US_STATES || [];
  const svg = $('#usSvg');
  const tip = $('#mapTip');
  const ns = 'http://www.w3.org/2000/svg';
  STATES.forEach(s => {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', s.d); p.setAttribute('class', s.region); p.dataset.code = s.code;
    p.setAttribute('tabindex', '0'); p.setAttribute('role', 'button'); p.setAttribute('aria-label', s.name);
    p.addEventListener('click', () => selectState(s));
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectState(s); } });
    // Raise the hovered state above its neighbours so the pop is not clipped
    // (moving a node drops :hover, so the pop is a class set here, not a CSS :hover)
    p.addEventListener('mouseenter', e => { svg.appendChild(p); p.classList.add('hov'); showTip(s); moveTip(e); });
    p.addEventListener('mousemove', moveTip);
    p.addEventListener('mouseleave', () => { p.classList.remove('hov'); tip.classList.remove('on'); });
    svg.appendChild(p);
  });
  const count = code => (REPS[code] || []).length;
  function showTip(s) {
    const n = count(s.code);
    tip.innerHTML = `<b>${s.name}</b><span>${REGION[s.region].name} region · ${n ? n + ' rep' + (n > 1 ? 's' : '') : 'Open territory'}</span>`;
    tip.classList.add('on');
  }
  function moveTip(e) {
    const box = svg.parentElement.getBoundingClientRect();
    let x = e.clientX - box.left + 14, y = e.clientY - box.top + 14;
    x = Math.min(x, box.width - tip.offsetWidth - 8);
    tip.style.transform = `translate(${x}px, ${y}px)`;
  }
  const listReps = (names, empty) => {
    $('#spReps').innerHTML = names.length ? names.map(n => `<li>${n}</li>`).join('') : `<li class="empty">${empty}</li>`;
  };
  let active = null;
  const selectState = s => {
    $$('path', svg).forEach(p => p.classList.toggle('active', p.dataset.code === s.code));
    $$('.regions button').forEach(b => b.classList.toggle('active', b.dataset.region === s.region));
    active = s;
    const r = REGION[s.region];
    $('.tag', $('#statePanel')).textContent = r.name + ' region';
    $('#spName').textContent = s.name;
    $('#spRegion').innerHTML = `<span class="dot ${s.region}"></span>${r.name}`;
    $('#spOffice').textContent = r.office;
    $('#spLead').textContent = 'Open';
    $('#spRepsLabel').textContent = `Reps in ${s.name}`;
    listReps(REPS[s.code] || [], 'Open territory. Be the first.');
    $('#spNote').textContent = `${s.name} needs a Master Agent, with Agents and Influencers under them across the state. The Master Agent sees every ${s.name} lead.`;
    $('#spCta').textContent = `Sign up for ${s.name}`;
    $('#statePanel').classList.remove('flash'); void $('#statePanel').offsetWidth; $('#statePanel').classList.add('flash');
  };
  $$('.regions button').forEach(b => b.addEventListener('click', () => {
    const region = b.dataset.region, r = REGION[region];
    $$('path', svg).forEach(p => p.classList.toggle('active', p.classList.contains(region)));
    $$('.regions button').forEach(x => x.classList.toggle('active', x === b));
    active = null;
    const inRegion = STATES.filter(s => s.region === region);
    const named = inRegion.flatMap(s => (REPS[s.code] || []).map(n => `${n}, ${s.code}`));
    $('.tag', $('#statePanel')).textContent = 'Region';
    $('#spName').textContent = r.name;
    $('#spRegion').innerHTML = `<span class="dot ${region}"></span>${r.name}`;
    $('#spOffice').textContent = r.office;
    $('#spLead').textContent = 'Open';
    $('#spRepsLabel').textContent = `Reps in the ${r.name}`;
    listReps(named, `All ${inRegion.length} states open. Be the first.`);
    $('#spNote').textContent = `A Master Distributor runs the ${r.name} from ${r.office.split(',')[0]}, with a Master Agent in each of its ${inRegion.length} states. Click a state.`;
    $('#spCta').textContent = `Sign up in the ${r.name}`;
  }));

  // Dialog instead of forms: says what the real site would do
  const NOTES = {
    rep: ['Sign up as a rep', 'On the live site this opens the rep sign-up: your name, your state, your market, what you sell today and who you know. It lands in Fran’s CRM, tagged to your state, and you pick a time on his calendar. Screening happens on the call.'],
  };
  const dlg = $('#note');
  $$('[data-note]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    const [t, b] = NOTES[el.dataset.note];
    $('#noteTitle').textContent = t; $('#noteBody').textContent = b; dlg.showModal();
  }));
  $('#noteClose').addEventListener('click', () => dlg.close());
})();
