import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  HeartPulse,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pause,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import "../styles.css";

const navGroups = [
  {
    title: "소식알림",
    slug: "news",
    items: [["공지사항", "notice"], ["검진안내", "checkup-news"], ["센터소식", "press"], ["영상소식", "media"]],
  },
  {
    title: "출장검진",
    slug: "enterprise-checkup",
    items: [["기업 출장검진", "enterprise-checkup"], ["산업체·공단 검진", "industry-checkup"], ["학교·기관 검진", "school-checkup"], ["진행 절차", "process"]],
  },
  {
    title: "배치전·배치후검진",
    slug: "placement-checkup",
    items: [["배치전검진 안내", "pre-placement"], ["배치후검진 안내", "post-placement"], ["당일검진 안내", "same-day"], ["준비물·결과 FAQ", "preparation"]],
  },
  {
    title: "특수건강검진",
    slug: "special-checkup",
    items: [["대상 안내", "special-target"], ["야간근로자 검진", "night-worker"], ["유해인자별 검진", "harmful-factor"], ["기업 상담", "business-consult"]],
  },
  {
    title: "건강검진센터",
    slug: "health-center",
    items: [["국가검진", "national-checkup"], ["직장인검진", "employee-checkup"], ["채용검진", "recruit-checkup"], ["종합검진", "comprehensive"]],
  },
  {
    title: "진료과·장비",
    slug: "clinic",
    items: [["내과", "internal"], ["정형외과", "orthopedics"], ["신경외과", "neuro"], ["검사·장비", "equipment"]],
  },
];

