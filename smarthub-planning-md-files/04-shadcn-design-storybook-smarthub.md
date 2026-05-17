# 04. shadcn Design Storybook — 스마트허브병원

## 문서 역할

이 문서는 스마트허브병원 웹사이트를 `shadcn/ui` 기준으로 구현할 때 필요한 **디자인 스토리북 기준서**다.

실제 Storybook 코드가 아니라, 구현자가 컴포넌트를 만들기 전에 확인해야 하는 다음 항목을 정의한다.

```txt
컴포넌트의 역할
사용되는 shadcn/ui primitive
시각 상태
반응형 규칙
접근성 기준
사용하면 안 되는 방식
```

스마트허브병원은 일반 병원 홈페이지가 아니라 **기업과 근로자를 위한 산업·현장 건강검진 허브**다.  
따라서 컴포넌트는 장식보다 정보 구조, 문의 전환, 검진 절차 이해를 우선한다.

색상 체계는 별도 문서인 `05-color-system-smarthub.md`를 기준으로 한다.  
본 문서의 color token 예시는 shadcn 구현 편의를 위한 요약이다.

---

# 1. Design System Base

## 1-1. Stack

```txt
Next.js
TypeScript
Tailwind CSS
shadcn/ui
lucide-react
react-hook-form
zod
```

## 1-2. shadcn 사용 원칙

shadcn/ui는 완성된 디자인 테마가 아니라 **접근성 좋은 UI primitive 모음**으로 사용한다.

```txt
shadcn primitive
→ 스마트허브 디자인 토큰 적용
→ 병원 전용 컴포넌트로 래핑
→ 페이지 섹션에서 사용
```

페이지에서 `Button`, `Card`, `Accordion`을 직접 반복하기보다, 아래처럼 사이트 전용 컴포넌트를 만든다.

```txt
Button
→ DualCta
→ FloatingCta
→ FinalCtaBand

Card
→ SituationCard
→ ServiceCard
→ QuickLinkCard
→ NoticeCard

Accordion
→ FaqSection
→ MobileMenuGroup
```

---

# 2. Design Tokens

## 2-1. Color Tokens

shadcn 기본 토큰은 유지하되, 색상 값은 스마트허브병원의 신규 팔레트에 맞춘다.

사용자 제공 팔레트:

```txt
Main Blue        #0096D1
Deep Blue        #005D9B
Light Blue       #4CB7E8
Main Green       #63B32E
Lime Green       #8CC63F
Main Orange      #F5A623
Deep Orange      #E38B00
White            #FFFFFF
Light Gray       #EAEAEA
Pale Blue Point  #A7D9F5
```

역할 정의:

```txt
Blue   = 브랜드, 주요 CTA, 선택 상태, 링크
Green  = 완료, 가능, 건강/안정, 보조 CTA
Orange = 중요 안내, 주의, 검진 준비 알림
White  = 기본 배경
Gray   = 섹션 배경, 선, 비활성 표면
Pale Blue = 정보 패널, hero 보조 배경, 선택된 카드
```

본문 텍스트는 접근성 때문에 제공 팔레트만으로 처리하지 않고, 짙은 neutral token을 별도로 둔다.

```css
:root {
  --background: 0 0% 100%;        /* #FFFFFF */
  --foreground: 210 24% 16%;      /* #1F2933, accessibility neutral */

  --card: 0 0% 100%;              /* #FFFFFF */
  --card-foreground: 210 24% 16%;

  --popover: 0 0% 100%;
  --popover-foreground: 210 24% 16%;

  --primary: 197 100% 41%;        /* #0096D1 */
  --primary-foreground: 0 0% 100%;

  --secondary: 96 59% 44%;        /* #63B32E */
  --secondary-foreground: 0 0% 100%;

  --muted: 0 0% 92%;              /* #EAEAEA */
  --muted-foreground: 210 12% 38%;

  --accent: 202 80% 81%;          /* #A7D9F5 */
  --accent-foreground: 204 100% 30%;

  --destructive: 37 100% 45%;     /* #E38B00 */
  --destructive-foreground: 0 0% 100%;

  --border: 0 0% 92%;             /* #EAEAEA */
  --input: 0 0% 92%;
  --ring: 197 100% 41%;           /* #0096D1 */

  --blue-main: 197 100% 41%;      /* #0096D1 */
  --blue-deep: 204 100% 30%;      /* #005D9B */
  --blue-light: 199 77% 60%;      /* #4CB7E8 */
  --blue-pale: 202 80% 81%;       /* #A7D9F5 */

  --green-main: 96 59% 44%;       /* #63B32E */
  --green-lime: 86 54% 51%;       /* #8CC63F */

  --orange-main: 38 91% 55%;      /* #F5A623 */
  --orange-deep: 37 100% 45%;     /* #E38B00 */

  --surface-gray: 0 0% 92%;       /* #EAEAEA */

  --radius: 0.75rem;
}
```

