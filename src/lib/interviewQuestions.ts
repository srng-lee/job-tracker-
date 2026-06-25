type Category = 'frontend' | 'backend' | 'fullstack' | 'data' | 'devops' | 'design' | 'pm' | 'general'

const TECHNICAL: Record<Category, string[]> = {
  frontend: [
    '브라우저 렌더링 과정을 설명해주세요.',
    'React의 가상 DOM이 실제 DOM보다 빠른 이유는 무엇인가요?',
    'useEffect와 useLayoutEffect의 차이점을 설명해주세요.',
    'CSS position 속성의 종류와 차이점을 설명해주세요.',
    '웹 성능 최적화를 위해 사용해본 기법을 말씀해주세요.',
    'RESTful API를 프론트엔드에서 어떻게 효율적으로 관리하나요?',
    'XSS와 CSRF 공격에 대해 설명하고 방어 방법을 말씀해주세요.',
    '상태 관리 라이브러리(Redux, Zustand 등)를 사용한 경험을 말씀해주세요.',
    'TypeScript를 사용하는 이유와 장점을 설명해주세요.',
    '반응형 웹 디자인을 구현하는 방법을 설명해주세요.',
    'Webpack, Vite 등 번들러의 역할과 차이를 설명해주세요.',
    'CORS란 무엇이며 어떻게 해결하나요?',
    'CSS-in-JS와 CSS Modules의 차이와 각각 언제 사용하면 좋은지 설명해주세요.',
    'React에서 메모이제이션(useMemo, useCallback)을 언제 사용하나요?',
    '웹 접근성(Accessibility)을 고려한 개발 경험이 있으신가요?',
  ],
  backend: [
    'REST API와 GraphQL의 차이점을 설명해주세요.',
    '데이터베이스 인덱스가 무엇이고 언제 사용해야 하나요?',
    'N+1 쿼리 문제가 무엇이며 어떻게 해결하나요?',
    'JWT 토큰 기반 인증과 세션 기반 인증의 차이를 설명해주세요.',
    '마이크로서비스와 모놀리식 아키텍처의 장단점을 비교해주세요.',
    '트랜잭션과 ACID 속성에 대해 설명해주세요.',
    '비동기 처리와 이벤트 루프에 대해 설명해주세요.',
    '캐싱 전략에 대해 설명해주세요. (Redis 등)',
    'SQL과 NoSQL의 차이점과 각각 언제 사용하나요?',
    '서버 보안을 위해 고려해야 할 사항들을 말씀해주세요.',
    'CI/CD 파이프라인을 구축해본 경험이 있으신가요?',
    'API Rate Limiting을 구현하는 방법을 설명해주세요.',
    '부하 분산(Load Balancing) 방법에 대해 설명해주세요.',
    '메시지 큐(Kafka, RabbitMQ 등)를 사용해본 경험이 있으신가요?',
    '코드 리뷰에서 중요하게 보는 요소가 무엇인가요?',
  ],
  fullstack: [
    '프론트엔드와 백엔드 사이의 API 설계 시 중요하게 생각하는 점은 무엇인가요?',
    'SPA(Single Page Application)의 장단점을 설명해주세요.',
    '웹 성능 병목 지점을 어떻게 찾고 개선하나요?',
    '배포 전략(Blue-Green, Canary 등)에 대해 설명해주세요.',
    '데이터베이스 설계 시 정규화를 어느 수준까지 하시나요?',
    '보안 취약점(XSS, SQL Injection 등)을 방어하기 위한 방법을 설명해주세요.',
    '상태 관리를 서버 상태와 클라이언트 상태로 어떻게 분리하나요?',
    'SSR(Server Side Rendering)과 CSR(Client Side Rendering)의 차이를 설명해주세요.',
    'TypeScript를 백엔드와 프론트엔드에서 함께 사용한 경험을 말씀해주세요.',
    '모노레포 구조를 사용해본 경험이 있으신가요?',
  ],
  data: [
    '머신러닝 모델의 과적합(Overfitting)을 어떻게 방지하나요?',
    '데이터 전처리 과정에서 결측치를 어떻게 처리하나요?',
    'SQL 쿼리 최적화 경험을 말씀해주세요.',
    'A/B 테스트를 설계하고 분석한 경험이 있으신가요?',
    'ETL 파이프라인을 구축한 경험을 말씀해주세요.',
    '데이터 시각화 도구(Tableau, Power BI 등)를 사용해본 경험이 있으신가요?',
    'Pandas와 NumPy를 활용한 데이터 분석 경험을 말씀해주세요.',
    '대용량 데이터 처리 시 어떤 방식을 사용하시나요?',
    '통계 분포와 가설 검정에 대해 설명해주세요.',
    '데이터 파이프라인에서 품질 관리를 어떻게 하시나요?',
  ],
  devops: [
    'Docker와 Kubernetes의 차이점을 설명해주세요.',
    'CI/CD 파이프라인을 어떻게 설계하고 구축하나요?',
    '인프라를 코드로 관리(IaC)한 경험을 말씀해주세요.',
    '모니터링과 알람 시스템을 구축한 경험을 말씀해주세요.',
    'AWS, GCP, Azure 중 사용해본 클라우드 서비스를 설명해주세요.',
    '서비스 장애 발생 시 대응 절차를 설명해주세요.',
    'Blue-Green 배포와 Canary 배포의 차이를 설명해주세요.',
    '로그 수집과 분석 시스템을 구축한 경험이 있으신가요?',
    '보안 관련 인프라 설정 경험을 말씀해주세요.',
    'SLA/SLO/SLI의 개념과 관리 경험을 말씀해주세요.',
  ],
  design: [
    '사용자 리서치를 진행한 경험을 말씀해주세요.',
    '디자인 시스템을 구축하거나 기여한 경험이 있으신가요?',
    'A/B 테스트를 통해 디자인을 개선한 사례를 말씀해주세요.',
    '개발자와 협업 시 디자인 명세를 어떻게 전달하시나요?',
    'UI와 UX의 차이를 설명하고 각각 어떻게 접근하나요?',
    '반응형 디자인을 할 때 중요하게 고려하는 요소는 무엇인가요?',
    '접근성(Accessibility)을 고려한 디자인 경험을 말씀해주세요.',
    'Figma, Sketch 등 도구 활용 경험을 말씀해주세요.',
    '사용자 테스트(User Testing)를 진행한 방법을 설명해주세요.',
    '비즈니스 목표와 사용자 경험 사이에서 균형을 맞춘 사례를 말씀해주세요.',
  ],
  pm: [
    '제품 로드맵을 어떻게 우선순위화하시나요?',
    '이해관계자들 사이의 상충되는 요구를 어떻게 조율하시나요?',
    '데이터 기반으로 의사결정을 한 경험을 말씀해주세요.',
    'OKR 또는 KPI를 설정하고 관리한 경험을 말씀해주세요.',
    '개발팀과의 효과적인 협업 방법을 설명해주세요.',
    '제품 출시 후 성과를 어떻게 측정하고 개선하나요?',
    '경쟁사 분석을 어떻게 수행하시나요?',
    '기획한 기능이 기대한 성과를 내지 못했을 때 어떻게 대응했나요?',
    '사용자 인터뷰를 진행하고 인사이트를 도출한 경험을 말씀해주세요.',
    'MVP(Minimum Viable Product)를 정의하는 방법을 설명해주세요.',
  ],
  general: [
    '가장 도전적이었던 기술 문제와 해결 방법을 말씀해주세요.',
    '새로운 기술을 배울 때 어떤 방법으로 학습하시나요?',
    '팀 내 기술 부채를 발견했을 때 어떻게 처리하시나요?',
    '코드 리뷰 과정에서 피드백을 주고받는 방법을 설명해주세요.',
    '마감 기한이 촉박할 때 품질과 속도를 어떻게 균형 맞추시나요?',
    '가장 최근에 공부한 기술이나 개념이 무엇인가요?',
    '본인의 강점과 약점을 기술적인 관점에서 설명해주세요.',
  ],
}