const pageMap = {
  news: ["소식알림", "병원 소식과 검진 공지", "공지사항, 검진안내, 센터소식, 영상소식을 한 곳에서 확인합니다.", "소식알림"],
  notice: ["공지사항", "공지사항", "스마트허브병원의 운영 공지와 주요 안내를 제공합니다.", "소식알림"],
  "checkup-news": ["검진안내", "검진안내", "검진 전 준비, 운영 일정, 결과 확인 등 필요한 안내를 정리합니다.", "소식알림"],
  press: ["센터소식", "센터소식", "병원과 검진센터의 주요 소식을 전달합니다.", "소식알림"],
  media: ["영상소식", "영상소식", "검진과 진료 정보를 영상 콘텐츠로 연결하는 목록 페이지입니다.", "소식알림"],
  "enterprise-checkup": ["출장검진", "사업장으로 찾아가는 출장검진", "기업, 기관, 현장 단위 검진 운영을 위한 대상, 절차, 문의 흐름을 안내합니다.", "출장검진"],
  "industry-checkup": ["산업체·공단 검진", "산업체·공단 출장검진", "제조업, 공단, 산업단지 사업장의 검진 운영 구성을 안내합니다.", "출장검진"],
  "school-checkup": ["학교·기관 검진", "학교·기관 출장검진", "학교, 기관, 단체 검진의 일정 조율과 준비 사항을 정리합니다.", "출장검진"],
  process: ["진행 절차", "출장검진 진행 절차", "문의부터 결과 전달까지 기업 검진 운영 단계를 보여주는 페이지입니다.", "출장검진"],
  "placement-checkup": ["배치전·배치후검진", "배치전·배치후검진 안내", "개인 근로자가 방문 전 확인해야 할 준비물, 금식, 결과 흐름을 안내합니다.", "배치전·배치후검진"],
  "pre-placement": ["배치전검진 안내", "배치전검진 안내", "입사 또는 업무 배치 전 필요한 검진 정보를 정리합니다.", "배치전·배치후검진"],
  "post-placement": ["배치후검진 안내", "배치후검진 안내", "업무 배치 이후 필요한 검진 절차와 확인 사항을 안내합니다.", "배치전·배치후검진"],
  "same-day": ["당일검진 안내", "당일검진 안내", "당일 검진 가능 여부, 접수 시간, 준비 사항을 확인하는 페이지입니다.", "배치전·배치후검진"],
  preparation: ["준비물·결과 FAQ", "준비물 / 금식 / 결과 FAQ", "검진 전후 반복 질문을 한 곳에 모아 문의 전 불안을 줄입니다.", "배치전·배치후검진"],
  "special-checkup": ["특수건강검진", "특수건강검진 안내", "유해인자, 야간근로, 사업장 검진 상담 등 특수건강검진의 핵심 정보를 안내합니다.", "특수건강검진"],
  "special-target": ["대상 안내", "특수건강검진 대상 안내", "특수건강검진 대상 여부를 판단하기 위한 기준과 확인 흐름입니다.", "특수건강검진"],
  "night-worker": ["야간근로자 검진", "야간근로자 검진", "야간근로 사업장의 검진 신청과 준비 정보를 정리합니다.", "특수건강검진"],
  "harmful-factor": ["유해인자별 검진", "유해인자별 검진 안내", "유해인자에 따른 검진 항목과 상담 흐름을 구성하는 페이지입니다.", "특수건강검진"],
  "business-consult": ["기업 상담", "특수검진 기업 상담", "기업 담당자가 상담 전 준비할 정보를 안내합니다.", "특수건강검진"],
  "health-center": ["건강검진센터", "건강검진센터", "국가검진, 직장인검진, 채용검진, 종합검진 목록 구조입니다.", "건강검진센터"],
  "national-checkup": ["국가검진", "국가검진", "국가건강검진 대상과 준비사항을 안내하는 페이지입니다.", "건강검진센터"],
  "employee-checkup": ["직장인검진", "직장인검진", "직장인 검진 운영과 방문 준비를 안내합니다.", "건강검진센터"],
  "recruit-checkup": ["채용검진", "채용검진", "채용검진 접수와 결과 확인 흐름을 안내합니다.", "건강검진센터"],
  comprehensive: ["종합검진", "종합검진", "종합검진 프로그램 목록과 문의 동선을 구성합니다.", "건강검진센터"],
  clinic: ["진료과·장비", "진료과·검사장비", "지역 외래 진료와 검사 장비를 확인하는 목록 페이지입니다.", "진료과·장비"],
  internal: ["내과", "내과", "내과 진료 안내 페이지 구성입니다.", "진료과·장비"],
  orthopedics: ["정형외과", "정형외과", "통증과 근골격계 진료 안내 페이지 구성입니다.", "진료과·장비"],
  neuro: ["신경외과", "신경외과", "신경외과 진료 안내 페이지 구성입니다.", "진료과·장비"],
  equipment: ["검사·장비", "검사·장비", "CT, 초음파, 내시경 등 장비 안내 목록입니다.", "진료과·장비"],
  "health-info": ["건강정보", "건강정보", "배치전검진, 특수검진, 출장검진 가이드를 공식 콘텐츠로 연결합니다.", "건강정보"],
  inquiry: ["문의·예약", "문의·예약", "기업 문의, 개인 예약, 외래 진료 문의를 분리해 접수하는 페이지 구성입니다.", "문의·예약"],
  "enterprise-inquiry": ["기업 검진 문의", "기업 출장·특수검진 문의", "사업장 검진 상담에 필요한 회사명, 인원, 일정, 검진 유형 입력 구조입니다.", "문의·예약"],
  "personal-booking": ["개인 검진 예약", "개인 배치전검진 예약", "개인 근로자의 검진 목적과 방문 희망일을 접수하는 페이지 구성입니다.", "문의·예약"],
  location: ["오시는 길", "오시는 길", "병원 위치, 교통, 주차 정보를 안내하는 페이지 구성입니다.", "센터소개"],
  hours: ["진료시간", "진료시간", "진료와 검진 가능 시간을 안내하는 페이지 구성입니다.", "센터소개"],
  sitemap: ["사이트맵", "사이트맵", "전체 메뉴 구조를 확인하는 페이지입니다.", "이용안내"],
  privacy: ["개인정보처리방침", "개인정보처리방침", "개인정보 처리 기준을 안내하는 페이지 구성입니다.", "이용안내"],
  detail: ["상세페이지", "콘텐츠 상세", "목록에서 연결되는 상세 콘텐츠 페이지 골격입니다.", "상세"],
};

