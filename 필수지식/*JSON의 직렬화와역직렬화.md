*JSON이란?<br>
[감점요소] <br>
데이터교환타입<br>
[플러스요소]<br>
javascript객체 문법으로 구조화된 데이터 교환 형식으로,<br>
단순 배열, 문자열로 표현 가능<br>
  
[내용]<br>
javascript에서 EcmaScript는 버전이 1,2,3,...15처럼 업데이트 되고, 파이썬 버전 또한 업데이트되지만.<br>
일반적으로 json형식은 업데이트되지 않는다. <br>
javscript에서는 object로, 파이썬에서는 dictionary로 데이터가 변환된다.<br>
이때, json은 javascript에서 json.parse를 쓰고, 파이썬에서는 json.load를 사용한다.<br>

[타입]<br>
undefined, method를 포함하지 않는다.<br>
사용가능한 타입-> Number, String, Boolean, Array, Object, null<br>

[직렬화]<br>
외부의 시스템에서도 사용할 수 있도록 문자열(byte) 형태로 데이터를 변환하는 기술.<br>
JSON.stringify()<br>
JsObject에서 dictionary에서 넘어가기 위해서 JSON을 거치는 것이 이에 속함.<br>
JSON Strings 파일을 통해서 직렬화를 거침.<br>

[역직렬화]<br>
바이트로 변환된 데이터를 다시 객체로 변환하는 기술.<br>
JSON.parse()<br>

[활용]<br>
주로 API의 반환형태, 시스템을 구성하는 설정 파일에 활용된다.<br>
업비트의 API<br>
package.json<br>

  

  

  
