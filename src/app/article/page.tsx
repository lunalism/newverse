// src/app/article/page.tsx

import { Cheerio, load } from "cheerio";

export const dynamic = 'force-dynamic';

async function getArticleContent(url: string) {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    const $ = load(html);

    const contentCandidates = [
      $("article"), $(".article-body"), $("#article-view"), $("#newsct_article"),
      $(".news_view"), $("#dic_area"), $(".article_body"), $("#articleBody"),
      $(".at_contents"),
    ];
    
    let contentElement: Cheerio<any> | null = null;
    for (const candidate of contentCandidates) {
      if (candidate.length > 0) {
        contentElement = candidate;
        break;
      }
    }
    
    if (!contentElement) {
      return { title: "본문을 찾을 수 없습니다.", content: "<p>본문 추출에 실패했습니다.</p>" };
    }
    
    // --- Surgical Cleaning ---
    contentElement.find('header, .util-group, .info-group, .writer-info, .tag-group, .ad-section, .another_news, .related-articles, #comments, script, style, iframe, button').remove();

    contentElement.find('*').each((_, element) => {
        const el = $(element);
        const attributes = { ...el.attr() };
        for (const attr in attributes) {
            if (!['href', 'src', 'alt', 'colspan', 'rowspan'].includes(attr)) {
                el.removeAttr(attr);
            }
        }
    });

    // --- 👇 [NEW] Final Polish ---
    // 1. 이미지 캡션(figcaption) 안의 출처(span) 제거
    contentElement.find('figcaption span').remove();

    // 2. 캡션 안의 불필요한 ▲ 기호 제거
    contentElement.find('strong').each((_, element) => {
      const el = $(element);
      if (el.text().trim() === '▲') {
        el.remove();
      }
    });

    const title = $('h1').first().text() || $('title').first().text();
    const content = contentElement.html();
    
    return { title, content };

  } catch (error) {
    console.error("Error scraping article:", error);
    return { title: "페이지를 불러올 수 없습니다.", content: "<p>오류가 발생했습니다.</p>" };
  }
}

export default async function ArticlePage({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  if (!searchParams.url) {
    return <div>잘못된 접근입니다.</div>;
  }

  const articleUrl = decodeURIComponent(searchParams.url);
  const { title, content } = await getArticleContent(articleUrl);

  return (
    <div className="prose lg:prose-xl mx-auto py-12">
      <h1>{title}</h1>
      {content && (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}