const quickLinks = [
  ["출장검진", "사업장으로 찾아가는 검진 운영", "enterprise-checkup", Building2],
  ["배치전·배치후검진", "근로자 방문 전 준비 안내", "placement-checkup", ClipboardCheck],
  ["특수건강검진", "대상·항목·주기 확인", "special-checkup", HeartPulse],
  ["건강검진센터", "국가·직장인·채용검진", "health-center", CalendarCheck],
  ["진료과", "지역 외래 진료 연결", "clinic", Stethoscope],
  ["검사·장비", "CT·초음파·내시경", "equipment", FileText],
  ["건강정보", "검진 가이드와 FAQ", "health-info", FileText],
  ["문의·예약", "기업 문의와 개인 예약", "inquiry", MessageCircle],
];

const enterpriseSteps = ["문의", "일정 조율", "항목 확인", "현장 방문", "검진 진행", "결과 전달"];
const personalSteps = ["대상 확인", "준비물 확인", "예약 또는 방문", "검사 진행", "결과 확인", "사후 안내"];

function useRoute() {
  const [route, setRoute] = useState(() => new URLSearchParams(location.search).get("slug") || "home");

  useEffect(() => {
    const onPop = () => setRoute(new URLSearchParams(location.search).get("slug") || "home");
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  const navigate = (slug) => {
    const url = slug === "home" ? "/" : `/?slug=${slug}`;
    history.pushState({}, "", url);
    setRoute(slug);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return [route, navigate];
}

function Link({ slug, children, className, onClick }) {
  return (
    <a
      className={className}
      href={slug === "home" ? "/" : `/?slug=${slug}`}
      onClick={(event) => {
        event.preventDefault();
        onClick(slug);
      }}
    >
      {children}
    </a>
  );
}

function Header({ navigate }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const go = (slug) => {
    setOpen(false);
    navigate(slug);
  };

  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <div className="top-alert" role="region" aria-label="빠른 상담 안내">
        <div className="container top-alert-inner">
          <span className="alert-badge">3초 상담!</span>
          <p>검진상담전화 <a href="tel:1899-9114">1899-9114</a> / 진료문의 <a href="tel:031-431-0119">031-431-0119</a></p>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link slug="home" onClick={go} className="logo">
            <span className="logo-mark">SH</span>
            <span><strong>스마트허브병원</strong><small>Smart Hub Hospital</small></span>
          </Link>
          <nav className={`gnb ${open ? "open" : ""}`} id="gnb" aria-label="주메뉴">
            {navGroups.map((group) => (
              <div className="gnb-item" key={group.slug}>
                <Link slug={group.slug} onClick={go}>{group.title}</Link>
                <div className="mega">
                  {group.items.map(([label, slug]) => (
                    <Link key={slug} slug={slug} onClick={go}>{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="통합검색 열기"><Search size={19} /></button>
            <button className="icon-button menu-toggle" type="button" onClick={() => setOpen(!open)} aria-controls="gnb" aria-expanded={open}><Menu size={20} /></button>
            <Link slug="inquiry" onClick={go} className="header-cta">문의·예약</Link>
          </div>
        </div>
      </header>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} navigate={go} />}
    </>
  );
}

function SearchModal({ onClose, navigate }) {
  const tags = ["placement-checkup", "special-checkup", "enterprise-checkup", "preparation"];
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="search-dialog react-modal" role="dialog" aria-modal="true" aria-labelledby="search-title" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button close" type="button" onClick={onClose} aria-label="검색 닫기"><X size={19} /></button>
        <h2 id="search-title">통합검색</h2>
        <label>
          <span>검색어</span>
          <input type="search" placeholder="배치전검진, 특수건강검진, 출장검진" autoFocus />
        </label>
        <div className="search-tags">
          {tags.map((slug) => (
            <button key={slug} type="button" onClick={() => { onClose(); navigate(slug); }}>
              {pageMap[slug][0]}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function HomePage({ navigate }) {
  const [processType, setProcessType] = useState("enterprise");
  const [noticeType, setNoticeType] = useState("notice");
  const [heroSlide, setHeroSlide] = useState(0);
  const steps = processType === "enterprise" ? enterpriseSteps : personalSteps;
  const notices = {
    notice: ["2026년 상반기 검진 운영 일정 안내", "토요일 검진 가능 시간 안내", "검진 결과 수령 방법 안내", "개인정보 처리방침 개정 안내"],
    checkup: ["배치전검진 준비물과 금식 여부", "특수건강검진 대상 확인 방법", "야간근로자 검진 신청 안내", "당일검진 전 확인할 사항"],
    info: ["건강검진 전날 준비 체크리스트", "채용검진과 배치전검진의 차이", "검진 결과를 확인하는 방법", "사업장 검진 담당자가 준비할 자료"],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((current) => (current + 1) % 2);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main id="main">
      <section className="hero hero-carousel" aria-label="스마트허브병원 주요 안내 배너">
        <div className={`hero-slide slide-one ${heroSlide === 0 ? "active" : ""}`} aria-hidden={heroSlide !== 0} />
        <div className={`hero-slide slide-two ${heroSlide === 1 ? "active" : ""}`} aria-hidden={heroSlide !== 1} />
        <div className="hero-carousel-controls" aria-label="hero carousel controls">
          <button type="button" onClick={() => setHeroSlide((current) => (current + 1) % 2)} aria-label="Previous slide">
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>
          <span className={heroSlide === 0 ? "active" : ""} aria-hidden="true" />
          <span className={heroSlide === 1 ? "active" : ""} aria-hidden="true" />
          <button type="button" className="pause" aria-label="Auto playing">
            <Pause size={15} strokeWidth={2.4} />
          </button>
          <button type="button" onClick={() => setHeroSlide((current) => (current + 1) % 2)} aria-label="Next slide">
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>
        </div>
      </section>

      <section className="hero-icon-section" aria-label="main shortcuts">
        <div className="container hero-icon-grid">
          {[
            ["건강검진 예약", "placement-checkup", CalendarCheck],
            ["오시는 길", "location", MapPin],
            ["카카오 상담", "inquiry", MessageCircle],
            ["공지사항", "notice", FileText],
          ].map(([title, slug, Icon]) => (
            <Link key={slug} slug={slug} onClick={navigate} className="hero-icon-link">
              <span className="hero-icon-circle"><Icon size={34} strokeWidth={1.8} /></span>
              <strong>{title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="quick-section" aria-label="빠른 메뉴">
        <div className="container quick-grid">
          {quickLinks.map(([title, desc, slug, Icon], index) => (
            <Link key={slug} slug={slug} onClick={navigate} className={`quick-card ${slug === "inquiry" ? "accent" : ""}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={28} strokeWidth={1.8} />
              <strong>{title}</strong>
              <small>{desc}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Purpose Routes</p>
            <h2>어떤 검진이 필요한지 몰라도 상황으로 시작할 수 있습니다.</h2>
          </div>
          <div className="situation-grid">
            {[
              ["기업", "회사 내 검진 운영이 필요합니다", "일정, 인원, 항목, 결과 전달까지 사업장 검진 운영 흐름을 확인합니다.", "enterprise-checkup", "blue"],
              ["개인", "입사 전 검진을 받아야 합니다", "배치전검진 준비물, 금식 여부, 방문 가능 시간과 결과 확인을 안내합니다.", "placement-checkup", "green"],
              ["특수검진", "특수건강검진 대상인지 궁금합니다", "유해인자, 야간근로, 검진 주기 등 대상 판단에 필요한 정보를 정리합니다.", "special-checkup", "orange"],
              ["지역진료", "통증이나 외래 진료가 필요합니다", "내과, 정형외과, 신경외과, 재활치료 등 지역 진료 동선으로 이동합니다.", "clinic", "gray"],
            ].map(([badge, title, desc, slug, color]) => (
              <Link key={slug} slug={slug} onClick={navigate} className="situation-card">
                <span className={`badge ${color}`}>{badge}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface">
        <div className="container service-layout">
          <div className="section-head compact">
            <p className="eyebrow">Core Services</p>
            <h2>핵심 검진 서비스</h2>
            <p>스마트허브병원의 주요 서비스는 기업 담당자와 개인 근로자의 질문을 기준으로 정리했습니다.</p>
          </div>
          <div className="service-grid">
            {[
              ["B2B", "출장검진", "건설현장, 물류센터, 제조업, 공단, 학교·기관 등 현장 단위 검진 문의를 연결합니다.", "enterprise-checkup", "blue large"],
              ["개인", "배치전·배치후검진", "처음 받는 검진도 준비와 결과 흐름을 빠르게 확인할 수 있습니다.", "placement-checkup", "green"],
              ["법정검진", "특수건강검진", "대상자, 유해인자, 야간근로자 검진 등 실무 질문을 정리합니다.", "special-checkup", "orange"],
              ["센터", "건강검진센터", "국가검진, 직장인검진, 채용검진, 종합검진 정보를 제공합니다.", "health-center", "gray"],
            ].map(([badge, title, desc, slug, color]) => (
              <article key={slug} className={`service-card ${color.includes("large") ? "large" : ""}`}>
                <span className={`badge ${color.split(" ")[0]}`}>{badge}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link slug={slug} onClick={navigate}>자세히 보기</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head row">
            <div>
              <p className="eyebrow">Process</p>
              <h2>검진 절차를 먼저 보여드립니다.</h2>
            </div>
            <div className="tab-controls" role="tablist" aria-label="검진 절차 선택">
              <button className={`tab ${processType === "enterprise" ? "active" : ""}`} type="button" onClick={() => setProcessType("enterprise")}>기업 검진</button>
              <button className={`tab ${processType === "personal" ? "active" : ""}`} type="button" onClick={() => setProcessType("personal")}>개인 검진</button>
            </div>
          </div>
          <ol className="timeline active">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                <p>{processType === "enterprise" ? "검진 운영에 필요한 정보를 단계별로 확인합니다." : "방문 전 준비와 결과 확인 흐름을 안내합니다."}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section field-section">
        <div className="container field-grid">
          <div>
            <p className="eyebrow">Field Ready</p>
            <h2>사업장과 현장 단위 검진에 대응합니다.</h2>
            <p>기업 담당자가 검진 가능 여부를 빠르게 판단할 수 있도록 주요 산업군과 상황을 먼저 정리했습니다.</p>
          </div>
          <div className="industry-grid">
            {["건설현장", "물류센터", "제조업", "공단·산업단지", "학교·기관", "야간근로 사업장"].map((item) => (
              <Link key={item} slug="enterprise-checkup" onClick={navigate}>{item}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section portal-section">
        <div className="container portal-grid">
          <div className="notice-panel">
            <div className="panel-head"><h2>소식알림</h2><Link slug="notice" onClick={navigate}>더보기</Link></div>
            <div className="notice-tabs">
              {["notice", "checkup", "info"].map((key) => (
                <button key={key} className={noticeType === key ? "active" : ""} type="button" onClick={() => setNoticeType(key)}>
                  {key === "notice" ? "공지사항" : key === "checkup" ? "검진안내" : "건강정보"}
                </button>
              ))}
            </div>
            <ul className="notice-list active">
              {notices[noticeType].map((item, index) => (
                <li key={item}><Link slug="detail" onClick={navigate}>{item}</Link><time>2026-05-{String(17 - index * 3).padStart(2, "0")}</time></li>
              ))}
            </ul>
          </div>
          <aside className="popup-zone" aria-label="팝업존">
            <div className="panel-head"><h2>팝업존</h2><div className="mini-controls" aria-hidden="true"><span /><span /><span /></div></div>
            <div className="popup-card"><img src="/material/2.png" alt="진료예약 안내 배너" /></div>
          </aside>
        </div>
      </section>

      <section className="section news-section">
        <div className="container news-grid">
          <div className="news-intro">
            <p className="eyebrow">Guides</p>
            <h2>검진 가이드와 병원 소식</h2>
            <p>블로그에 흩어진 검진 정보를 공식 사이트 안에서 서비스 안내와 연결합니다.</p>
          </div>
          {[
            ["건강정보", "배치전검진을 처음 받는 분을 위한 준비 가이드", "신분증, 사업장 안내문, 금식 여부, 결과 확인까지 방문 전 확인할 사항을 정리합니다.", "health-info"],
            ["센터소식", "사업장 출장검진 문의 시 필요한 정보", "검진 인원, 희망 일정, 장소, 검진 항목을 미리 정리하면 상담이 빨라집니다.", "enterprise-checkup"],
          ].map(([type, title, desc, slug]) => (
            <article className="article-card" key={title}>
              <span>{type}</span><h3>{title}</h3><p>{desc}</p><Link slug={slug} onClick={navigate}>자세히 보기</Link>
            </article>
          ))}
        </div>
      </section>
      <FinalCta navigate={navigate} />
    </main>
  );
}

function SubPage({ route, navigate }) {
  const [shortTitle, pageTitle, desc, category] = pageMap[route] || pageMap.detail;
  const listItems = useMemo(() => [
    ["안내", `${shortTitle} 주요 안내 콘텐츠`, "검진 대상, 준비물, 절차, 문의 방법 등 핵심 정보를 2~3줄로 정리합니다.", "blue"],
    ["절차", `${shortTitle} 절차 및 준비사항`, "공통 헤더, 좌측 메뉴, 검색/필터, 목록 카드, 페이지네이션 구조를 사용합니다.", "green"],
    ["FAQ", `${shortTitle} 자주 묻는 질문`, "상세 페이지 또는 문의·예약 CTA로 자연스럽게 이동하도록 구성합니다.", "orange"],
  ], [shortTitle]);

  useEffect(() => {
    document.title = `스마트허브병원 | ${shortTitle}`;
  }, [shortTitle]);

  return (
    <main id="main" className="sub-page">
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="현재 위치">
            <Link slug="home" onClick={navigate}>홈</Link><span aria-hidden="true">/</span><span>{category}</span>
          </nav>
          <p className="eyebrow">{category}</p>
          <h1>{pageTitle}</h1>
          <p>{desc}</p>
        </div>
      </section>
      <section className="section">
        <div className="container sub-layout">
          <aside className="lnb" aria-label="하위 메뉴">
            <strong>{category}</strong>
            {["enterprise-checkup", "placement-checkup", "special-checkup", "health-center", "clinic", "health-info", "inquiry"].map((slug) => (
              <Link key={slug} slug={slug} onClick={navigate} className={slug === route ? "active" : ""}>{pageMap[slug][0]}</Link>
            ))}
          </aside>
          <div className="content-area">
            <div className="list-toolbar">
              <div><strong>{shortTitle} 12건</strong><span>페이지 구성 예시</span></div>
              <label><span className="sr-only">검색어</span><input type="search" placeholder="검색어를 입력하세요" /></label>
            </div>
            <div className="placeholder-list">
              {listItems.map(([badge, title, body, color]) => (
                <article key={title}>
                  <span className={`badge ${color}`}>{badge}</span>
                  <h2>{title}</h2>
                  <p>{body}</p>
                  <Link slug="detail" onClick={navigate}>자세히 보기</Link>
                </article>
              ))}
            </div>
            <nav className="pagination" aria-label="페이지 이동">
              {["‹", "1", "2", "3", "›"].map((item) => <a key={item} className={item === "1" ? "active" : ""} href="#">{item}</a>)}
            </nav>
          </div>
        </div>
      </section>
      <FinalCta navigate={navigate} />
    </main>
  );
}

function FinalCta({ navigate }) {
  return (
    <section className="final-cta">
      <div className="container final-inner">
        <div>
          <p className="eyebrow">Next Step</p>
          <h2>검진 목적에 맞는 문의로 바로 연결하세요.</h2>
        </div>
        <div className="dual-cta">
          <Link slug="enterprise-inquiry" onClick={navigate} className="btn primary">기업 검진 문의</Link>
          <Link slug="personal-booking" onClick={navigate} className="btn white">개인 검진 예약</Link>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong className="footer-logo">스마트허브병원</strong>
            <p>경기도 시흥시 정왕동 스마트허브 권역</p>
            <p>대표전화 031-431-0119 / 검진상담 1899-9114</p>
          </div>
          <nav aria-label="하단 메뉴">
            {["location", "hours", "privacy", "sitemap"].map((slug) => <Link key={slug} slug={slug} onClick={navigate}>{pageMap[slug][0]}</Link>)}
          </nav>
        </div>
      </footer>
      <div className="floating-cta" aria-label="고정 문의">
        <a href="tel:031-431-0119"><Phone size={16} />전화문의</a>
        <Link slug="enterprise-inquiry" onClick={navigate}>기업문의</Link>
        <Link slug="personal-booking" onClick={navigate}>개인예약</Link>
      </div>
    </>
  );
}

function App() {
  const [route, navigate] = useRoute();
  const isHome = route === "home";
  return (
    <>
      <Header navigate={navigate} />
      {isHome ? <HomePage navigate={navigate} /> : <SubPage route={route} navigate={navigate} />}
      <Footer navigate={navigate} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
