'use client'

import { useState } from "react"
import executeQuery from "../lib/db"

// 날짜 입력되면 해당 날짜의 데이터를 크롤링해서 DB에 저장
// 날짜 - input
// DB에 저장된 데이터 미리 확인

export default function Save() {

  const [goalDate, setGoalDate] = useState<string>("");

  const clickSaveBtn = async ()=>{
    try{
      const res = await fetch('/save/news', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({goal_date: goalDate}),
      })
      // 응답 처리
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json(); // 백엔드에서 보낸 JSON 데이터
      if (data.result) {
        alert("저장이 완료되었습니다.");
      } else {
        alert("저장에 실패했습니다.");
      }
    }
    catch(e){
      console.log(e)
    }
    
  }

  return (
    <div>
      <input type="date" onChange={(e)=>setGoalDate(e.target.value)} value={goalDate} />
      <button onClick={clickSaveBtn}>저장</button>
    </div>
  )
}