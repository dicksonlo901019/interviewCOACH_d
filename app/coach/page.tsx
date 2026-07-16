"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import quickRaw from "../../content/ctbc-blockchain-regulation-15min-cram.md?raw";
import quickStablecoinRaw from "../../content/quick-stablecoin-search-index.md?raw";
import handbookRaw from "../../content/ctbc-virtual-asset-stablecoin-pm-interview-prep.md?raw";
import researchRaw from "../../content/ctbc-deep-research-interview-addendum.md?raw";

type ConsentMode = "practice" | "consented";
type SessionState = "idle" | "connecting" | "listening" | "error";
type TranscriptItem = { id: string; text: string; partial?: boolean };
type CoachAnswer = { question: string; short: string; long: string; sources: string };

type RealtimeEvent = {
  type?: string;
  item_id?: string;
  delta?: string;
  transcript?: string;
  error?: { message?: string };
};

type BrowserSpeechResult = { isFinal: boolean; 0: { transcript: string } };
type BrowserSpeechEvent = { resultIndex: number; results: ArrayLike<BrowserSpeechResult> };
type BrowserSpeechErrorEvent = { error: string };
type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: BrowserSpeechEvent) => void) | null;
  onerror: ((event: BrowserSpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  }
}

const EMPTY_ANSWER: CoachAnswer = {
  question: "等待面試問題",
  short: "開始收音後，系統會把辨識到的問題整理成可快速閱讀的回答骨架。",
  long: "回答會依序呈現結論、商業價值、銀行角色、風險控制與落地方式，並優先引用本網站的準備資料。",
  sources: "尚未引用資料。",
};

const DEMO_ANSWER: CoachAnswer = {
  question: "穩定幣對銀行的跨境支付業務會帶來哪些機會與挑戰？中信可以如何回應？",
  short: "我認為穩定幣不是單純取代銀行，而是重新分配跨境支付鏈條中的角色。機會在於提升 24/7 結算效率、降低中轉成本；銀行仍能在法幣出入金、企業 KYC、託管與合規監控上創造價值。中信可先從企業客戶的特定跨境場景做小規模驗證。",
  long: "我會從價值、角色、風險與落地四層回答。第一，穩定幣可縮短跨境支付的結算時間並改善資金可視性。第二，銀行的角色會從單純傳統通道，延伸到法幣出入金、錢包或託管、交易監控、流動性與企業服務。第三，關鍵風險包含儲備與贖回、AML／CFT、Travel Rule、鏈上地址風險及跨境法規差異。第四，中信可選擇有真實支付痛點、交易頻率穩定且法遵邊界較清楚的企業客群，先建立封閉式試點與成效指標，再決定是否擴大。",
  sources: "研究補強：全球銀行與區塊鏈角色；完整手冊：穩定幣產品設計、AML／CFT 與跨境支付章節。",
};

