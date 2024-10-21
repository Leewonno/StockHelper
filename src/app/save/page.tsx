import executeQuery from "../lib/db"

// 날짜 입력되면 해당 날짜의 데이터를 크롤링해서 DB에 저장
// 날짜 - input
// DB에 저장된 데이터 미리 확인

export default async function Save() {
  const sql = 'select * from save'
  const data = await executeQuery(sql, '')
  const getdata = JSON.parse(JSON.stringify(data))
  console.log(getdata)
  return (
    <div>
      {getdata.map((data: any, i: any) => {
        return (
          <>
            <p>
              {data.id} {data.title}
            </p>
          </>
        )
      })}
    </div>
  )
}