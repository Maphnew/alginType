# AlignType

- 정규표현식을 이용해 특정 문자를 교체하는 작업을 위한 프로그램

### Process

1. 입력한 디렉토리 내의 JS파일을 찾는다.
1. 엑셀파일에 정리된 메시지코드와 정렬타입 데이터를 불러온다.
1. 각 JS파일에서 특정 정규표현식에 맞는 문자열이 있는지 확인한다.
1. 3번에서 필터링된 파일에서 모든 문자열을 교체한 뒤 새로운 파일을 만든다.
1. 원래 파일을 rename한다.
1. 새로운 파일을 원래 파일의 이름으로 rename한다.
1. rename된 원래 파일을 삭제한다.

### Run

- package 설치

```
npm i
```

- 시작

```
node main.js
```