## 2-2. Color Usage

| Token | Use |
|---|---|
| `background` | 전체 페이지 기본 배경, White |
| `card` | 서비스 카드, 상황 카드, 공지 카드, White |
| `muted` | 공지/정보 섹션 배경, Light Gray |
| `primary` | 핵심 CTA, 활성 메뉴, 주요 링크, Main Blue |
| `secondary` | 가능/완료/건강 상태, 보조 CTA, Main Green |
| `accent` | 정보 패널, hero 보조 면, 선택된 카드, Pale Blue |
| `destructive` | 오류보다 주의/경고 중심의 Deep Orange |
| `border` | 카드, 섹션, 폼 구분선, Light Gray |
| `--blue-deep` | 헤더 포인트, primary hover, 고대비 버튼 |
| `--blue-light` | hover surface, 그래픽 보조선 |
| `--green-lime` | 긍정 배지, 건강검진센터 보조 포인트 |
| `--orange-main` | 준비물 알림, 중요 FAQ, 검진 전 안내 |

권장 비율:

```txt
White / Light Gray surface: 70~80%
Blue family: 12~18%
Green family: 4~7%
Orange family: 2~4%
Neutral text and line: 필요한 만큼
```

블루가 브랜드의 중심이지만 화면 전체를 파랗게 만들지 않는다.  
그린과 오렌지는 CTA 경쟁색이 아니라 상태와 안내를 구분하는 기능색으로 사용한다.

## 2-3. Typography

```txt
Primary Font: Pretendard
Display Accent: Fraunces 또는 Source Serif 4
```

| Role | Style |
|---|---|
| Hero H1 | 48~88px, weight 800, line-height 1.05 |
| Page H1 | 40~72px, weight 800 |
| Section H2 | 32~52px, weight 760 |
| Card Title | 20~26px, weight 700 |
| Body | 17~19px, line-height 1.72 |
| Small | 13~14px, line-height 1.55 |
| Button | 15~16px, weight 650 |
| Label | 12~13px, weight 650 |

## 2-4. Radius

| Token | Value | Use |
|---|---:|---|
| `xs` | 4px | Badge, small tag |
| `sm` | 8px | Input, FAQ item |
| `md` | 12px | Card, panel |
| `lg` | 16px | Bento tile, CTA panel |
| `pill` | 999px | CTA button, compact badge |

카드는 12px 중심으로 사용한다. 과하게 둥근 SaaS 스타일은 피한다.

## 2-5. Shadow

기본 카드에는 shadow를 사용하지 않는다.

```txt
Card: none
Sticky CTA: 0 8px 24px rgba(24, 23, 20, 0.08)
Dialog: 0 16px 48px rgba(24, 23, 20, 0.16)
```

---

# 3. Component Inventory

## 3-1. shadcn Components

