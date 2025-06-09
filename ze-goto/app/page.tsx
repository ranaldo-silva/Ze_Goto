import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-950 to-blue-900 text-white min-h-screen font-sans">
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold text-white">Bem-vindo ao Projeto Zé Goto</h1>
        <p className="mt-4 text-lg">Sistema de monitoramento inteligente de galerias subterrâneas com robôs autônomos.</p>
      </section>

      <section className="text-center px-4 py-8">
        <h2 className="text-2xl font-semibold text-white">Como o Sistema Funciona</h2>
        <p className="mt-2 max-w-3xl mx-auto">
          Uma rede inteligente de robôs monitora continuamente as galerias subterrâneas, detectando problemas antes que se tornem críticos.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { src: "/image/icons/shield.png", alt: "Imagem de um escudo", title: "Monitoramento", desc: "Vigilância contínua das galerias subterrâneas de São Paulo" },
            { src: "/image/icons/olho.png", alt: "Imagem de um olho", title: "Visão Computacional", desc: "Detecção automática de obstruções e problemas estruturais" },
            { src: "/image/icons/sinos.png", alt: "Imagem de um sino", title: "Alertas em Tempo Real", desc: "Notificações instantâneas sobre situações críticas" },
            { src: "/image/icons/ping.png", alt: "Imagem de um ícone de mapa", title: "Mapeamento Preciso", desc: "Localização exata dos robôs e pontos de interesse" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-950 p-4 rounded-lg transition transform hover:scale-105 hover:shadow-xl"
            >
              <img src={item.src} alt={item.alt} className="w-16 h-16 mx-auto mb-2" />
              <h3 className="font-bold text-blue-300">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12">
        <h2 className="text-2xl font-semibold text-center text-white">Processo de Monitoramento</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { number: "1", color: "text-blue-400", src: "/image/icons/processador.png", alt: "Imagem de um chip", title: "Patrulhamento Autônomo", desc: "Robôs navegam pelas galerias seguindo rotas otimizadas" },
            { number: "2", color: "text-purple-400", src: "/image/icons/lupa.png", alt: "Imagem de uma lupa", title: "Análise em Tempo Real", desc: "Câmeras analisam estruturas e detectam anomalias" },
            { number: "3", color: "text-green-400", src: "/image/icons/lampada.png", alt: "Imagem de uma lâmpada", title: "Alertas Inteligentes", desc: "Sistema envia notificações prioritárias para equipes de manutenção" },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-3xl font-bold ${item.color}`}>{item.number}</div>
              <img src={item.src} alt={item.alt} className="w-16 h-16 mx-auto my-2" />
              <h3 className="font-semibold text-white mt-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12">
        <h2 className="text-2xl font-semibold text-center text-white">Nossa Equipe</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              src: "/image/IMG-Ronaldo.jpg",
              alt: "Ranaldo José da Silva",
              name: "Ranaldo José da Silva",
              rm: "RM559210",
              github: "https://github.com/Ronaldo511722",
              linkedin: "https://www.linkedin.com/in/ranaldo-jos%C3%A9-da-silva-301955163/",
            },
            {
              src: "/image/IMG-Fabricio.jpg",
              alt: "Fabricio José da Silva",
              name: "Fabricio José da Silva",
              rm: "RM560694",
              github: "https://github.com/FabricioJ0se",
              linkedin: "https://www.linkedin.com/in/fabricio-jose-da-silva/",
            },
            {
              src: "/image/IMG-Lucas.jpg",
              alt: "Lucas Barbosa da Ressurreição",
              name: "Lucas Barbosa da Ressurreição",
              rm: "RM560179",
              github: "https://github.com/LucasRB-Tec",
              linkedin: "https://www.linkedin.com/in/lucas-ressurreicao/",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-blue-950 p-4 rounded-lg text-center transition transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={member.src}
                alt={member.alt}
                className="rounded-lg w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
              />
              <h3 className="font-bold mt-2">{member.name}</h3>
              <p>{member.rm}</p>
              <div className="flex justify-center gap-4 mt-2 text-blue-300">
                <a href={member.github}>GitHub</a>
                <a href={member.linkedin}>LinkedIn</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold">Pronto para Explorar?</h2>
        <p className="mt-2">Acesse o dashboard completo e monitore em tempo real a rede de robôs guardiões das galerias subterrâneas de São Paulo.</p>
        <Link href="/telaTeste">
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full">
            Acessar o Dashboard →
          </button>
        </Link>
      </section>
    </main>
  );
}
