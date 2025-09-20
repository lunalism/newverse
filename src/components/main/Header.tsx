// src/components/main/Header.tsx

import Link from "next/link";

export function Header() {
    return (
        <header className="w-full border-b border-gray-200 bg-white-50 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tighter">
                    newverse
                    <span className="text-blue-500">.</span>
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex items-center space-x-6 text-sm font-medium text-gray-600">
                        <li>
                            <Link href="/tech" className="hover:text-blue-500 transition-colors">
                                테크
                            </Link>
                        </li>
                        <li>
                            <Link href="/society" className="hover:text-blue-500 transition-colors">
                                사회
                            </Link>
                        </li>
                        <li>
                            <Link href="/economy" className="hover:text-blue-500 transition-colors">
                                경제
                            </Link>
                        </li>
                        <li>
                            <Link href="/culture" className="hover:text-blue-500 transition-colors">
                                문화
                            </Link>
                        </li>
                        <li>
                            <Link href="/politics" className="hover:text-blue-500 transition-colors">
                                정치
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}