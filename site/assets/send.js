/* Form delivery (Fran, 2026-11-01): every form emails its entry to fran@basicamericanenterprises.com
   through Web3Forms, behind a visible hCaptcha check. Web3Forms' docs say the access key is public by
   design ("Access key is public"), so it lives here; it is not a secret. Nothing goes back to the
   person who filled in the form (Fran's rule: no correspondence without Fran's approval). */
(() => {
  const ACCESS_KEY = 'PASTE-WEB3FORMS-ACCESS-KEY';
  const SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'; // Web3Forms' hCaptcha sitekey for free plans
  const MIN_MS = 3000; // a person takes longer than this to fill in a form

  let loading;
  const loadCaptcha = () => loading || (loading = new Promise(resolve => {
    window.baeCaptchaReady = resolve;
    const s = document.createElement('script');
    s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&onload=baeCaptchaReady';
    s.async = true;
    document.head.appendChild(s);
  }));

  // Hidden fields every form carries: a bot trap and the captcha box
  const extras = () => `
    <label class="hp" aria-hidden="true">Leave this empty<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></label>
    <div class="h-captcha"></div>
    <p class="send-err" role="alert" hidden></p>`;

  const prepare = async form => {
    form.dataset.opened = Date.now();
    const box = form.querySelector('.h-captcha');
    if (!box || box.dataset.id) return;
    await loadCaptcha();
    box.dataset.id = window.hcaptcha.render(box, { sitekey: SITEKEY });
  };

  const reset = form => {
    const box = form.querySelector('.h-captcha');
    if (box && box.dataset.id && window.hcaptcha) window.hcaptcha.reset(box.dataset.id);
    form.dataset.opened = Date.now();
    const err = form.querySelector('.send-err'); if (err) err.hidden = true;
  };

  // Resolves to { ok, why }: why is 'captcha', 'setup' or 'failed' when ok is false
  const send = async (form, formName) => {
    const data = new FormData(form);
    if (data.get('botcheck') || Date.now() - (+form.dataset.opened || 0) < MIN_MS) return { ok: true }; // bot: drop quietly
    const box = form.querySelector('.h-captcha');
    const token = box && box.dataset.id && window.hcaptcha ? window.hcaptcha.getResponse(box.dataset.id) : '';
    if (!token) return { ok: false, why: 'captcha' };
    if (ACCESS_KEY.startsWith('PASTE')) return { ok: false, why: 'setup' };
    data.delete('botcheck');
    data.set('access_key', ACCESS_KEY);
    data.set('subject', `BAE website: ${formName}`);
    data.set('from_name', 'basicamericanenterprises.com');
    data.set('form', formName);
    data.set('h-captcha-response', token);
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      const j = await r.json();
      return j.success ? { ok: true } : { ok: false, why: 'failed' };
    } catch (e) {
      return { ok: false, why: 'failed' };
    } finally {
      if (box && box.dataset.id && window.hcaptcha) window.hcaptcha.reset(box.dataset.id);
    }
  };

  const message = why => ({
    captcha: 'Please tick the "I am human" box, then send again.',
    setup: 'This form is not connected yet. Please call 562-573-3200 or email fran@basicamericanenterprises.com.',
    failed: 'That did not go through. Please try again, or call 562-573-3200 or email fran@basicamericanenterprises.com.'
  })[why];

  // One submit routine for every form: check required fields, send, then show the thank-you
  const handle = async (form, formName) => {
    const $$ = s => [...form.querySelectorAll(s)];
    const missing = $$('[required]').filter(el => !el.value.trim() || (el.type === 'email' && !el.checkValidity()));
    $$('.bad').forEach(el => el.classList.remove('bad'));
    if (missing.length) { missing.forEach(el => el.closest('.f').classList.add('bad')); missing[0].focus(); return; }
    const btn = form.querySelector('button[type="submit"]'), err = form.querySelector('.send-err');
    btn.disabled = true; err.hidden = true;
    const res = await send(form, formName);
    btn.disabled = false;
    if (!res.ok) { err.textContent = message(res.why); err.hidden = false; return; }
    $$('.foot, fieldset, .row2, form > .f, .h-captcha, .send-err').forEach(el => el.hidden = true);
    form.querySelector('.done').hidden = false;
  };

  window.BAEsend = { extras, prepare, reset, handle };
})();
