const startingPoints = [
  {
    title: "守秘案件の復旧対応",
    description:
      "教育施設向けの監視カメラシステム修理を担当。",
    tag: "Repair",
  },
  {
    title: "制作環境の構築",
    description:
      "ローカルAI画像生成環境のセットアップや、ワークフロー調整を検証しながら進めています。",
    tag: "Setup",
  },
  {
    title: "物語制作の整理",
    description:
      "読み合わせ用シナリオの清書、構成整理、書き出しなど、制作物を形にする作業もしています。",
    tag: "Writing",
  },
];

const strengths = ["企画を形にする", "制作環境を整える", "物語性を見つける"];

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

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#1d1b18]">
      <section className="relative isolate min-h-screen px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_18%,rgba(244,185,66,0.38),transparent_27%),radial-gradient(circle_at_85%_12%,rgba(48,128,126,0.22),transparent_31%),linear-gradient(135deg,#f7f3ec_0%,#eee4d5_48%,#d9e1dc_100%)]" />
        <div className="absolute left-0 top-0 -z-10 h-full w-full opacity-[0.16] [background-image:linear-gradient(#1d1b18_1px,transparent_1px),linear-gradient(90deg,#1d1b18_1px,transparent_1px)] [background-size:42px_42px]" />

        <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-[#1d1b18]/15 pb-5">
          <a className="font-semibold tracking-wide" href="#top">
            huraneko
          </a>
          <div className="hidden items-center gap-6 text-sm text-[#4f4a42] sm:flex">
            <a className="transition hover:text-[#1d1b18]" href="#about">
              About
            </a>
            <a className="transition hover:text-[#1d1b18]" href="#career">
              Career
            </a>
            <a className="transition hover:text-[#1d1b18]" href="#works">
              Notes
            </a>
            <a className="transition hover:text-[#1d1b18]" href="#contact">
              Contact
            </a>
            <a className="transition hover:text-[#1d1b18]" href="/privacy-policy">
              Privacy
            </a>
          </div>
        </nav>

        <div
          id="top"
          className="mx-auto grid max-w-6xl items-center gap-12 py-14 sm:py-20 lg:min-h-[calc(100vh-120px)] lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#1d1b18]/20 bg-white/40 px-4 py-2 text-sm text-[#4f4a42] shadow-sm backdrop-blur">
              Personal homepage / first draft
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.03] sm:text-7xl lg:text-8xl">
              アイデアを、
              <span className="block text-[#26706c]">見える形へ。</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4f4a42] sm:text-xl">
              制作したいものの輪郭をつかみ、物語、画像、Web、ローカル環境まで、
              手を動かしながら形にしていくためのホームページです。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-[#1d1b18] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26706c]"
                href="#works"
              >
                今の状態を見る
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[#1d1b18]/25 bg-white/35 px-6 py-3 text-sm font-semibold text-[#1d1b18] transition hover:bg-white/70"
                href="#contact"
              >
                相談する
              </a>
            </div>
          </div>

          <div className="relative min-h-[430px] sm:min-h-[560px]" aria-label="制作を象徴するビジュアル">
            <div className="absolute inset-x-6 top-4 h-[78%] rotate-[-5deg] rounded-[34px] bg-[#d1462f] shadow-2xl shadow-[#1d1b18]/20" />
            <div className="absolute inset-x-0 top-12 h-[78%] rotate-[4deg] rounded-[34px] border border-[#1d1b18]/10 bg-[#26706c] shadow-2xl shadow-[#1d1b18]/20" />
            <div className="absolute inset-x-4 top-20 h-[78%] rounded-[34px] border border-white/55 bg-[#fff9ed]/85 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between text-sm text-[#6d6559]">
                <span>Now shaping</span>
                <span>2026</span>
              </div>
              <div className="mt-12 space-y-5">
                <div className="h-3 w-24 rounded-full bg-[#d1462f]" />
                <p className="text-4xl font-semibold leading-tight sm:text-5xl">
                  Web,
                  <br />
                  stories,
                  <br />
                  visuals.
                </p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                {strengths.map((item) => (
                  <div
                    className="flex min-h-24 items-end rounded-2xl border border-[#1d1b18]/10 bg-white/55 p-3 text-sm font-medium leading-5"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#1d1b18] px-6 py-20 text-[#fff9ed] sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#f4b942]">About</p>
          <div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
              まだ曖昧な構想からでも、最初の公開できる形まで進めます。
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#d8d0c3]">
              このページはテスト用の初稿です。公開できる範囲の経験だけを載せながら、
              プロフィール写真、好きなこと、制作メモ、SNSリンクなどで少しずつ育てられます。
            </p>
          </div>
        </div>
      </section>

      <section id="career" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 border-b border-[#1d1b18]/15 pb-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#26706c]">Career</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">これまでの歩み</h2>
            </div>
            <p className="max-w-2xl leading-8 text-[#5d554b]">
              学びから現場支援、金融系システムエンジニアへ。公開できる範囲で、
              経歴と実務経験を整理しています。
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {career.map((item) => (
              <article
                className="grid gap-4 rounded-3xl border border-[#1d1b18]/10 bg-white/55 p-6 shadow-sm sm:grid-cols-[130px_1fr]"
                key={item.year}
              >
                <p className="text-lg font-semibold text-[#d1462f]">{item.year}</p>
                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#5d554b]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 border-b border-[#1d1b18]/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#26706c]">Notes</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">公開できる経験から。</h2>
            </div>
            <p className="max-w-md leading-7 text-[#5d554b]">
              実名や場所を出せない仕事は、守秘したまま内容だけ伝える形に。試作や制作メモも、積み重ねれば立派な活動記録になります。
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {startingPoints.map((project) => (
              <article
                className="group min-h-72 rounded-3xl border border-[#1d1b18]/10 bg-white/55 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl"
                key={project.title}
              >
                <div className="mb-16 inline-flex rounded-full bg-[#f4b942]/35 px-3 py-1 text-sm font-medium text-[#6e4c00]">
                  {project.tag}
                </div>
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="mt-4 leading-7 text-[#5d554b]">{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[34px] bg-[#26706c] p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#f4d384]">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">次に作るものを話しましょう。</h2>
          </div>
          <a
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d1b18] transition hover:bg-[#f4d384]"
            href="mailto:hello@example.com"
          >
            hello@example.com
          </a>
        </div>
      </section>

      <footer className="px-6 pb-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-[#1d1b18]/15 pt-6 text-sm text-[#5d554b] sm:flex-row sm:items-center sm:justify-between">
          <p>© huraneko</p>
          <div className="flex gap-5">
            <a className="transition hover:text-[#1d1b18]" href="/privacy-policy">
              Privacy Policy
            </a>
            <a className="transition hover:text-[#1d1b18]" href="/app-ads.txt">
              app-ads.txt
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
