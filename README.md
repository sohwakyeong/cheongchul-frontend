# cheil-switch-server

##  Pull Request
- main brach와 dev branch로 나누어 작업
- dev branch 작업 후, 테스트 완료 후, main branch PR

[//]: # (### Flow&#40;예시&#41;)

[//]: # (1. 작업 전, 로컬 브랜치 최신화 &#40;git pull origin main&#41;)

[//]: # (2. 작업 후, add + commit &#40;git add + git commit -m "{Commit Message_하단 참조}")

[//]: # (3. 원격 브랜치&#40;main X&#41;에 push &#40;git push origin Junbo&#41;)

[//]: # (4. GitHub Pull Request 생성&#40;main <- Junbo&#41;)

[//]: # (5. 팀원 확인 후, merge)

[//]: # (6. 위 작업 반복)

##  Commit  Convention

|Message|설명|
|:---:|:---|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서 수정|
|style|코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우|
|refactor|코드 리팩토링|
|test|테스트 코드|
|chore |빌드 업무 수정, 패키지 매니저 수정|

[//]: # (### Jira 이슈 연동)

[//]: # (1. Jira 프로젝트의 해당 이슈 티켓 번호 확인        ex&#41; SMWA-2)

[//]: # (2. 작업 후, 커밋 메시지 앞에 해당 티켓 번호 포함하여 작성 ex&#41; git commit -m "SMWA-2 docs: update README.md")

[//]: # (   &#40;티켓번호를 포함해서 브랜치 생성/연동 도 가능&#41;)

package-lock.json
├── package.json
├── public
│   ├── Logout.png
│   ├── accountLogo.png
│   ├── banner1.png
│   ├── banner2.png
│   ├── banner3.png
│   ├── bookMark.png
│   ├── bookMarkFalse.png
│   ├── english.png
│   ├── icons.png
│   ├── korean.png
│   ├── logo.png
│   ├── math.png
│   ├── science.png
│   ├── search.png
│   ├── seoulu.png
│   ├── society.png
│   ├── subject.png
│   └── user.png
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   ├── components
│   │   ├── Editor.css
│   │   ├── Editor.jsx
│   │   ├── FilterOptions.css
│   │   ├── FilterOptions.jsx
│   │   ├── Footer.jsx
│   │   ├── GoogleLoginBtn.css
│   │   ├── GoogleLoginBtn.jsx
│   │   ├── MainCategory.css
│   │   ├── MainCategory.jsx
│   │   ├── MainSwiper.css
│   │   ├── MainSwiper.jsx
│   │   ├── PageHeader.css
│   │   ├── PageHeader.jsx
│   │   ├── TutoringItems.css
│   │   └── TutoringItems.jsx
│   ├── hooks
│   │   └── useFetch.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── Main.css
│   │   ├── Main.jsx
│   │   ├── MyPage.css
│   │   ├── MyPage.jsx
│   │   ├── NotFound.jsx
│   │   ├── OAuthPage.jsx
│   │   ├── TutoringCreate.css
│   │   ├── TutoringCreate.jsx
│   │   ├── TutoringDetail.jsx
│   │   ├── UserLogin.css
│   │   ├── UserLogin.jsx
│   │   ├── UserProfile.css
│   │   ├── UserProfile.jsx
│   │   └── UserSignup.jsx
│   └── utils
│       └── decodeJwt.jsx
└── vite.config.js
