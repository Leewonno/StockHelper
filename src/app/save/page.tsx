import executeQuery from "../lib/db"

// 날짜 입력되면 해당 날짜의 데이터를 크롤링해서 DB에 저장
// 날짜 - input
// DB에 저장된 데이터 미리 확인

export default async function Save() {

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://ko.wikipedia.org/wiki/%ED%8F%AC%ED%84%B8:%EC%9A%94%EC%A6%98_%ED%99%94%EC%A0%9C';
  const depth = 1;
  const delayTime = 100;
  const save_data = [];

  const crawl = async (url:any, depth:any) => {
    // 수집중인 URL
    const decodedUrl = decodeURI(url);
    console.log(`수집중 ${decodedUrl} ...`);
    // URL에서 데이터를 가져옴
    const response = await fetch(proxyUrl + url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    });
 
    // 응답 데이터를 문자열로 변환
    const htmlString = await response.text();
    // HTML 문자열을 파싱하여 DOM 객체 생성
    const parser = new DOMParser();
    const htmlDOM = parser.parseFromString(htmlString, 'text/html');
    try {
        // 데이터 추출
        const title = htmlDOM.querySelector('title').textContent;
        const content = htmlDOM.querySelector('#mw-content-text').textContent;
        // 추출한 데이터를 배열에 저장
        data.push({
            title,
            content
        });
    } catch (e) {
        console.log(e);
        return;
    }
    // 링크 깊이가 0이면 함수 종료
    if (depth === 0) {
        return;
    }
    // 링크 추출
    const links = htmlDOM.querySelectorAll('a');
    for (const link of links) {
        // href 속성이 없으면 건너뜀
        if (!link.hasAttribute('href')) {
            continue;
        }
        // href 속성값 추출
        const href = link.getAttribute('href');
        // 동일 도메인에 있는 URL만 수집
        if (href.startsWith('https://ko.wikipedia.org') || href.startsWith('/wiki')) {
            // 링크 추출 후 딜레이 시간만큼 대기한 후 재귀적으로 호출
            await new Promise(resolve => setTimeout(resolve, delayTime));
            const nextUrl = new URL(href, url).href;
            // 링크 깊이가 0 이상인 경우에만 수집
            if (depth > 0) {
                await crawl(nextUrl, depth - 1);
            }
        }
    }
  }

  crawl(url, depth).then(() => {
    console.log('크롤링 완료');
    console.log(JSON.stringify(data, null, 2));
  }).catch(err => console.error(err));

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
              {data.id} {data.title} {data.date}
            </p>
          </>
        )
      })}
    </div>
  )
}