// src/app/page.tsx

// 뉴스 기사 데이터의 타입을 정의합니다. (TypeScript)
interface Article {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

// API 응답 전체의 타입을 정의합니다.
interface NewsApiResponse {
  articles: Article[];
}

// NewsAPI.org에서 최신 헤드라인 뉴스를 가져오는 함수
async function getNews(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    throw new Error("NEWS_API_KEY is not defined in .env.local");
  }

  // 대한민국 최신 헤드라인 뉴스를 가져옵니다.
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=samsung&language=ko&apiKey=${apiKey}`,
    {
      // 10분마다 새로운 뉴스를 가져오도록 설정 (캐싱)
      next: { revalidate: 600 },
    }
  );

  console.log("2. API 응답 상태:", response.status, response.statusText); // API 응답 상태 확인

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data: NewsApiResponse = await response.json();
  console.log("3. 가져온 기사 개수:", data.articles.length); // 기사를 몇 개나 받았는지 확인
  return data.articles;
}


export default async function Home() {
  const articles = await getNews();

  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        최신 뉴스
      </h1>
      <p className="mt-4 text-gray-500">
        오늘 가장 주목받는 소식들을 확인해보세요.
      </p>

      {/* 가져온 뉴스 기사들을 목록으로 표시합니다. */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border p-4 hover:bg-gray-50"
          >
            <h3 className="font-bold">{article.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{article.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}