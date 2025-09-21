// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- 데이터 타입 정의 (이전과 동일) ---
interface Article {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}
interface NewsApiResponse {
  articles: Article[];
}

// --- 뉴스 데이터 가져오는 함수 (이전과 동일) ---
async function getNews(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) throw new Error("NEWS_API_KEY is not defined");

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=apple&language=ko&sortBy=publishedAt&apiKey=${apiKey}`,
    { next: { revalidate: 600 } }
  );
  if (!response.ok) throw new Error("Failed to fetch news");
  const data: NewsApiResponse = await response.json();
  return data.articles.filter((article) => article.urlToImage); // 이미지가 있는 기사만 필터링
}

export default async function Home() {
  const articles = await getNews();

  // 첫 번째 기사는 메인 기사로, 나머지는 하위 기사로 분리
  const mainArticle = articles[0];
  const otherArticles = articles.slice(1, 10); // 9개만 추가로 표시

  return (
    // 전체 레이아웃: 큰 화면에서는 3열 그리드 (메인 2칸, 사이드바 1칸)
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
      
      {/* --- 왼쪽 메인 콘텐츠 영역 (2칸 차지) --- */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* 1. 메인 기사 */}
        {mainArticle && (
          <Link href={`/article?url=${encodeURIComponent(mainArticle.url)}`} target="_blank">
            <Card className="hover:border-blue-500 transition-all">
              <CardContent className="p-4 grid md:grid-cols-2 gap-6 items-center">
                {mainArticle.urlToImage && (
                  <div className="relative w-full h-64">
                    <Image
                      src={mainArticle.urlToImage}
                      alt={mainArticle.title}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{mainArticle.source.name}</p>
                  <h2 className="text-2xl font-bold">{mainArticle.title}</h2>
                  <p className="text-gray-600 line-clamp-3">{mainArticle.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* 2. 하위 기사 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherArticles.map((article, index) => (
            <Link href={`/article?url=${encodeURIComponent(article.url)}`} key={index} target="_blank">
              <Card className="h-full hover:border-blue-500 transition-all">
                <CardContent className="p-4 space-y-2">
                  {article.urlToImage && (
                    <div className="relative w-full h-32">
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 pt-2">{article.source.name}</p>
                  <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* --- 오른쪽 사이드바 영역 (1칸 차지) --- */}
      <aside className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>실시간 검색어 (예시)</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>유레일</li>
              <li>lck</li>
              {/* ... */}
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>불타는 뉴스 (예시)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>- 미국인 75% "미국 잘못된 길로 간다"</li>
              <li>- '한국인' 이상일 감독, 日 천만 영화 만들었다</li>
              {/* ... */}
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}