import ScrollMotion from "./scroll-motion";
import ParticlePortal from "./particle-portal";

const notes = [
  {
    title: "ツミタスク",
    description:
      "積み上がるタスクを見える化し、日々の行動に落とし込むためのタスク管理アプリを制作。",
    tag: "APP",
    href: "https://play.google.com/store/apps/details?id=com.neko.tsumitask",
  },
  {
    title: "監視カメラの復旧対応",
    description: "監視カメラシステムを調査し、復旧まで担当。",
    tag: "REPAIR",
  },
  {
    title: "環境の構築",
    description:
      "ローカル環境やPC組み立て等、あなたの第一歩のお手伝いをしています。",
    tag: "SETUP",
  },
  {
    title: "物語制作の整理",
    description:
      "TRPGシナリオの清書や情報整理など、物語を遊べる形から売れる形へ整えています。",
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
  ["制作", "Web / App"],
  ["役割", "Engineer"],
  ["原点", "Game Design"],
];

export default function Home() {
  return (
    <main className="game-page">
      <ScrollMotion />
      <section className="game-hero" id="top">
        <nav className="game-nav" aria-label="メインナビゲーション">
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
            <p className="game-kicker">フラネコの最初のセーブ</p>
            <h1>
              アイデアを、
              <span>遊べる形へ。</span>
            </h1>
            <p className="game-lead">
              物語、画像、Web、さまざまな環境。
              <br />
              作りたいものの輪郭をつかみ、
              試しながら少しずつ形にしていく
              <br />
              フラネコのホームページです。
            </p>
            <ol className="process-route" aria-label="制作の進め方">
              <li>発想</li>
              <li>試作</li>
              <li>更新</li>
            </ol>
            <div className="game-actions">
              <a className="game-button primary" href="#career">
                経歴を見る
              </a>
              <a className="game-button secondary" href="#notes">
                活動メモ
              </a>
            </div>
          </div>

          <aside className="portal-stage" aria-label="フラネコのステータス">
            <ParticlePortal />
            <div className="portal-ring" aria-hidden="true" />
            <div className="status-window">
              <div className="window-bar">
                <span>探索者データ</span>
                <span>現在地 / 制作中</span>
              </div>
              <div className="avatar-tile">
                {/* Keep the supplied artwork untouched instead of routing it through image optimization. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="フラネコのアイコン"
                  className="avatar-image"
                  src="/images/huraneko-icon.png"
                />
              </div>
              <div className="status-copy">
                <h2>フラネコ</h2>
                <p>ゲーム表現とシステム開発のあいだを探索しながら、作る力を育成中。</p>
              </div>
              <div className="stat-grid">
                {stats.map(([label, value]) => (
                  <div className="stat" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <p className="depth-readout" aria-hidden="true">
              深度 <span>000</span>
            </p>
          </aside>
        </div>
      </section>

      <section className="game-section dark" id="about" data-scroll-scene>
        <div className="section-inner about-center">
          <p className="section-label">About</p>
          <div>
            <h2>
              思いついたら、
              <br />
              まず小さく動かしてみる。
            </h2>
            <p className="section-copy">
              まだ完成形じゃなくても、まずは置いて、見て、直していく。
              <br />
              このページも制作メモや好きなことを足しながら、少しずつ育てていきます。
            </p>
          </div>
        </div>
      </section>

      <section className="game-section" id="career" data-scroll-scene>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="section-label">Quest Log</p>
              <h2>
                これまでの
                <br />
                クエストログ
              </h2>
            </div>
            <p>
              ゲーム制作の学びから、教育現場の支援、金融系システム開発へ。
              <br />
              進んできたルートを、公開できる範囲でログ化しています。
            </p>
          </div>

          <div className="quest-list">
            {career.map((item, index) => (
              <article className="quest" key={item.year}>
                <div className="quest-marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
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

      <section className="game-section" id="notes" data-scroll-scene>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="section-label">Notes</p>
              <h2>
                小さな実績も、
                <br />
                冒険のログに。
              </h2>
            </div>
            <p>
              いろいろな仕事も、できることだけをログに残す。
              <br />
              試作や制作メモも、積み重ねればちゃんと冒険の記録になる。
            </p>
          </div>

          <div className="note-grid">
            {notes.map((note) => {
              const Card = note.href ? "a" : "article";

              return (
                <Card
                  aria-label={note.href ? `${note.title}をGoogle Playで見る` : undefined}
                  className={`game-card${note.href ? " game-card-link" : ""}`}
                  href={note.href}
                  key={note.title}
                  rel={note.href ? "noopener noreferrer" : undefined}
                  target={note.href ? "_blank" : undefined}
                >
                  <span className="card-tag">{note.tag}</span>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                  {note.href && (
                    <span className="card-link-label">Google Playで見る</span>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="game-section contact-section" id="contact" data-scroll-scene>
        <div className="section-inner contact-panel">
          <div>
            <p className="section-label">Contact</p>
            <h2>次のクエストを相談する。</h2>
          </div>
          <a
            className="game-button primary email-link"
            href="mailto:huraneko1714@gmail.com"
          >
            huraneko1714@gmail.com
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