const knowledgeSections = [
  { label: "15 分鐘速讀", text: `${quickRaw}\n${quickStablecoinRaw}` },
  { label: "Deep Research 補強", text: researchRaw },
  { label: "完整面試手冊", text: handbookRaw },
].flatMap(({ label, text }) => text.split(/(?=^##+\s)/gm).map((section) => ({ label, section: section.trim() })).filter(({ section }) => section.length > 80));

const topicTerms = ["穩定幣", "區塊鏈", "銀行", "中信", "跨境", "支付", "AML", "洗錢", "法規", "虛擬資產", "託管", "產品", "KYC", "Travel Rule", "代幣化"];

function retrieveKnowledge(question: string) {
  const normalized = question.toLocaleLowerCase("zh-Hant");
  const terms = [...topicTerms, ...question.split(/[\s，。？！、／]+/).filter((term) => term.length >= 2)]
    .map((term) => term.toLocaleLowerCase("zh-Hant"));
  return knowledgeSections
    .map((entry) => ({ ...entry, score: terms.reduce((total, term) => total + (entry.section.toLocaleLowerCase("zh-Hant").includes(term) ? (normalized.includes(term) ? 3 : 1) : 0), 0) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => `${entry.label}\n${entry.section.replace(/\s+/g, " ").slice(0, 950)}`)
    .join("\n\n---\n\n");
}

function parseCoachAnswer(text: string): CoachAnswer {
  const pick = (label: string, next?: string) => {
    const start = text.indexOf(`[${label}]`);
    if (start < 0) return "";
    const contentStart = start + label.length + 2;
    const end = next ? text.indexOf(`[${next}]`, contentStart) : text.length;
    return text.slice(contentStart, end < 0 ? text.length : end).trim();
  };
  return {
    question: pick("問題判斷", "30秒回答") || "已辨識面試問題",
    short: pick("30秒回答", "90秒回答") || text.trim(),
    long: pick("90秒回答", "引用準備資料") || "正在整理完整回答…",
    sources: pick("引用準備資料") || "準備資料引用整理中。",
  };
}

function createLocalCoachAnswer(question: string): CoachAnswer {
  const normalized = question.toLocaleLowerCase("zh-Hant");
  const evidence = retrieveKnowledge(question);
  const sourceLabels = [...new Set((evidence.match(/15 分鐘速讀|Deep Research 補強|完整面試手冊/g) ?? []))];
  const sources = sourceLabels.length
    ? `${sourceLabels.join("、")}（瀏覽器本機檢索；請以頁面資料日期為準）`
    : "完整面試手冊：回答框架與產品經理章節（需依你的真實經驗補充）。";

  if (/aml|洗錢|kyc|kyt|travel rule|凍結|制裁/.test(normalized)) {
    return {
      question,
      short: "我會把問題拆成發行商層與銀行層。發行商可做直接客戶 KYC／KYB、鏈上監控及地址限制；但銀行仍須自行完成客戶准入、Wallet Screening、KYT、Travel Rule、案件管理與申報。PM 的責任是把政策轉成可執行流程及 Audit Trail。",
      long: "我會先確認客戶、資產、地址與交易四個風險面向，再設計八個產品節點：客戶准入、錢包驗證、入金偵測、KYT 評估、入帳控制、人工調查、處置及紀錄留存。高風險交易不應只靠固定跳數判斷，而要結合曝險類型、比例、頻率、客戶背景與資金來源。涉及凍結時，也要區分發行商合約權限與銀行帳戶控制，並保留四眼核准、申訴、解除及稽核證據。",
      sources,
    };
  }
  if (/法規|監理|台灣|genius|mica|香港|basel/.test(normalized)) {
    return {
      question,
      short: "我會用『變了什麼、產品要改什麼、銀行得到什麼機會』三段回答。法規變動不能只背新聞，而要落到准入、準備、贖回、資產隔離、監控、揭露與稽核證據。",
      long: "以台灣為例，監理正由 AML 登記走向專法下的許可與業務規範，但三讀、公布、施行與子法要分開說明。產品上我不會等待所有細節確定，也不會把假設寫死；會把法域、客群、額度、資產白名單、監控與揭露做成可配置規則，並設置法遵、風控、資安與營運的上線 Gate。對銀行而言，合規門檻同時形成企業客群、存款、外匯、託管與信任的競爭優勢。",
      sources,
    };
  }
  if (/中信|中國信託|ctbc|為什麼/.test(normalized)) {
    return {
      question,
      short: "我認為中信的優勢不只在規模，而是企業客群、跨境網路、存款外匯、風控與大型資訊團隊可以組合成銀行級數位資產能力。切入點應從真實客戶痛點與可治理邊界開始。",
      long: "我會分短中長期。短期把保管、KYA／KYT、資產隔離、對帳與銀行—VASP 介接做穩；中期選定企業客戶、特定 Corridor、白名單與限額，測試 B2B 跨境結算或 RWA 現金端；長期再視監理與央行政策評估存款代幣、穩定幣或 DvP／PvP。這條路能延續中信既有能力，也避免商業模式走在風控前面。",
      sources,
    };
  }
  if (/穩定幣|usdt|usdc|usd1|usde|pyusd|rlusd|跨境|支付/.test(normalized)) {
    return {
      question,
      short: "銀行不能只用市值挑穩定幣。我會同時看發行人、監管、儲備、贖回、透明度、合規、鏈、流動性、營運與真實用例，再決定准入範圍。",
      long: "USDT 強在流動性，USDC 偏機構整合，PYUSD 偏支付生態，RLUSD 偏企業跨境，USDG 偏合作網路；USD1 已具市場規模但制度歷史較短，適合條件式准入。落地時我會先選一條 Corridor、白名單企業與限額 PoC，端到端驗證法幣出入金、Wallet Screening、Travel Rule、流動性、贖回、對帳及例外處理，再用到帳時間、成本、失敗率與人工案件率判斷是否擴張。",
      sources,
    };
  }
  return {
    question,
    short: "我會先講結論，再從客戶價值、銀行角色、主要風險與落地方式四層回答，並把不確定資訊和自身尚未做過的經驗清楚標示。",
    long: "先定義目標客群與痛點，確認為何需要區塊鏈或數位資產；接著說明銀行在帳戶、法幣出入金、KYC／AML、託管、流動性與企業服務中的角色；再補上法規、資安、營運及合作方風險；最後提出限定客群、法域、資產、額度與 KPI 的 MVP。若問題要求實際經驗，需替換成你履歷中真實的 CEX、出入金、KYC、帳務或跨部門交付案例。",
    sources,
  };
}

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function MicIcon() {
  return <span className="coach-mic-glyph" aria-hidden="true"><i /><b /></span>;
}

export default function CoachPage() {
  const staticHosting = globalThis.location?.hostname.endsWith("github.io") ?? false;
  const realtimeSessionUrl = staticHosting
    ? "https://interviewcoach-d-api.vercel.app/api/realtime-session"
    : "/api/realtime/session";
  const [consentMode, setConsentMode] = useState<ConsentMode>("practice");
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [includeTabAudio, setIncludeTabAudio] = useState(false);
  const [state, setState] = useState<SessionState>("idle");
  const [statusMessage, setStatusMessage] = useState("尚未收音");
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [answer, setAnswer] = useState<CoachAnswer>(EMPTY_ANSWER);
  const [answerStreaming, setAnswerStreaming] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [pin, setPin] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [manualQuestion, setManualQuestion] = useState("");
  const [browserFallback, setBrowserFallback] = useState(false);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const mediaRef = useRef<MediaStream[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const pendingAnswerRef = useRef("");
  const answerActiveRef = useRef(false);
  const queuedQuestionRef = useRef("");
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<BrowserSpeechRecognition | null>(null);
  const browserFallbackRef = useRef(false);
  const fallbackActiveRef = useRef(false);

  const canStart = consentMode === "practice" || consentConfirmed;
  const active = state === "connecting" || state === "listening";

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [transcripts]);

  useEffect(() => () => {
    peerRef.current?.close();
    mediaRef.current.forEach((stream) => stream.getTracks().forEach((track) => track.stop()));
    void audioContextRef.current?.close();
  }, []);

  const sendForCoaching = useCallback((question: string) => {
    const dc = dataChannelRef.current;
    if (browserFallbackRef.current || !dc || dc.readyState !== "open") {
      setAnswer(createLocalCoachAnswer(question));
      setAnswerStreaming("");
      return;
    }
    if (answerActiveRef.current) {
      queuedQuestionRef.current = question;
      return;
    }
    answerActiveRef.current = true;
    const evidence = retrieveKnowledge(question) || "找不到直接對應段落，請以一般銀行產品經理框架回答，並標示需要補充真實經驗。";
    setAnswerStreaming("");
    pendingAnswerRef.current = "";
    setAnswer((current) => ({ ...current, question: "正在判斷問題…", short: "正在產生回答骨架…", long: "", sources: "" }));
    dc.send(JSON.stringify({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{
          type: "input_text",
          text: `面試問題：\n${question}\n\n可引用的準備資料：\n${evidence}\n\n請依指定四區段格式產生面試回答。`,
        }],
      },
    }));
    dc.send(JSON.stringify({ type: "response.create", response: { output_modalities: ["text"] } }));
  }, []);

  const handleRealtimeEvent = useCallback((event: MessageEvent<string>) => {
    const message = JSON.parse(event.data) as RealtimeEvent;
    if (message.type === "conversation.item.input_audio_transcription.delta" && message.item_id) {
      setTranscripts((items) => {
        const existing = items.find((item) => item.id === message.item_id);
        if (!existing) return [...items, { id: message.item_id!, text: message.delta ?? "", partial: true }];
        return items.map((item) => item.id === message.item_id ? { ...item, text: `${item.text}${message.delta ?? ""}` } : item);
      });
    }
    if (message.type === "conversation.item.input_audio_transcription.completed" && message.item_id) {
      const finalText = message.transcript?.trim() ?? "";
      setTranscripts((items) => {
        const exists = items.some((item) => item.id === message.item_id);
        if (!exists) return [...items, { id: message.item_id!, text: finalText }];
        return items.map((item) => item.id === message.item_id ? { id: item.id, text: finalText } : item);
      });
      if (finalText.length >= 8) sendForCoaching(finalText);
    }
    if (message.type === "response.output_text.delta") {
      pendingAnswerRef.current += message.delta ?? "";
      setAnswerStreaming(pendingAnswerRef.current);
      setAnswer(parseCoachAnswer(pendingAnswerRef.current));
    }
    if (message.type === "response.output_text.done") {
      setAnswer(parseCoachAnswer(pendingAnswerRef.current));
      setAnswerStreaming("");
      answerActiveRef.current = false;
      const queuedQuestion = queuedQuestionRef.current;
      queuedQuestionRef.current = "";
      if (queuedQuestion) window.queueMicrotask(() => sendForCoaching(queuedQuestion));
    }
    if (message.type === "error") {
      answerActiveRef.current = false;
      queuedQuestionRef.current = "";
      setStatusMessage(message.error?.message ?? "AI 即時服務發生錯誤");
      setState("error");
    }
  }, [sendForCoaching]);

  const stopSession = useCallback(() => {
    fallbackActiveRef.current = false;
    speechRef.current?.stop();
    dataChannelRef.current?.close();
    peerRef.current?.close();
    mediaRef.current.forEach((stream) => stream.getTracks().forEach((track) => track.stop()));
    void audioContextRef.current?.close();
    dataChannelRef.current = null;
    peerRef.current = null;
    mediaRef.current = [];
    audioContextRef.current = null;
    speechRef.current = null;
    browserFallbackRef.current = false;
    setBrowserFallback(false);
    answerActiveRef.current = false;
    queuedQuestionRef.current = "";
    setState("idle");
    setStatusMessage("已停止收音；本頁不保存音訊");
  }, []);

  const startBrowserFallback = useCallback((reason?: string) => {
    if (includeTabAudio) {
      setState("error");
      setStatusMessage("瀏覽器轉錄模式只能聆聽麥克風；請取消『同時聆聽面試分頁音訊』後重試。");
      return false;
    }
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setState("error");
      setStatusMessage("此瀏覽器不支援即時語音辨識；請使用 Chrome／Edge，或在下方貼上題目分析。");
      return false;
    }
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "zh-TW";
    speechRef.current = recognition;
    browserFallbackRef.current = true;
    setBrowserFallback(true);
    fallbackActiveRef.current = true;
    setState("connecting");
    setStatusMessage("正在啟動瀏覽器語音辨識…");
    recognition.onstart = () => {
      setState("listening");
      setStatusMessage(`${reason ? `${reason}；` : ""}正在使用瀏覽器轉錄與站內回答模式`);
    };
    recognition.onresult = (event) => {
      let interim = "";
      const completed: string[] = [];
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const text = result[0]?.transcript?.trim() ?? "";
        if (!text) continue;
        if (result.isFinal) completed.push(text); else interim += text;
      }
      setTranscripts((items) => {
        const withoutLive = items.filter((item) => item.id !== "browser-live");
        const finalItems = completed.map((text, index) => ({ id: `browser-${Date.now()}-${index}`, text }));
        return interim ? [...withoutLive, ...finalItems, { id: "browser-live", text: interim, partial: true }] : [...withoutLive, ...finalItems];
      });
      completed.filter((text) => text.length >= 4).forEach((text) => sendForCoaching(text));
    };
    recognition.onerror = (event) => {
      fallbackActiveRef.current = false;
      browserFallbackRef.current = false;
      setBrowserFallback(false);
      setState("error");
      setStatusMessage(event.error === "not-allowed" ? "麥克風權限被拒絕，請在瀏覽器網址列允許麥克風後重試。" : `瀏覽器語音辨識錯誤：${event.error}`);
    };
    recognition.onend = () => {
      if (!fallbackActiveRef.current) return;
      window.setTimeout(() => {
        try { recognition.start(); } catch { fallbackActiveRef.current = false; browserFallbackRef.current = false; setBrowserFallback(false); setState("error"); setStatusMessage("語音辨識已中斷，請重新開始收音。"); }
      }, 250);
    };
    try {
      recognition.start();
      return true;
    } catch {
      fallbackActiveRef.current = false;
      browserFallbackRef.current = false;
      setBrowserFallback(false);
      setState("error");
      setStatusMessage("無法啟動瀏覽器語音辨識，請重新載入頁面或使用下方文字輸入。");
      return false;
    }
  }, [includeTabAudio, sendForCoaching]);

  const startSession = async () => {
    if (!canStart) {
      setStatusMessage("正式面試模式必須先確認已取得所有參與者同意。");
      setState("error");
      return;
    }
    setState("connecting");
    setStatusMessage("正在取得音訊權限…");
    setElapsed(0);
    try {
      const microphone = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      mediaRef.current = [microphone];
      let outgoingTrack = microphone.getAudioTracks()[0];

      if (includeTabAudio) {
        setStatusMessage("請選擇面試分頁，並勾選分享分頁音訊");
        const display = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        mediaRef.current.push(display);
        const displayTrack = display.getAudioTracks()[0];
        if (!displayTrack) throw new Error("選擇的分頁沒有提供音訊，請重新開始並勾選分享分頁音訊。");
        display.getVideoTracks().forEach((track) => { track.stop(); display.removeTrack(track); });
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();
        context.createMediaStreamSource(microphone).connect(destination);
        context.createMediaStreamSource(new MediaStream([displayTrack])).connect(destination);
        audioContextRef.current = context;
        outgoingTrack = destination.stream.getAudioTracks()[0];
      }

      const pc = new RTCPeerConnection();
      peerRef.current = pc;
      pc.addTrack(outgoingTrack);
      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;
      dc.addEventListener("message", handleRealtimeEvent);
      dc.addEventListener("open", () => {
        setState("listening");
        setStatusMessage(includeTabAudio ? "正在聆聽麥克風與面試分頁" : "正在聆聽麥克風");
      });
      dc.addEventListener("close", () => {
        setState((current) => current === "error" ? current : "idle");
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const response = await fetch(realtimeSessionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/sdp", "X-Coach-Pin": pin },
        body: offer.sdp,
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: "無法建立即時連線。", code: "UNKNOWN" })) as { error?: string; code?: string };
        if (payload.code === "OPENAI_NOT_CONFIGURED" || response.status >= 500) {
          dataChannelRef.current?.close();
          peerRef.current?.close();
          mediaRef.current.forEach((stream) => stream.getTracks().forEach((track) => track.stop()));
          dataChannelRef.current = null;
          peerRef.current = null;
          mediaRef.current = [];
          startBrowserFallback(payload.error ?? "AI 後端暫時不可用");
          return;
        }
        throw new Error(payload.error ?? "無法建立即時連線。");
      }
      await pc.setRemoteDescription({ type: "answer", sdp: await response.text() });
    } catch (error) {
      stopSession();
      setState("error");
      setStatusMessage(error instanceof Error ? error.message : "無法啟動收音。");
    }
  };

  const sessionLabel = useMemo(() => state === "listening" ? "收音中" : state === "connecting" ? "連線中" : state === "error" ? "需要處理" : "待命中", [state]);

  return (
    <div className="coach-shell">
      <aside className={`coach-sidebar ${menuOpen ? "open" : ""}`} aria-label="AI 面試教練導覽">
        <button className="coach-sidebar-close" type="button" aria-label="關閉導覽" onClick={() => setMenuOpen(false)}>×</button>
        <a className="sidebar-brand" href="../" aria-label="返回面試準備首頁">
          <span className="mark">CT</span>
          <span><b>虛擬資產 PM</b><small>INTERVIEW ROOM</small></span>
        </a>
        <nav className="coach-nav">
          <span>準備工具</span>
          <a href="../">面試準備總覽</a>
          <a href="../#quick">15 分鐘速讀</a>
          <a href="../#research-1">研究補強</a>
          <a className="active" href="./"><i aria-hidden="true" />AI 面試教練</a>
        </nav>
        <div className="coach-side-note">
          <strong>使用邊界</strong>
          <p>模擬面試可直接使用；正式面試請先取得所有參與者明確同意。</p>
        </div>
        <a className="coach-back-link" href="../">返回準備手冊</a>
      </aside>
      {menuOpen ? <button className="menu-backdrop" aria-label="關閉導覽" onClick={() => setMenuOpen(false)} /> : null}

      <main className="coach-main">
        <header className="coach-topbar">
          <button className="mobile-menu coach-mobile-menu" onClick={() => setMenuOpen(true)} aria-label="開啟導覽"><i /><i /><i /><span>目錄</span></button>
          <h1>AI 面試教練</h1>
          <div className="coach-session-meta"><span className={`coach-status ${state}`}>{sessionLabel}</span><time>{formatTimer(elapsed)}</time></div>
        </header>

        <section className="coach-controlbar" aria-label="面試教練控制列">
          <div className="coach-consent">
            <span>使用模式</span>
            <div role="group" aria-label="使用模式">
              <button className={consentMode === "practice" ? "active" : ""} onClick={() => setConsentMode("practice")} disabled={active}>模擬面試</button>
              <button className={consentMode === "consented" ? "active" : ""} onClick={() => setConsentMode("consented")} disabled={active}>已取得同意</button>
            </div>
          </div>
          <button className={`coach-record ${active ? "active" : ""}`} onClick={active ? stopSession : startSession} disabled={!canStart && !active}>
            <MicIcon /><span><strong>{active ? "停止收音" : "開始收音"}</strong><small>{active ? "立即結束本次即時分析" : "點擊後才會要求音訊權限"}</small></span>
          </button>
          <div className="coach-privacy-state"><span aria-hidden="true">i</span><p><strong>{statusMessage}</strong><small>{browserFallback ? "瀏覽器語音辨識可能由瀏覽器供應商處理；逐字稿僅留在本頁。" : "音訊不會儲存在本網站；逐字稿僅保留於目前頁面。"}</small></p></div>
        </section>

        <section className="coach-options" aria-label="收音設定">
          {consentMode === "consented" ? (
            <label><input type="checkbox" checked={consentConfirmed} onChange={(event) => setConsentConfirmed(event.target.checked)} disabled={active} />我已告知所有參與者並取得錄音與 AI 協助同意</label>
          ) : <p>模擬面試模式：適合自行練習或與知情的練習夥伴使用。</p>}
          <label><input type="checkbox" checked={includeTabAudio} onChange={(event) => setIncludeTabAudio(event.target.checked)} disabled={active} />同時聆聽面試分頁音訊</label>
          <label className="coach-pin"><span>私人存取碼</span><input type="password" value={pin} onChange={(event) => setPin(event.target.value)} disabled={active} placeholder="若服務已設定存取碼" autoComplete="current-password" /></label>
        </section>

        <section className="coach-workspace">
          <article className="coach-transcript-panel">
            <header><div><span>LIVE TRANSCRIPT</span><h2>面試流程與即時轉錄</h2></div><button onClick={() => setTranscripts([])} disabled={!transcripts.length}>清除</button></header>
            <div className="coach-transcript" aria-live="polite">
              {transcripts.length ? transcripts.map((item, index) => (
                <div className={item.partial ? "partial" : ""} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.text || "辨識中…"}</p>{!item.partial ? <button onClick={() => sendForCoaching(item.text)}>重新分析</button> : null}</div>
              )) : (
                <div className="coach-idle-state"><MicIcon /><strong>等待問題</strong><p>開始收音後，逐字稿會顯示在這裡。你也可以先載入一題示範，確認回答介面。</p><button onClick={() => { setTranscripts([{ id: "demo", text: DEMO_ANSWER.question }]); setAnswer(DEMO_ANSWER); }}>載入示範問題</button></div>
              )}
              <div ref={transcriptEndRef} />
            </div>
            <form className="coach-manual-input" onSubmit={(event) => { event.preventDefault(); const question = manualQuestion.trim(); if (!question) return; setTranscripts((items) => [...items.filter((item) => item.id !== "browser-live"), { id: `manual-${Date.now()}`, text: question }]); sendForCoaching(question); setManualQuestion(""); }}>
              <label htmlFor="manual-question">收音不便時，直接貼上面試問題</label>
              <div><input id="manual-question" value={manualQuestion} onChange={(event) => setManualQuestion(event.target.value)} placeholder="例如：中信為什麼適合發展穩定幣業務？" /><button type="submit" disabled={!manualQuestion.trim()}>分析題目</button></div>
            </form>
            <footer><span>每個完整語音段落會自動觸發一次回答分析</span><strong>{transcripts.length} 段逐字稿</strong></footer>
          </article>

          <article className="coach-answer-panel" aria-busy={Boolean(answerStreaming)}>
            <header><div><span>ANSWER COACH</span><h2>回答教練</h2></div><button onClick={() => setAnswer(EMPTY_ANSWER)}>重設</button></header>
            <div className="coach-answer-sections">
              <section><span>01</span><div><h3>問題判斷</h3><p>{answer.question}</p></div></section>
              <section><span>02</span><div><h3>30 秒回答</h3><p>{answer.short}</p></div></section>
              <section><span>03</span><div><h3>90 秒回答</h3><p>{answer.long}</p></div></section>
              <section><span>04</span><div><h3>引用準備資料</h3><p>{answer.sources}</p></div></section>
            </div>
          </article>

          <aside className="coach-evidence-panel">
            <header><span>CONTEXT</span><h2>回答框架</h2></header>
            <ol>
              <li><span>01</span><strong>先講結論</strong><p>直接回答面試官真正想確認的判斷。</p></li>
              <li><span>02</span><strong>連結銀行角色</strong><p>法幣出入金、KYC、託管、交易監控與企業服務。</p></li>
              <li><span>03</span><strong>補上風險</strong><p>AML／CFT、儲備與贖回、跨境法規及資安治理。</p></li>
              <li><span>04</span><strong>提出落地</strong><p>選定客群與場景，先試點、設指標，再逐步擴張。</p></li>
            </ol>
            <div className="coach-honesty"><strong>誠實回答原則</strong><p>資料沒有寫、履歷沒有做過的事，AI 不應替你創造經歷。</p></div>
          </aside>
        </section>

        <footer className="coach-footer"><span>結束工作階段後，音訊串流會立即停止。</span><a href="https://developers.openai.com/api/docs/guides/realtime-webrtc" target="_blank" rel="noreferrer">技術與隱私說明</a></footer>
      </main>
    </div>
  );
}
