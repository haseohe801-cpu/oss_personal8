# OSS Week 11 — React Course Manager (Student Starter)

React + Vite 기반 학생 배포용 Sample Project입니다. **조회와 삭제는 완성**, 등록 및 완료 변경은 학생이 직접 구현하도록 `TODO`로 남겨두었습니다.

## 실행 방법

Node.js 20.19+ 또는 22.12+ 권장.

```bash
npm install
npm run dev
```

브라우저에 표시되는 Local URL에 접속하세요. 빌드 테스트: `npm run build`.

## 소스 구조

- `src/App.jsx`: 페이지 전체 레이아웃
  이 코드는 먼저 CourseList에 있는 목록을 가져오고, 그리고 App은 그 페이지를 디자인하는 CSS코드이다.
  가장 큰 헤드는 OPEN SOURCE STUDIO · WEEK 11 이고 My Course Manager, STUDENT STARTER 글자가 들어간다. 그 다음에는 CourseList ㅍㅏ일을 가져와서 과목의 리스트를 나타나게 한다. p 태그에 있는 클래스 네임은 CSS에 다 나와있다.
- `src/components/CourseList.jsx`: State 및 목록, 삭제 로직, **TODO 1/2**
  이 파일은 App의 가운데 부분에 들어가는 리스트 화면을 출력한다. 코드의 흐름은 먼저 newName 이라는 입력창에 쓰는 글자를 세이브 해 둔다. 그 다음 주요 함수 3개가 나오는데, handleDelete 는 삭제 메세지를 띄운 뒤, 그 리스트 ID를 제거한 새 배열로 업데이트 해주는 함수이다. handleAdd와 handleToggle는 해야 할 과제이고 과목 추가 기능, 완료 상태 변경 기능을 담당한다. doneCount는 완료된 과제개수를 나타내 준다. 그 아래의 My Courses는 안내 문구와 add 버튼이 나온다.
- `src/components/CourseItem.jsx`: Props로 데이터를 받고 이벤트 콜백 호출
  이 코드는 리스트에 있는 과목을 어떻게 보여줄지를 정하는 코드이다. CourseList, course, onDelete, onToggle을 props로 전달해주면 그 값을 화면에 보여주는 역할을 한다. 체크박스는 course.completed에 따라 달라진다. 그 옆에는 과목이름과 done 이라는 클래스가 있다. CSS에 따라 디자인이 바뀐다.
- `src/data/courses.js`: 초기 과목 데이터
- `src/App.css`: 전체 디자인

## Component & Props: CourseList와 CourseItem의 관계 및 Props 전달 방식

CourseList가 부모, CourseItem이 자식이다. 부모는 CourseItem를 가져와서 JSX의 <CourseItem />로 가져간다. 여기서 자식은 그 받은 값을 화면에 출력하는 일만 한다. ㄱㅏㄴ단한 흐름을 말하자면, courses.map으로 과목 하나마다 CourseItem을 만들면서 값을 넘긴다.

## State & Event: useState를 이용한 상태 관리 및 삭제 버튼의 동작 원리

먼저 State는 화면에 출력된 값 중 바뀔 수 있는 벨류를 React가 기억하는 것이다. 핵심 코드는 다음과 같다.
const [courses, setCourses] = useState(initialCourses);
const [newName, setNewName] = useState("");
처음 값은 initialCourses 이다. setCourses는 값을 바꾸는 역할이다. newName, setNewName은 인풋창에 입력하는 글자를 바꾸는 함수이다.
삭제 버튼의 기능은 먼저 사용자가 삭제버튼을 누르면 onClick={() => onDelete(course.id)}가 실행된다. 그 다음 부모의 handleDelete(id)가 실행된다. 취소를 누르면 return. 확인이면 previous.filter((course) => course.id !== id)가 실행되고 그 다음 삭제할 id만 뺀 새 배열을 만들게 된다.setCourses가 그 배열로 바꿔준다. 마지막으로 React가 CourseList를 다시 그린다.

## Code Analysis: 주요 코드 2개(각 5~15줄)를 선택하여 동작 원리 설명

const [courses, setCourses] = useState(initialCourses);

function handleDelete(id) {
if (!window.confirm("이 과목을 삭제하시겠습니까?")) return;
setCourses((previous) => previous.filter((course) => course.id !== id));
}
과목 배열을 React가 기억하게 하고, setCourses를 return 해준다. 그 다음 삭제버튼을 누르면 확인창을 띄우고, 취소하면 return되어 아무일도 일어나지 않는다. 확인을 누르면 filter가 삭제할 id와 다른 과목만 골라 새 배열을 만든다. setCourses가 새 배열로 교체하면 React가 화면을 다시 출력한다.

{courses.length === 0 && (

  <div className="empty">등록된 과목이 없습니다.</div>
)}
{courses.map((course) => (
  <CourseItem
    key={course.id}
    course={course}
    onDelete={handleDelete}
    onToggle={handleToggle}
  />
))}

&&는 앞의 조건이 참일 때만 JSX를 화면에 그린다. courses.map은 배열의 과목마다 아이템을 하나씩을 만들어 목록 전체를 그린다. key={course.id}는 React가 각 줄을 구별하는 이름표다. course는 데이터를, onDelete와 onToggle은 부모의 함수를 props로 자식에게 전달해준다. 최종적으로 부모의 state가 바뀐다.

## 수행 내용

1. 코드를 실행하고 목록 조회·삭제를 확인합니다.
2. 초기 과목 5개 이상, 제목, CSS 3곳 이상 변경합니다.
3. `CourseList.jsx`의 **TODO 1**: 과목 등록 (빈 값 입력 방지, 고유 id 지정, State 업데이트).
4. `CourseList.jsx`의 **TODO 2**: 완료 체크박스 클릭 시 `completed` 상태 변경.
5. 선택: 검색/필터, 이름 수정 기능 추가.
6. GitHub에 Commit/Push 후 Vercel에 배포합니다.
7. README에 프로젝트 소개, 주요 코드 분석 2개, 변경 내용, Weekly Review, GitHub URL, Vercel URL을 정리합니다.

## 확인할 질문

- `CourseList`와 `CourseItem`의 역할은?
- 왜 `courses`를 직접 수정하지 않고 `setCourses()`를 사용할까요?
- `map()`과 `filter()`는 각각 어떤 목적인가요?
- `course`, `onDelete`, `onToggle` Props는 어디에서 전달되나요?
- 브라우저 새로고침 시 데이터가 초기화되는 이유는? (DB/localStorage 없음)

> 교육 목적의 로컬 State 앱입니다. 서버 API 및 데이터베이스는 사용하지 않습니다.