const BEHAVIORAL: string[] = [
  '지금까지 가장 잘 협업했던 팀 경험을 말씀해주세요.',
  '팀원과 의견 충돌이 있었을 때 어떻게 해결하셨나요?',
  '실패한 프로젝트 경험과 그로부터 배운 점을 말씀해주세요.',
  '본인이 주도적으로 문제를 발견하고 해결한 경험을 말씀해주세요.',
  '빠르게 변화하는 환경에서 어떻게 적응하시나요?',
  '멘토링을 받거나 후배를 가르친 경험이 있으신가요?',
  '업무 우선순위가 갑자기 바뀌었을 때 어떻게 대응하시나요?',
  '장기 프로젝트에서 동기를 유지하는 방법이 있으신가요?',
  '성과를 인정받지 못했다고 느꼈을 때 어떻게 행동하셨나요?',
  '원격 또는 비동기 협업에서 소통을 어떻게 이어가시나요?',
]

const COMPANY_TEMPLATE: string[] = [
  '{company}에 지원하게 된 동기를 말씀해주세요.',
  '{company}의 제품/서비스를 사용해보셨나요? 개선하고 싶은 점이 있다면 무엇인가요?',
  '{company}에서 본인이 기여할 수 있는 부분이 무엇이라고 생각하시나요?',
  '{company}의 기술 스택이나 개발 문화에 대해 알고 계신 것이 있나요?',
  '{company}에서 {position}로서 1년 후 어떤 성과를 내고 싶으신가요?',
]

function detectCategory(position: string): Category {
  const p = position.toLowerCase()
  if (/프론트|frontend|front.end|react|vue|angular|ui개발/.test(p)) return 'frontend'
  if (/백엔드|backend|back.end|서버|server|java|spring|node|django|flask/.test(p)) return 'backend'
  if (/풀스택|fullstack|full.stack/.test(p)) return 'fullstack'
  if (/데이터|data|ml|ai|머신|analyst|scientist/.test(p)) return 'data'
  if (/devops|인프라|infra|sre|cloud|클라우드|운영/.test(p)) return 'devops'
  if (/디자인|design|ux|ui\/ux/.test(p)) return 'design'
  if (/pm|기획|product|서비스기획|planner/.test(p)) return 'pm'
  return 'general'
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  const copy = [...arr]
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  for (let i = copy.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) >>> 0
    const j = hash % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export interface GeneratedQuestions {
  technical: string[]
  behavioral: string[]
  company: string[]
}

export function generateInterviewQuestions(
  company: string,
  position: string,
): GeneratedQuestions {
  const seed = company + position
  const category = detectCategory(position)

  const techPool = [...(TECHNICAL[category] ?? []), ...TECHNICAL.general]
  const technical = seededShuffle(techPool, seed).slice(0, 5)
  const behavioral = seededShuffle(BEHAVIORAL, seed + 'b').slice(0, 3)
  const company_ = seededShuffle(COMPANY_TEMPLATE, seed + 'c')
    .slice(0, 2)
    .map(q => q.replace('{company}', company).replace('{position}', position))

  return { technical, behavioral, company: company_ }
}
