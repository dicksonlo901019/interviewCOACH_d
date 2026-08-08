(() => {
  'use strict';

  const synth = window.speechSynthesis;
  const supported = Boolean(synth && window.SpeechSynthesisUtterance);
  const controls = [];
  const initializedTargets = new WeakSet();
  let activeControl = null;
  let session = 0;
  let voices = [];

  const copy = {
    zh: {
      play: '▶ 播放中文',
      pause: '❚❚ 暫停',
      resume: '▶ 繼續',
      stop: '■ 停止',
      rate: '語速',
      playing: '正在播放中文版。',
      paused: '中文版已暫停。',
      stopped: '播放已停止。',
      unsupported: '此瀏覽器不支援語音播放。'
    },
    en: {
      play: '▶ Play English',
      pause: '❚❚ Pause',
      resume: '▶ Resume',
      stop: '■ Stop',
      rate: 'Speed',
      playing: 'Playing the English version.',
      paused: 'English playback paused.',
      stopped: 'Playback stopped.',
      unsupported: 'Speech playback is not supported in this browser.'
    }
  };

  function loadVoices() {
    voices = supported ? synth.getVoices() : [];
  }

  function chooseVoice(language) {
    const normalized = language.toLowerCase();
    const prefix = normalized.split('-')[0];
    return voices.find((voice) => voice.lang.toLowerCase() === normalized)
      || voices.find((voice) => voice.lang.toLowerCase().startsWith(`${prefix}-`))
      || null;
  }

  function setState(control, state, message = '') {
    const labels = copy[control.language];
    control.state = state;
    control.block.classList.toggle('is-speaking', state === 'speaking' || state === 'paused');
    control.primary.textContent = state === 'speaking' ? labels.pause : state === 'paused' ? labels.resume : labels.play;
    control.primary.setAttribute('aria-pressed', String(state !== 'idle'));
    control.stop.disabled = state === 'idle';
    control.status.textContent = message;
  }

  function stopAll(message = '') {
    const stoppedControl = activeControl;
    session += 1;
    if (supported) synth.cancel();
    controls.forEach((control) => setState(control, 'idle'));
    if (stoppedControl && message) stoppedControl.status.textContent = message;
    activeControl = null;
  }

  function start(control) {
    if (activeControl === control && control.state === 'speaking') {
      synth.pause();
      setState(control, 'paused', copy[control.language].paused);
      return;
    }

    if (activeControl === control && control.state === 'paused') {
      synth.resume();
      setState(control, 'speaking', copy[control.language].playing);
      return;
    }

    stopAll();
    const currentSession = session;
    const languageCode = control.language === 'zh' ? 'zh-TW' : 'en-US';
    const utterance = new SpeechSynthesisUtterance(control.text);
    utterance.lang = languageCode;
    utterance.rate = Number(control.rate.value);
    utterance.pitch = 1;
    const voice = chooseVoice(languageCode);
    if (voice) utterance.voice = voice;

    activeControl = control;
    setState(control, 'speaking', copy[control.language].playing);
    utterance.addEventListener('end', () => {
      if (activeControl === control && session === currentSession) stopAll();
    });
    utterance.addEventListener('error', (event) => {
      if (activeControl !== control || session !== currentSession) return;
      const benign = event.error === 'canceled' || event.error === 'interrupted';
      stopAll(benign ? '' : copy[control.language].stopped);
    });
    synth.speak(utterance);
  }

  function createControl(block, status, index) {
    const language = block.classList.contains('en') ? 'en' : 'zh';
    const labels = copy[language];
    const text = block.querySelector('p')?.textContent.trim();
    if (!text) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'speech-controls';
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', language === 'zh' ? '中文版語音控制' : 'English audio controls');

    const primary = document.createElement('button');
    primary.type = 'button';
    primary.className = 'speech-button speech-button-primary';
    primary.textContent = labels.play;
    primary.setAttribute('aria-pressed', 'false');
    primary.setAttribute('aria-describedby', status.id);

    const stop = document.createElement('button');
    stop.type = 'button';
    stop.className = 'speech-button';
    stop.textContent = labels.stop;
    stop.disabled = true;

    const rateWrap = document.createElement('label');
    rateWrap.className = 'speech-rate-wrap';
    const rateLabel = document.createElement('span');
    rateLabel.textContent = labels.rate;
    const rate = document.createElement('select');
    rate.className = 'speech-rate';
    rate.setAttribute('aria-label', language === 'zh' ? '中文版播放語速' : 'English playback speed');
    [0.8, 1, 1.2].forEach((value) => {
      const option = document.createElement('option');
      option.value = String(value);
      option.textContent = `${value.toFixed(1)}×`;
      if (value === 1) option.selected = true;
      rate.append(option);
    });
    rateWrap.append(rateLabel, rate);
    wrapper.append(primary, stop, rateWrap);

    const control = { block, language, primary, stop, rate, status, state: 'idle', text };
    controls.push(control);
    primary.addEventListener('click', () => start(control));
    stop.addEventListener('click', () => stopAll(labels.stopped));
    rate.addEventListener('change', () => {
      if (activeControl === control) {
        stopAll();
        start(control);
      }
    });

    const label = block.querySelector('.language-label');
    if (label) label.insertAdjacentElement('afterend', wrapper);
    else block.prepend(wrapper);

    if (!supported) {
      primary.disabled = true;
      rate.disabled = true;
      status.textContent = labels.unsupported;
    }
    wrapper.dataset.speechControl = `${language}-${index}`;
  }

  function initialize() {
    document.querySelectorAll('[data-speech-pilot]').forEach((target, targetIndex) => {
      if (initializedTargets.has(target)) return;
      initializedTargets.add(target);
      const status = document.createElement('p');
      status.className = 'speech-status visually-hidden';
      status.id = `speech-status-${targetIndex + 1}`;
      status.setAttribute('aria-live', 'polite');
      target.append(status);
      target.querySelectorAll('.language-block').forEach((block, index) => createControl(block, status, index));
    });
  }

  loadVoices();
  if (supported) synth.addEventListener('voiceschanged', loadVoices);
  document.addEventListener('DOMContentLoaded', initialize);
  document.addEventListener('binance:bilingual-ready', initialize);
  window.addEventListener('hashchange', () => stopAll());
  window.addEventListener('pagehide', () => stopAll());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAll();
  });
})();
