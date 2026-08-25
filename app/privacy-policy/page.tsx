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
    <main className="privacy-page">
      <div className="privacy-content">
        <nav className="game-nav">
          <Link className="game-brand" href="/">
            huraneko
          </Link>
          <div className="game-nav-links">
            <Link href="/">Home</Link>
          </div>
        </nav>

        <header className="privacy-header">
          <p className="section-label">Privacy Policy</p>
          <h1>プライバシーポリシー</h1>
          <p className="game-lead">
            フラネコのサイトおよび提供するアプリにおける、情報の取り扱いについて定めます。
          </p>
          <p className="section-copy">制定日: 2026年8月25日</p>
        </header>

        <div className="privacy-stack">
          {sections.map((section) => (
            <section className="privacy-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="privacy-card">
            <h2>お問い合わせ</h2>
            <p>本ポリシーに関するお問い合わせは、下記の連絡先までお願いいたします。</p>
            <a className="game-button primary" href="mailto:hello@example.com">
              hello@example.com
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
