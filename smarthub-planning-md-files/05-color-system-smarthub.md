# 05. Color System — 스마트허브병원

## 문서 역할

이 문서는 스마트허브병원 웹사이트의 색상 체계를 별도로 정의한다.

`03-visual-direction`은 전체 시각 방향을 설명하고,  
`04-shadcn-design-storybook`은 컴포넌트 기준을 설명한다.  
본 문서는 그중 **색상만 분리한 구현 기준서**다.

---

# 1. Palette Source

사용자 제공 팔레트는 다음과 같다.

## Blue

```txt
#0096D1  Main Blue
#005D9B  Deep Blue
#4CB7E8  Light Blue
```

## Green

```txt
#63B32E  Main Green
#8CC63F  Lime Green
```

## Orange

```txt
#F5A623  Main Orange
#E38B00  Deep Orange
```

## Background / Support

```txt
#FFFFFF  White
#EAEAEA  Light Gray
#A7D9F5  Pale Blue Point
```

---

# 2. Role Separation

색상은 계열별로 역할을 분리한다.

## Blue: Brand / Action

블루는 스마트허브병원의 주 브랜드 색상이다.

```txt
Main Blue   #0096D1
Deep Blue   #005D9B
Light Blue  #4CB7E8
Pale Blue   #A7D9F5
```

사용처:

```txt
주요 CTA
활성 메뉴
링크
포커스 링
선택 상태
Hero 포인트
검진 허브 정체성
```

규칙:

```txt
Primary button은 Main Blue를 기본으로 한다.
Hover와 pressed 상태는 Deep Blue를 사용한다.
Light Blue는 큰 면보다 그래픽, 아이콘, 보조 hover에 사용한다.
Pale Blue는 정보 패널과 선택된 카드 배경에 사용한다.
```

## Green: Health / Positive State

그린은 건강, 안정, 가능, 완료 상태를 표현한다.

```txt
Main Green  #63B32E
Lime Green  #8CC63F
```

사용처:

```txt
완료 상태
가능 안내
건강검진센터 보조 포인트
긍정 배지
체크리스트 완료 표시
성공 메시지
```

규칙:

```txt
Green은 Primary CTA와 경쟁하지 않는다.
예약/문의 버튼의 기본색으로 남발하지 않는다.
상태와 의미가 있을 때만 사용한다.
```

## Orange: Notice / Preparation

오렌지는 오류보다 **중요 안내와 검진 전 준비**를 표현한다.

```txt
Main Orange  #F5A623
Deep Orange  #E38B00
```

사용처:

```txt
준비물 안내
금식 안내
중요 FAQ
검진 전 주의사항
폼 오류
필수 확인 메시지
```

규칙:

```txt
Orange는 사용자를 불안하게 만드는 경고색처럼 쓰지 않는다.
Main Orange는 안내와 강조에 사용한다.
Deep Orange는 오류, 강한 주의, hover 상태에 사용한다.
```

## White / Gray: Surface / Structure

화이트와 연회색은 공공병원형 포털의 명료한 표면을 만든다.

```txt
White       #FFFFFF
Light Gray  #EAEAEA
```

사용처:

```txt
전체 배경
카드 배경
섹션 구분
border
비활성 표면
공지/목록 영역
```

규칙:

```txt
기본 배경은 White다.
카드는 White를 기본으로 하고 border로 분리한다.
Light Gray는 큰 섹션 배경과 divider에 사용한다.
카드마다 색을 많이 넣지 않는다.
```

---

# 3. Neutral Text Tokens

사용자 제공 팔레트에는 본문에 적합한 짙은 텍스트 색상이 없다.  
따라서 접근성을 위해 neutral text token을 별도로 둔다.

```txt
Text Primary    #1F2933
Text Secondary  #52616B
Text Muted      #6B7785
Line Strong     rgba(31, 41, 51, 0.28)
```

이 색상은 브랜드 컬러가 아니라 **가독성 기능 토큰**이다.

규칙:

```txt
본문은 Blue, Green, Orange로 쓰지 않는다.
긴 문단은 Text Primary를 사용한다.
보조 설명은 Text Secondary를 사용한다.
비활성 텍스트는 Text Muted를 사용한다.
링크만 Blue를 사용한다.
```

---

# 4. Usage Ratio

권장 비율:

```txt
White / Light Gray Surface: 70~80%
Blue Family: 12~18%
Green Family: 4~7%
Orange Family: 2~4%
Neutral Text / Line: required for readability
```

의도:

```txt
사이트 전체는 밝고 명확해야 한다.
블루는 브랜드와 행동을 안내해야 한다.
그린은 긍정 상태를 보조해야 한다.
오렌지는 준비와 주의를 구분해야 한다.
```

---

# 5. shadcn CSS Variables

```css
:root {
  --background: 0 0% 100%;        /* #FFFFFF */
  --foreground: 210 24% 16%;      /* #1F2933 */

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

  --text-primary: 210 24% 16%;    /* #1F2933 */
  --text-secondary: 207 14% 37%;  /* #52616B */
  --text-muted: 210 11% 47%;      /* #6B7785 */

  --radius: 0.75rem;
}
```

---

# 6. Component Color Mapping

## Header

```txt
Top bar: Deep Blue background + White text
Header: White background + Light Gray border
Active menu: Main Blue
Hover menu: Pale Blue background
```

## Hero

```txt
Background: White
Accent panel: Pale Blue
Primary CTA: Main Blue
Primary CTA hover: Deep Blue
Secondary CTA: White + Main Blue border
Utility links: Text Secondary
```

## Quick Link Card

```txt
Default: White card + Light Gray border
Hover: Pale Blue background or Main Blue border
Icon: Main Blue
Title: Text Primary
Description: Text Secondary
```

## Situation Card

```txt
Enterprise badge: Main Blue
Personal badge: Main Green
Important badge: Main Orange
Default card: White
Selected card: Pale Blue
```

## Process Timeline

```txt
Step number: Main Blue
Line: Light Gray
Completed step: Main Green
Notice step: Main Orange
```

## FAQ

```txt
Question: Text Primary
Answer: Text Secondary
Open state line: Main Blue
Important FAQ badge: Main Orange
```

## Form

```txt
Input border: Light Gray
Focus ring: Main Blue
Complete state: Main Green
Error state: Deep Orange
Helper text: Text Secondary
```

## Floating CTA

```txt
Mobile background: White
Border top: Light Gray
Enterprise CTA: Main Blue
Personal CTA: Main Green or outlined Main Blue
```

---

# 7. Do / Do Not

## Do

```txt
Use Blue for main action.
Use Green for positive state.
Use Orange for preparation and caution.
Use White and Light Gray for structure.
Use neutral text for readability.
```

## Do Not

```txt
Do not use all colors with equal weight.
Do not make the whole site blue.
Do not use Green as a second primary button everywhere.
Do not use Orange as decorative accent.
Do not set long body copy in Blue, Green, or Orange.
Do not rely on color alone for state.
```

---

# 8. Final Definition

```txt
스마트허브병원의 색상 체계는
블루를 브랜드와 행동,
그린을 건강과 가능 상태,
오렌지를 준비와 주의,
화이트/그레이를 구조와 가독성에 배치한다.

본문 가독성은 별도 neutral token으로 보장한다.
```
