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
      play: '▶ 播放國語',
      pause: '❚❚ 暫停',
      resume: '▶ 繼續',
      stop: '■ 停止',
      rate: '語速',
      playing: '正在播放國語版。',
      paused: '國語版已暫停。',
      stopped: '播放已停止。',
      voice: '國語聲音',
      choose: '請選擇國語聲音',
      unavailable: '找不到國語語音；請在瀏覽器或系統中啟用台灣國語語音。',
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
      voice: 'English voice',
      choose: 'Choose an English voice',
      unavailable: 'No English voice is available in this browser.',
      unsupported: 'Speech playback is not supported in this browser.'
    }
  };

  function loadVoices() {
    voices = supported ? synth.getVoices() : [];
    controls.forEach(updateVoiceOptions);
  }

  function candidateVoices(language) {
    const notCantonese = (voice) => !/(cantonese|hong kong|\byue\b|香港|粵|粤)/i.test(`${voice.name} ${voice.lang}`);
    if (language === 'zh') {
      return voices.filter((voice) => /^zh-(tw|cn|sg)$/i.test(voice.lang) && notCantonese(voice));
    }
    return voices.filter((voice) => /^en(-|_)/i.test(voice.lang));
  }

  function recommendedVoice(language, candidates) {
    if (language === 'zh') {
      return candidates.find((voice) => /^zh-tw$/i.test(voice.lang) && /google.*(國語|普通話|mandarin|taiwan)/i.test(voice.name))
        || candidates.find((voice) => /^zh-tw$/i.test(voice.lang) && /google/i.test(voice.name))
        || candidates.find((voice) => /^zh-tw$/i.test(voice.lang))
        || candidates.find((voice) => /google.*(普通話|mandarin)/i.test(voice.name))
        || candidates.find((voice) => /^zh-cn$/i.test(voice.lang))
        || null;
    }
    return candidates.find((voice) => /^samantha$/i.test(voice.name) && /^en-us$/i.test(voice.lang))
      || candidates.find((voice) => /^google us english$/i.test(voice.name) && /^en-us$/i.test(voice.lang))
      || candidates.find((voice) => /google.*english.*female/i.test(voice.name))
      || candidates.find((voice) => /google.*english/i.test(voice.name) && /^en-us$/i.test(voice.lang))
      || null;
  }

  function voiceKey(voice) {
    return `${voice.name}|||${voice.lang}`;
  }

  function updateVoiceOptions(control) {
    const labels = copy[control.language];
    const candidates = candidateVoices(control.language);
    const signature = candidates.map(voiceKey).join(';;');
    if (signature !== control.voiceSignature) {
      const previous = control.voiceSelect.value;
      control.voiceSelect.replaceChildren();
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = labels.choose;
      control.voiceSelect.append(placeholder);
      candidates.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voiceKey(voice);
        option.textContent = `${voice.name} (${voice.lang})`;
        control.voiceSelect.append(option);
      });
      const recommended = recommendedVoice(control.language, candidates);
      const autoSelection = control.language === 'en' && recommended ? voiceKey(recommended) : '';
      control.voiceSelect.value = candidates.some((voice) => voiceKey(voice) === previous) ? previous : autoSelection;
      control.voiceSignature = signature;
    }
    control.voiceSelect.disabled = !supported || candidates.length === 0;
    updateVoice(control);
  }

  function updateVoice(control) {
    const labels = copy[control.language];
    control.voice = candidateVoices(control.language).find((voice) => voiceKey(voice) === control.voiceSelect.value) || null;
    const available = Boolean(supported && control.voice);
    control.primary.disabled = !available;
    control.rate.disabled = !available;
    control.voiceMessage.textContent = available
      ? ''
      : supported && control.voiceSelect.options.length > 1 ? labels.choose : supported ? labels.unavailable : labels.unsupported;
  }

  function setState(control, state, message = '') {
    const labels = copy[control.language];
    control.state = state;
    control.block.classList.toggle('is-speaking', state === 'speaking' || state === 'paused');
    control.primary.textContent = state === 'speaking' ? labels.pause : state === 'paused' ? labels.resume : labels.play;
    control.primary.setAttribute('aria-pressed', String(state !== 'idle'));
    control.primary.disabled = !control.voice;
    control.stop.disabled = state === 'idle';
    control.rate.disabled = !control.voice;
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
    updateVoice(control);
    if (!control.voice) return;
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
    const languageCode = control.voice.lang.replace('_', '-');
    const utterance = new SpeechSynthesisUtterance(control.text);
    utterance.lang = languageCode;
    utterance.rate = Number(control.rate.value);
    utterance.pitch = 1;
    utterance.voice = control.voice;

    activeControl = control;
    const playingMessage = `${copy[control.language].playing} ${control.voice.name} (${languageCode})`;
    setState(control, 'speaking', playingMessage);
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
    wrapper.setAttribute('aria-label', language === 'zh' ? '國語版語音控制' : 'English audio controls');

    const primary = document.createElement('button');
    primary.type = 'button';
    primary.className = 'speech-button speech-button-primary';
    primary.textContent = labels.play;
    primary.disabled = true;
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
    const voiceWrap = document.createElement('label');
    voiceWrap.className = 'speech-voice-wrap';
    const voiceLabel = document.createElement('span');
    voiceLabel.textContent = labels.voice;
    const voiceSelect = document.createElement('select');
    voiceSelect.className = 'speech-voice-select';
    voiceSelect.setAttribute('aria-label', language === 'zh' ? '選擇國語聲音' : 'Choose an English voice');
    const voiceMessage = document.createElement('span');
    voiceMessage.className = 'speech-voice-message';
    voiceMessage.setAttribute('aria-live', 'polite');
    voiceWrap.append(voiceLabel, voiceSelect);
    wrapper.append(primary, stop, rateWrap, voiceWrap, voiceMessage);

    const control = { block, language, primary, stop, rate, status, voiceSelect, voiceMessage, voiceSignature: '', voice: null, state: 'idle', text };
    controls.push(control);
    primary.addEventListener('click', () => start(control));
    stop.addEventListener('click', () => stopAll(labels.stopped));
    rate.addEventListener('change', () => {
      if (activeControl === control) {
        stopAll();
        start(control);
      }
    });
    voiceSelect.addEventListener('change', () => {
      if (activeControl === control) stopAll();
      updateVoice(control);
    });

    const label = block.querySelector('.language-label');
    if (label) label.insertAdjacentElement('afterend', wrapper);
    else block.prepend(wrapper);

    updateVoiceOptions(control);
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
  if (supported) {
    synth.addEventListener('voiceschanged', loadVoices);
    window.setTimeout(loadVoices, 300);
    window.setTimeout(loadVoices, 1200);
  }
  document.addEventListener('DOMContentLoaded', initialize);
  document.addEventListener('binance:bilingual-ready', initialize);
  window.addEventListener('hashchange', () => stopAll());
  window.addEventListener('pagehide', () => stopAll());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAll();
  });
})();
