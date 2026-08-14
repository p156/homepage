import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | フラネコ",
  description: "フラネコのサイトおよびアプリに関するプライバシーポリシーです。",
};

const sections = [
  {
    title: "取得する情報",
    body: [
      "本サイトおよびフラネコが提供するアプリでは、ユーザーを直接特定する個人情報を、本人の同意なく取得することはありません。",
      "お問い合わせ時には、返信に必要なメールアドレスや本文の内容を取得する場合があります。",
    ],
  },
  {
    title: "広告配信について",
    body: [
      "アプリで広告を表示する場合、Google AdMobなどの広告配信サービスを利用することがあります。",
      "広告配信事業者は、広告ID、端末情報、利用状況などを使用して、広告の表示や効果測定を行う場合があります。",
    ],
  },
  {
    title: "アクセス解析について",
    body: [
      "本サイトでは、サービス改善のためにアクセス状況を確認する場合があります。",
      "取得した情報は、個人を特定しない統計情報として扱います。",
    ],
  },
  {
    title: "情報の管理",
    body: [
      "取得した情報は、利用目的の範囲内で適切に管理し、法令に基づく場合を除き第三者へ提供しません。",
    ],
  },
  {
    title: "外部リンク",
    body: [
      "本サイトやアプリから外部サイトへ移動した場合、移動先での情報の取り扱いについては各サービスのポリシーをご確認ください。",
    ],
  },
  {
    title: "改定",
    body: [
      "本ポリシーの内容は、必要に応じて変更することがあります。変更後の内容は、本ページに掲載した時点で有効になります。",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] px-6 py-8 text-[#1d1b18] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center justify-between border-b border-[#1d1b18]/15 pb-5">
          <Link className="font-semibold tracking-wide" href="/">
            huraneko
          </Link>
          <Link className="text-sm text-[#4f4a42] transition hover:text-[#1d1b18]" href="/">
            Home
          </Link>
        </nav>

        <header className="py-14 sm:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-[#26706c]">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
            プライバシーポリシー
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d554b]">
            フラネコのサイトおよび提供するアプリにおける、情報の取り扱いについて定めます。
          </p>
          <p className="mt-4 text-sm text-[#6d6559]">制定日: 2026年8月25日</p>
        </header>

        <div className="space-y-5">
          {sections.map((section) => (
            <section
              className="rounded-3xl border border-[#1d1b18]/10 bg-white/55 p-6 shadow-sm"
              key={section.title}
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="mt-4 space-y-3 leading-8 text-[#5d554b]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-5 rounded-3xl bg-[#1d1b18] p-6 text-[#fff9ed]">
          <h2 className="text-2xl font-semibold">お問い合わせ</h2>
          <p className="mt-4 leading-8 text-[#d8d0c3]">
            本ポリシーに関するお問い合わせは、下記の連絡先までお願いいたします。
          </p>
          <a
            className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1d1b18] transition hover:bg-[#f4d384]"
            href="mailto:hello@example.com"
          >
            hello@example.com
          </a>
        </section>
      </div>
    </main>
  );
}
