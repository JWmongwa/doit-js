//Local Storage에 첫 데이터 삽입
let students = ["Kim", "Lee", "Park"];
console.log(`현재 students : ${students}`);
localStorage.setItem("students", JSON.stringify(students));

//Local Storage에서 저장한 배열에 데이터 추가할때
let localData;
if(localStorage.getItem("students") === null){
    localData = [];
} else {
    localData = JSON.parse(localStorage.getItem("students"));
}

localData.push("Choi");
localStorage.setItem("students", JSON.stringify(localData));
console.log(`추가 후 students : ${localData}`);

//Local Storage에 저장한 배열 중 값 하나 삭제하기
const indexOfValue = localData.indexOf("Lee");
localData.splice(indexOfValue, 1);
localStorage.setItem("students", JSON.stringify(localData));
console.log(`삭제 후 students : ${localData}`);

//Local Storage 완전히 비우기
localStorage.removeItem("students");