const notes = [
  {
    title: "守秘案件の復旧対応",
    description: "教育施設向けの監視カメラシステム修理を担当。",
    tag: "REPAIR",
  },
  {
    title: "制作環境の構築",
    description:
      "ローカルAI画像生成環境のセットアップや、ワークフロー調整を検証しながら進めています。",
    tag: "SETUP",
  },
  {
    title: "物語制作の整理",
    description:
      "読み合わせ用シナリオの清書、構成整理、書き出しなど、制作物を形にする作業もしています。",
    tag: "WRITING",
  },
];

const career = [
  {
    year: "2022.03",
    title: "東京工芸大学 芸術学部 ゲーム学科 卒業",
    description: "ゲーム制作や表現に関わる学びを土台にしています。",
  },
  {
    year: "2022.04",
    title: "株式会社BREXA Technology 入社",
    description: "派遣先にてICT支援員として勤務。教育現場のIT活用を支援。",
  },
  {
    year: "2023.04",
    title: "部署移動",
    description:
      "派遣先にて金融系システムエンジニアとして勤務、現在に至る。",
  },
];

const stats = [
  ["FOCUS", "Web / App"],
  ["CLASS", "Engineer"],
  ["STYLE", "Game Design"],
];

export default function Home() {
  return (
    <main className="game-page">
      <section className="game-hero" id="top">
        <nav className="game-nav">
          <a className="game-brand" href="#top">
            huraneko
          </a>
          <div className="game-nav-links">
            <a href="#about">About</a>
            <a href="#career">Career</a>
            <a href="#notes">Notes</a>
            <a href="#contact">Contact</a>
            <a href="/privacy-policy">Privacy</a>
          </div>
        </nav>

        <div className="game-shell">
          <div className="game-copy">
            <p className="game-kicker">PLAYER PROFILE / FIRST SAVE</p>
            <h1>
              アイデアを、
              <span>遊べる形へ。</span>
            </h1>
            <p className="game-lead">
              物語、画像、Web、ローカル環境。
              <br />
              作りたいものの輪郭をつかみ、
              試しながら少しずつ形にしていく
              <br />
              フラネコのホームページです。
            </p>
            <div className="game-actions">
              <a className="game-button primary" href="#career">
                経歴を見る
              </a>
              <a className="game-button secondary" href="#notes">
                活動メモ
              </a>
            </div>
          </div>

          <aside className="status-window" aria-label="フラネコのステータス">
            <div className="window-bar">
              <span>STATUS</span>
              <span>LV. 2026</span>
            </div>
            <div className="avatar-tile">
              <img
                alt="フラネコのアイコン"
                className="avatar-image"
                src="/images/huraneko-icon.png"
              />
            </div>
            <h2>フラネコ</h2>
            <p>ゲーム表現とシステム開発のあいだで、作る力を育成中。</p>
            <div className="stat-grid">
              {stats.map(([label, value]) => (
                <div className="stat" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="game-section dark" id="about">
        <div className="section-inner about-center">
          <p className="section-label">About</p>
          <div>
            <h2>
              まだ曖昧な構想でも、
              <br />
              まずは動く形にしてみる。
            </h2>
            <p className="section-copy">
              このページはテスト用の初稿です。公開できる範囲の経験だけを載せながら、
              プロフィール写真、好きなこと、制作メモ、SNSリンクなどで少しずつ育てられます。
            </p>
          </div>
        </div>
      </section>

      <section className="game-section" id="career">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="section-label">Quest Log</p>
              <h2>これまでの歩み</h2>
            </div>
            <p>
              学びから現場支援、金融系システムエンジニアへ。公開できる範囲で、
              経歴と実務経験を整理しています。
            </p>
          </div>

          <div className="quest-list">
            {career.map((item) => (
              <article className="quest" key={item.year}>
                <div className="quest-year">{item.year}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="game-section" id="notes">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="section-label">Notes</p>
              <h2>公開できる経験から。</h2>
            </div>
            <p>
              実名や場所を出せない仕事は、守秘したまま内容だけ伝える形に。
              <br />
              試作や制作メモも、積み重ねれば活動記録になります。
            </p>
          </div>

          <div className="note-grid">
            {notes.map((note) => (
              <article className="game-card" key={note.title}>
                <span>{note.tag}</span>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="game-section contact-section" id="contact">
        <div className="section-inner contact-panel">
          <div>
            <p className="section-label">Contact</p>
            <h2>次に作るものを話しましょう。</h2>
          </div>
          <a className="game-button primary" href="mailto:hello@example.com">
            hello@example.com
          </a>
        </div>
      </section>

      <footer className="game-footer">
        <div>
          <p>© huraneko</p>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/app-ads.txt">app-ads.txt</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