우선 설치 대상:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add accordion
npx shadcn@latest add tabs
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add navigation-menu
```

## 3-2. Site Components

```txt
components/site/
├─ top-notice-bar.tsx
├─ site-header.tsx
├─ mega-menu.tsx
├─ mobile-menu.tsx
├─ site-footer.tsx
├─ hero-section.tsx
├─ dual-cta.tsx
├─ quick-link-grid.tsx
├─ situation-card.tsx
├─ service-card.tsx
├─ process-timeline.tsx
├─ preparation-checklist.tsx
├─ faq-section.tsx
├─ notice-list.tsx
├─ inquiry-form.tsx
├─ floating-cta.tsx
└─ final-cta-band.tsx
```

---

# 4. Global Components

## 4-1. TopNoticeBar

### Purpose

공식 병원 웹사이트의 신뢰와 빠른 이용 정보를 제공한다.

### shadcn Base

```txt
없음. div + Button link 조합
```

### Content

```txt
스마트허브병원 공식 웹사이트
대표전화
진료시간
오시는 길
```

### Visual

```txt
height: 36~44px
background: primary 또는 foreground
text: primary-foreground
font-size: 13px
```

### States

| State | Rule |
|---|---|
| Desktop | 좌측 공식 안내, 우측 빠른 링크 |
| Mobile | 대표전화와 오시는 길만 노출 |

### Avoid

```txt
공공기관처럼 너무 긴 인증 문구
움직이는 알림 배너
강한 경고색
```

---

## 4-2. SiteHeader

### Purpose

주요 메뉴, 검색, 전체메뉴, 핵심 CTA를 제공한다.

### shadcn Base

```txt
NavigationMenu
Button
Sheet
Dialog
```

### Desktop Layout

```txt
Logo
NavigationMenu
Search Button
기업검진 문의 Button
개인검진 예약 Button
전체메뉴 Button
```

### Mobile Layout

```txt
Logo
전화 Button
Menu Sheet Trigger
```

### Visual

```txt
height: 72~88px
background: background
border-bottom: 1px solid border
sticky 가능
```

### Accessibility

```txt
현재 메뉴 aria-current
전체메뉴 버튼 aria-label
키보드로 NavigationMenu 접근 가능
모바일 Sheet close focus return
```

---

## 4-3. SiteFooter

### Purpose

병원 기본 정보, 법적 정보, 연락 정보를 제공한다.

### Content

```txt
병원명
주소
대표전화
진료시간
사업자/의료기관 정보
개인정보처리방침
블로그/SNS 링크
```

### Visual

```txt
background: foreground
text: background
section padding: 56~80px
```

---

# 5. Landing Components

## 5-1. HeroSection

### Purpose

스마트허브병원의 정체성과 사용자의 두 핵심 경로를 첫 화면에서 분리한다.

### shadcn Base

```txt
Button
Badge
Card optional
```

### Content

```txt
Eyebrow: 산업·현장 건강검진 허브
H1: 사업장과 근로자를 연결하는 스마트허브병원 건강검진
Body: 배치전·특수건강검진부터 출장검진까지 검진 절차를 명확하게 안내합니다.
Primary CTA: 기업 출장·특수검진 문의
Secondary CTA: 개인 배치전검진 예약
Utility Links: 진료시간 / 전화번호 / 오시는 길
```

### Visual

```txt
background: background
min-height: desktop 620~760px
layout: left copy + right quick panel 또는 full-width editorial layout
```

### Responsive

| Breakpoint | Rule |
|---|---|
| Desktop | H1과 빠른 안내 패널을 2-column |
| Tablet | H1 우선, CTA는 2-column |
| Mobile | CTA는 세로 또는 2-button sticky와 연결 |

### Avoid

```txt
추상적인 히어로 이미지
흐릿한 의료 스톡 이미지
영웅 섹션을 카드 안에 가두는 구조
```

---

## 5-2. DualCta

### Purpose

기업 담당자와 개인 근로자의 전환 경로를 분리한다.

### shadcn Base

```txt
Button
```

### Variants

```txt
enterprise-primary
personal-secondary
compact
stacked
sticky
```

### Labels

```txt
기업 출장·특수검진 문의
개인 배치전검진 예약
전화 문의
카카오 상담
```

### Visual

```txt
primary: blue fill
secondary: transparent + border
height: 48~56px
radius: pill 또는 12px
```

### Accessibility

버튼 텍스트만으로 목적이 명확해야 한다. 아이콘만 있는 CTA는 사용하지 않는다.

---

## 5-3. QuickLinkGrid

### Purpose

국립병원 포털형 빠른 이용 구조를 스마트허브병원 검진 중심으로 재구성한다.

### shadcn Base

```txt
Card
Button asChild
```

### Items

```txt
출장검진
배치전·배치후검진
특수건강검진
건강검진센터
진료과
검사·장비
오시는 길
전화 문의
```

### Visual

```txt
desktop: 4-column
tablet: 3-column
mobile: 2-column
card border: 1px
shadow: none
icon: lucide line icon
```

### Card Anatomy

```txt
Icon
Title
Short description
Arrow
```

### Avoid

```txt
아이콘만 큰 카드
설명 없는 링크 나열
모든 카드에 같은 강조색
```

---

## 5-4. SituationCard

### Purpose

서비스명을 모르는 사용자가 자신의 상황으로 진입하게 한다.

### shadcn Base

```txt
Card
Badge
```

### Examples

```txt
입사 전 검진이 필요합니다
사업장 출장검진을 알아보고 있습니다
특수건강검진 대상입니다
야간근로자 검진이 필요합니다
국가검진/직장인검진을 받고 싶습니다
통증이나 외래 진료가 필요합니다
```

### Anatomy

```txt
Badge: 개인 / 기업 / 지역
Title
Description
Action text
```

### States

| State | Visual |
|---|---|
| Default | card background + border |
| Hover | border foreground 36%, arrow 이동 |
| Focus | 2px ring primary |
| Active | accent background |

---

## 5-5. ServiceCard

### Purpose

핵심 서비스의 대상자, 목적, 다음 행동을 한 카드에서 보여준다.

### shadcn Base

```txt
Card
Badge
Button
```

### Services

```txt
출장검진
배치전·배치후검진
특수건강검진
건강검진센터
지역 외래 진료
검사·장비
```

### Anatomy

```txt
Service category
Title
Description
Target user badge
Key questions
CTA
```

### Rule

서비스 카드는 병원의 서비스 나열이 아니라 사용자의 질문에 답해야 한다.

---

# 6. Process Components

## 6-1. ProcessTimeline

### Purpose

검진 절차를 단계화해 불안을 줄인다.

### shadcn Base

```txt
Tabs
Card
```

### Tabs

```txt
기업 검진 절차
개인 검진 절차
```

### Enterprise Steps

```txt
문의
일정 조율
검진 항목 확인
현장 방문
검진 진행
결과 전달
```

### Personal Steps

```txt
대상 확인
준비물 확인
예약 또는 방문
검사 진행
결과 확인
필요 시 사후관리
```

### Visual

```txt
desktop: horizontal timeline
mobile: vertical timeline
number + line + short body
```

### Accessibility

순서가 중요한 정보이므로 `ol` 구조를 우선한다.

---

## 6-2. PreparationChecklist

### Purpose

개인 근로자의 방문 전 불안을 줄인다.

### shadcn Base

```txt
Card
Checkbox visual only or icon list
```

### Items

```txt
신분증
사업장 안내문 또는 검진 의뢰서
금식 여부 확인
검진 가능 시간 확인
결과 수령 방식 확인
```

### Rule

실제 체크 가능한 인터랙션이 아니라면 `Checkbox`를 쓰지 않는다.  
단순 안내는 `CheckCircle` icon list로 구현한다.

---

# 7. Content Components

## 7-1. FaqSection

### Purpose

문의 전 반복 질문을 줄이고 검진 전 불안을 해소한다.

### shadcn Base

```txt
Accordion
```

### Priority Questions

```txt
배치전검진은 개인도 받을 수 있나요?
당일검진이 가능한가요?
검진 결과는 언제 나오나요?
금식이 필요한가요?
출장검진은 몇 명부터 가능한가요?
특수건강검진 대상자는 어떻게 확인하나요?
야간근로자 검진은 어떻게 신청하나요?
```

### Visual

```txt
divider 중심
shadow 없음
question: 17~19px / weight 650
answer: 15~17px / line-height 1.7
```

### Rule

답변 첫 문단은 3~5줄 이내로 시작한다. 긴 설명은 관련 페이지로 연결한다.

---

## 7-2. NoticeList

### Purpose

공지, 검진 안내, 건강정보를 공공기관형 포털처럼 정리하되, 메인 전환보다 앞서지 않게 한다.

### shadcn Base

```txt
Tabs
Card
Badge
```

### Tabs

```txt
병원 공지
검진 안내
건강정보
기업검진 소식
```

### Anatomy

```txt
Category badge
Title
Date
Optional summary
```

### Avoid

공지사항이 Hero나 핵심 CTA보다 중요한 것처럼 보이면 안 된다.

---

# 8. Form Components

## 8-1. InquiryForm

### Purpose

기업 문의와 개인 예약을 분리해 전환 정확도를 높인다.

### shadcn Base

```txt
Form
Input
Textarea
Select
Checkbox
Button
Tabs or RadioGroup
```

### Form Types

```txt
기업 출장·특수검진 문의
개인 배치전검진 예약
지역 외래 진료 문의
```

### Enterprise Fields

```txt
회사/기관명
담당자명
연락처
사업장 위치
예상 검진 인원
희망 일정
검진 유형
문의 내용
개인정보 동의
```

### Personal Fields

```txt
이름
연락처
검진 목적
방문 희망일
문의 내용
개인정보 동의
```

### Validation

```txt
연락처 필수
문의 유형 필수
개인정보 동의 필수
기업 문의는 회사명 또는 기관명 권장
```

### Visual

shadcn 기본 `Input`은 유지하되, 스마트허브 스타일에서는 다음을 권장한다.

```txt
border box보다 underline에 가까운 차분한 입력면
label always visible
focus ring primary
error message text visible
```

### Completion State

제출 완료 화면은 단순 성공 메시지가 아니라 다음 단계를 안내한다.

```txt
문의가 접수되었습니다.
담당자가 확인 후 연락드립니다.
방문 전 준비물과 검진 가능 여부는 상담 시 안내됩니다.
```

---

# 9. Overlay Components

## 9-1. MobileMenu

### Purpose

모바일에서 전체 메뉴와 핵심 CTA를 제공한다.

### shadcn Base

```txt
Sheet
Accordion
Button
```

### Structure

```txt
상단: 로고 + 닫기
핵심 CTA: 기업문의 / 개인예약
메뉴 그룹
전화 / 오시는 길
```

### Rule

모바일 메뉴 안에서도 기업과 개인 CTA는 분리한다.

---

## 9-2. SearchDialog

### Purpose

검진명, 진료과, 준비물, 공지 검색을 제공한다.

### shadcn Base

```txt
Dialog
Input
```

### Suggested Queries

```txt
배치전검진
특수건강검진
출장검진
금식
결과 확인
진료시간
오시는 길
```

---

# 10. Persistent CTA

## 10-1. FloatingCta

### Purpose

모든 페이지에서 문의/예약으로 이동할 수 있게 한다.

### shadcn Base

```txt
Button
```

### Desktop

```txt
right fixed vertical
전화
카카오
기업문의
개인예약
```

### Mobile

```txt
bottom fixed two buttons
기업문의
개인예약
```

### Visual

```txt
background: background
border-top: 1px solid border
shadow: sticky cta shadow
safe-area-inset-bottom 대응
```

### Accessibility

모바일 하단 CTA가 본문 마지막 콘텐츠를 가리지 않도록 `padding-bottom`을 확보한다.

---

# 11. Page Stories

## 11-1. Home Story

```txt
TopNoticeBar
SiteHeader
HeroSection
QuickLinkGrid
SituationCardGrid
ServiceCardGrid
ProcessTimeline
FaqSection
NoticeList
FinalCtaBand
SiteFooter
FloatingCta
```

## 11-2. Enterprise Checkup Story

```txt
PageHero
OperatingScopeCards
IndustryCards
ProcessTimeline enterprise
RequirementCards
EnterpriseInquiryForm
FaqSection enterprise
FinalCtaBand
```

## 11-3. Personal Checkup Story

```txt
PageHero
EligibilityCards
PreparationChecklist
ResultTimingBox
FaqSection personal
PersonalBookingForm
FinalCtaBand
```

## 11-4. Content Detail Story

```txt
ArticleHero
SummaryBox
ContentBody
RelatedServiceCard
RelatedFaqBlock
ContextualCta
```

## 11-5. Inquiry Story

```txt
UserTypeSelector
RequestTypeSelector
DynamicInquiryForm
NoticeBox
SubmitButton
CompletionState
```

---

# 12. Component States Checklist

모든 인터랙티브 컴포넌트는 최소 아래 상태를 가진다.

```txt
default
hover
focus-visible
active
disabled
loading, if submit action
error, if form field
success, if completion state
```

색상만으로 상태를 전달하지 않는다.  
텍스트, 아이콘, 선 두께, 위치 변화 중 하나 이상을 함께 사용한다.

---

# 13. Accessibility Checklist

```txt
키보드 탐색 가능
focus-visible 명확화
모바일 touch target 최소 44px
폼 라벨 상시 노출
오류 메시지 텍스트 제공
Accordion aria 상태 유지
Dialog / Sheet focus trap
색상 대비 AA 이상
prefers-reduced-motion 대응
```

---

# 14. Visual QA Checklist

구현 후 아래 항목을 확인한다.

```txt
첫 화면에서 기업/개인 CTA가 즉시 보이는가?
공지/소식 영역이 메인 CTA보다 강해 보이지 않는가?
카드가 너무 SaaS 대시보드처럼 보이지 않는가?
컬러가 블루 일색으로 보이지 않는가?
모바일에서 하단 CTA가 콘텐츠를 가리지 않는가?
폼 라벨과 오류 메시지가 명확한가?
FAQ 답변이 너무 길어 접힌 콘텐츠처럼 숨어 있지 않은가?
검진 절차가 순서대로 읽히는가?
```

---

# 15. Final Definition

```txt
스마트허브병원의 shadcn Design Storybook은
shadcn/ui의 접근성 좋은 primitive를 기반으로,
국립병원 포털의 신뢰 구조와
스마트허브병원의 검진 전환 구조를 결합한
병원형 컴포넌트 시스템이다.

컴포넌트는 예쁘게 보이기 위해 존재하지 않는다.
사용자가 자신의 검진 목적을 빠르게 찾고,
절차와 준비사항을 이해하며,
기업 문의 또는 개인 예약으로 안정적으로 이동하게 만드는 것이 목적이다.
```
