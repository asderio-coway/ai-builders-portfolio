export interface Member {
  id: string;
  name: string;
  team: string;
  role: string;
  specialty: string;
  image?: string; // Placeholder for future use
}

export interface Project {
  id: string;
  title: string;
  category: 'Work Ops' | 'Workspace' | 'Smart Home' | 'AI Blueprint' | 'Global Intel';
  description: string;
  impact: string;
  members: string[]; // Member IDs
  details: string[];
  link?: string;
  image?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Assets' },
  { id: 'Work Ops', label: 'Work Ops Efficiency' },
  { id: 'Workspace', label: 'Coway Workspace' },
  { id: 'Smart Home', label: 'Smart Home Evolution' },
  { id: 'AI Blueprint', label: 'AI-Ready Blueprint' },
  { id: 'Global Intel', label: 'Global Intelligence' },
];

export const MEMBERS: Member[] = [
  { id: 'th_kim', name: '김태현', team: 'IoT기획팀', role: '크루장', specialty: 'AI Strategy & PM' },
  { id: 'yh_kim', name: '김용휘', team: 'IoT서비스개발팀', role: '팀원', specialty: 'Full-stack Dev' },
  { id: 'hj_moon', name: '문효준', team: 'IoT기획팀', role: '팀원', specialty: 'Service Planning' },
  { id: 'cy_won', name: '원창연', team: 'IoT기획팀', role: '팀원', specialty: 'Data Analysis' },
  { id: 'la_choi', name: '최린아', team: 'IoT기획팀', role: '팀원', specialty: 'UI/UX Design' },
  { id: 'yn_choi_iot', name: '최유나', team: 'IoT기획팀', role: '팀원', specialty: 'IoT Strategy' },
  { id: 'yn_choi_water', name: '최유나', team: 'Water인증팀', role: '팀원', specialty: 'Quality Assurance' },
  { id: 'hn_choi', name: '최한나', team: 'IoT앱개발팀', role: '팀원', specialty: 'Mobile App Dev' },
  { id: 'mj_hong', name: '홍민재', team: 'IoT서비스개발팀', role: '팀원', specialty: 'Backend & AI Ops' },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'GWS CLI & Jira Automation',
    category: 'Work Ops',
    description: 'Workspace API와 Jira를 연동하여 기획/디자인 업무 효율을 300% 이상 증대시킨 자동화 툴킷.',
    impact: '업무 시간 주당 15시간 절감',
    members: ['th_kim', 'mj_hong'],
    details: ['gws-cli custom hooks', 'Jira API integration', 'Auto-reporting'],
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p7',
    title: 'WQA Monitor Dashboard',
    category: 'Work Ops',
    description: '이메일로 흩어진 WQA 인증 진행 상황을 AI가 자동 분류하여 한눈에 보여주는 실시간 모니터링 게시판.',
    impact: '인증 현황 파악 속도 10배 향상 및 누락 제로화',
    members: ['th_kim', 'mj_hong'],
    details: ['Gmail Automation', 'AI Intent Classification', 'Real-time Dashboard'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000',
    link: 'https://coway-wqa-monitor-dashboard.asderio.workers.dev/'
  },
  {
    id: 'p2',
    title: 'Coway Workspace (Team)',
    category: 'Workspace',
    description: '팀 단위 협업 시나리오를 AI가 분석하여 최적의 리소스를 배분하고 히스토리를 요약하는 지능형 워크스페이스.',
    impact: '협업 히스토리 파악 속도 5배 향상',
    members: ['hj_moon', 'yh_kim'],
    details: ['Multi-agent system', 'Context-aware summary', 'Team velocity tracking'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p3',
    title: 'IoCare+ AI Routine 2.0',
    category: 'Smart Home',
    description: '사용자 생활 패턴을 학습하여 정수기, 공기청정기 등의 루틴을 선제적으로 제안하는 고도화 엔진.',
    impact: '사용자 루틴 설정 성공률 85% 달성',
    members: ['yn_choi_iot', 'hn_choi'],
    details: ['Pattern Recognition', 'User Feedback Loop', 'Device Synchronization'],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p4',
    title: 'AI-Ready Spec Bot',
    category: 'AI Blueprint',
    description: '사람과 AI 모두가 이해할 수 있는 기획서 표준안을 정립하고, 사양 질의응답을 자동 처리하는 챗봇.',
    impact: '사양 확인 커뮤니케이션 비용 60% 감소',
    members: ['cy_won', 'la_choi'],
    details: ['RAG Pipeline', 'Standardized Document Template', 'Spec-to-Chat Engine'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p5',
    title: 'Global Intel Trans-Sheet',
    category: 'Global Intel',
    description: 'LLM 기반의 다국어 번역 및 맥락 검수 시스템으로 번역 비용 절감과 일관성을 확보한 스마트 시트.',
    impact: '외주 번역 비용 연간 4,000만원 절감 기대',
    members: ['yn_choi_water', 'mj_hong'],
    details: ['LLM Contextual Translation', 'Glossary Management', 'Cost Optimization'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p6',
    title: 'NotebookLM Automation Agent',
    category: 'AI Blueprint',
    description: '리서치부터 보고서 생성까지 전 과정을 자동화하는 AI 에이전트 스킬. NotebookLM MCP CLI를 활용하여 자료 취합, 핵심 질문 실행, 음성 개요 및 멀티 스타일 슬라이드를 원클릭으로 생성합니다.',
    impact: '연구 및 보고서 작성 공수 90% 자동화 (2시간 -> 10분)',
    members: ['th_kim'],
    details: ['Autonomous Research Agent', 'MCP CLI Integration', 'Multi-format Export (Slide, Audio, Doc)', '50+ Premium Style Mapping'],
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p8',
    title: 'Codepop — 선택하면, 즉시 이해된다',
    category: 'Work Ops',
    description: '드래그 → ⌘⇧E → AI 팝업. 브라우저·VS Code·터미널·Slack 어디서나 컨텍스트 스위칭 없이 코드를 즉독하는 macOS 앱. Gemini 무료 티어로 운영비 $0, 기획부터 배포까지 Claude Code로 완성한 오픈소스.',
    impact: '컨텍스트 스위칭 제로화 · 운영 비용 $0 · 어디서나 동작',
    members: ['mj_hong'],
    details: ['Rust + Tauri 시스템 전역 단축키', 'Google Gemini 2.5 AI 해설', 'SHA256 캐싱 — 동일 코드 즉시 응답', '한국어·영어 원터치 전환', 'Built entirely with Claude Code'],
    link: 'https://github.com/oxm55522/codepop',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p11',
    title: 'IoCare+ AI 루틴 — 스마트홈 자동화를 AI가 설계한다',
    category: 'Smart Home',
    description: 'AI가 생활 패턴·날씨·위치를 분석해 정수기·청정기 등 7개 제품군 루틴을 자동 추천. 직접 만들기와 AI 추천 두 경로로 누구나 스마트홈 자동화를 설계할 수 있는 프로토타입.',
    impact: '인기 자동화 1,540명 사용 · 31개 큐레이션 · 7개 제품군 통합',
    members: ['cy_won', 'th_kim'],
    details: [
      'AI로 만들기: iCare AI가 생활 패턴 분석 후 맞춤 루틴 자동 추천',
      '직접 만들기: 시간·위치·날씨·제품 상태 4가지 조건 + 3가지 동작 조합',
      '인기 자동화 Top 31 큐레이션 — 실 사용자 데이터 기반',
      'AI 추천 알림 20개 — 날씨 예보·웰니스 기반 푸시 알림',
      'Next.js + Tailwind CSS iPhone 스타일 프로토타입, Vercel 배포',
    ],
    link: 'https://frontend-o7bidfwcp-cs-projects-7d6234c5.vercel.app',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'p10',
    title: '스마트홈 트렌드 뉴스레터 — AI가 매주 큐레이션하는 업계 인사이트',
    category: 'Global Intel',
    description: 'RSS 수집 → Claude 요약 → HTML 렌더링 → GitHub Pages 배포까지 100% 자동화된 스마트홈 트렌드 뉴스레터. 기자 없이 AI가 주도하는 무인 퍼블리싱 파이프라인.',
    impact: '5호 발행 완료 · 주간 업계 동향 완전 자동화 · 운영비 $0',
    members: ['th_kim'],
    details: [
      'discover.mjs — RSS 100+ 피드 자동 수집 및 중복 제거',
      'summarize.mjs — Claude API 기사 분류·요약·코웨이 관점 인사이트 생성',
      'fetch-images.mjs — Unsplash API 3단계 폴백 이미지 자동 매칭',
      'render.mjs — 계절 테마 Tailwind CSS HTML 생성 (Variant A/B)',
      'publish-pages.sh — GitHub Pages 무인 배포 · 운영비 $0',
    ],
    link: 'https://asderio-coway.github.io/coway-smarthome-trend/',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'p9',
    title: '9개 언어 번역부터 UI 검증까지, Figma 플러그인 하나로',
    category: 'Work Ops',
    description: 'Figma 플러그인 하나로 9개 언어 번역과 UI 텍스트 검증을 자동화. 외부 툴 없이 Figma 내에서 번역 → 검토 → 배포까지 완결되는 로컬라이제이션 파이프라인.',
    impact: '번역~검증 사이클 80% 단축 · 9개 언어 동시 처리',
    members: ['hn_choi'],
    details: [
      'Figma 플러그인 내 Claude API 연동으로 9개 언어 일괄 번역',
      '번역 결과 UI 레이아웃 자동 검증 (텍스트 오버플로, 줄바꿈 감지)',
      '번역 전/후 스크린샷 자동 캡처 및 비교 뷰 생성',
      '용어집(Glossary) JSON 기반 일관성 관리',
      'Claude Code로 기획~구현~테스트 전 과정 수행',
    ],
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&q=80&w=1000',
  },
];
