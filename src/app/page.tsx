// src/app/page.tsx

export default function Home() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        최신 뉴스
      </h1>
      <p className="mt-4 text-gray-500">
        오늘 가장 주목받는 소식들을 확인해보세요.
      </p>

      {/* 여기에 뉴스 카드들이 표시될 예정입니다. */}
      <div className="mt-8">
        <p>뉴스 콘텐츠가 로딩될 공간입니다...</p>
      </div>
    </section>
  );
}