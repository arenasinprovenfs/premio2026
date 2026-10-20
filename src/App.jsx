import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Lista Oficial de Associados e Goleiros da Arena
export const ASSOCIADOS_OPCOES = [
  "Adriano", "Albino", "Amaury", "André", "Babinha", "Ballet", "Beradeiro", "Canário", 
  "Capela", "Carioca", "Dai", "Diniz", "Dyeggo", "Filipinho", "Gamarra", "Garcia", 
  "Guga", "Gusta", "Gutto", "Harley", "I. Galvão", "Jandir", "Jefinho", "Juracy", 
  "Kiko", "Lucas", "M. Galvão", "M. Yuri", "Marcola", "Marcelinho", "Michel", "Minuano", 
  "Miskinis", "Morais", "Murilo", "Nando", "Oliveira", "Otaner", "PH", "PJ", 
  "R. Mateus", "Rafa", "Rafael Santana", "Rapha Diniz", "Raul", "Reinaldo", "Remi", 
  "Ricardo", "Robério", "Rodrigo", "Talisca", "Vanderson", "Vini HC", "Zé Paulo"
].sort();

export const GOLEIROS_OPCOES = ["Tellê", "Baianinho", "Roberto", "Rogério", "Adriel"];

// Dados Iniciais do Campeonato (Fallback)
const RODADAS_INICIAIS = [
  {
    data: "18/10/2026",
    rodada: "Rodada 1",
    jogos: [
      {
        id: "r1_j1",
        partida: "Partida 1",
        timeA: "Time Adriel",
        timeB: "Time Tellê",
        golsA: 2,
        golsB: 2,
        goleiroA: "Adriel",
        goleiroB: "Tellê",
        jogadoresA: ["I. Galvão", "Capela", "Vini HC", "Marcola", "Minuano", "Rodrigo", "Remi"],
        jogadoresB: ["Robério", "Amaury", "Rafael Santana", "Adriano", "Canário", "Morais", "Gutto"],
        golsMarcados: [
          { jogador: "Remi", quantidade: 2 },
          { jogador: "Gutto", quantidade: 1 }
        ]
      },
      {
        id: "r1_j2",
        partida: "Partida 2",
        timeA: "Time Baianinho",
        timeB: "Time Roberto",
        golsA: 9,
        golsB: 3,
        goleiroA: "Baianinho",
        goleiroB: "Roberto",
        jogadoresA: ["Rapha Diniz", "Reinaldo", "M. Galvão", "Nando", "Raul"],
        jogadoresB: ["Ballet", "Oliveira", "R. Mateus", "PJ", "Talisca", "Diniz", "Ricardo"],
        golsMarcados: [
          { jogador: "Nando", quantidade: 3 },
          { jogador: "Raul", quantidade: 5 },
          { jogador: "R. Mateus", quantidade: 1 },
          { jogador: "Diniz", quantidade: 2 }
        ]
      }
    ]
  }
];

const MANGABEIRA_BASE = [
  { nome: "Adriano", pontos: 65 }, { nome: "Rodrigo", pontos: 56 }, { nome: "Jandir", pontos: 56 },
  { nome: "Ballet", pontos: 55 }, { nome: "Robério", pontos: 54 }, { nome: "Lucas", pontos: 51 },
  { nome: "Talisca", pontos: 51 }, { nome: "Rafa", pontos: 50 }, { nome: "Ricardo", pontos: 47 },
  { nome: "Raul", pontos: 47 }, { nome: "Canário", pontos: 46 }, { nome: "Reinaldo", pontos: 46 },
  { nome: "Remi", pontos: 45 }, { nome: "Minuano", pontos: 45 }, { nome: "Rafael Santana", pontos: 44 },
  { nome: "PJ", pontos: 44 }, { nome: "Albino", pontos: 44 }, { nome: "Amaury", pontos: 43 },
  { nome: "Capela", pontos: 42 }, { nome: "Vini HC", pontos: 41 }, { nome: "M. Yuri", pontos: 40 },
  { nome: "Oliveira", pontos: 40 }, { nome: "Rapha Diniz", pontos: 40 }, { nome: "I. Galvão", pontos: 38 },
  { nome: "Gamarra", pontos: 37 }, { nome: "Morais", pontos: 37 }, { nome: "Vanderson", pontos: 36 },
  { nome: "R. Mateus", pontos: 34 }, { nome: "André", pontos: 34 }, { nome: "Michel", pontos: 31 },
  { nome: "Garcia", pontos: 31 }, { nome: "Marcelinho", pontos: 30 }, { nome: "Harley", pontos: 30 },
  { nome: "M. Galvão", pontos: 28 }, { nome: "Filipinho", pontos: 28 }, { nome: "Nando", pontos: 27 },
  { nome: "Otaner", pontos: 26 }, { nome: "Gusta", pontos: 26 }, { nome: "Murilo", pontos: 25 },
  { nome: "Gutto", pontos: 25 }, { nome: "Diniz", pontos: 23 }, { nome: "Dyeggo", pontos: 20 },
  { nome: "Carioca", pontos: 18 }, { nome: "Zé Paulo", pontos: 16 }, { nome: "Juracy", pontos: 13 },
  { nome: "Kiko", pontos: 13 }, { nome: "PH", pontos: 11 }, { nome: "Babinha", pontos: 8 },
  { nome: "Marcola", pontos: 8 }, { nome: "Guga", pontos: 7 }, { nome: "Miskinis", pontos: 6 },
  { nome: "Dai", pontos: 4 }, { nome: "Gilberto", pontos: 3 }, { nome: "Jefinho", pontos: 3 }
];

const BROCADOR_BASE = [
  { nome: "Remi", gols: 50 }, { nome: "Rodrigo", gols: 45 }, { nome: "Raul", gols: 44 },
  { nome: "Rafa", gols: 36 }, { nome: "Lucas", gols: 29 }, { nome: "Ricardo", gols: 29 },
  { nome: "Jandir", gols: 25 }, { nome: "M. Yuri", gols: 23 }, { nome: "Gutto", gols: 22 },
  { nome: "Murilo", gols: 19 }, { nome: "Nando", gols: 18 }, { nome: "Adriano", gols: 15 },
  { nome: "Diniz", gols: 12 }, { nome: "André", gols: 12 }, { nome: "PH", gols: 11 },
  { nome: "Canário", gols: 11 }, { nome: "Vini HC", gols: 11 }, { nome: "Gamarra", gols: 10 },
  { nome: "Vanderson", gols: 10 }, { nome: "R. Mateus", gols: 10 }, { nome: "Gusta", gols: 9 },
  { nome: "Morais", gols: 8 }, { nome: "Robério", gols: 7 }, { nome: "Talisca", gols: 7 },
  { nome: "Filipinho", gols: 7 }, { nome: "Ballet", gols: 6 }, { nome: "Carioca", gols: 6 },
  { nome: "Michel", gols: 5 }, { nome: "Minuano", gols: 5 }, { nome: "PJ", gols: 4 },
  { nome: "Otaner", gols: 4 }, { nome: "Reinaldo", gols: 4 }, { nome: "Jefinho", gols: 3 },
  { nome: "Juracy", gols: 3 }, { nome: "Marcelinho", gols: 3 }, { nome: "Capela", gols: 3 },
  { nome: "Guga", gols: 3 }, { nome: "Dai", gols: 2 }, { nome: "Tellê", gols: 2 },
  { nome: "Rapha Diniz", gols: 2 }, { nome: "Albino", gols: 2 }, { nome: "Zé Paulo", gols: 2 },
  { nome: "Dyeggo", gols: 1 }, { nome: "Babinha", gols: 1 }, { nome: "Garcia", gols: 1 },
  { nome: "M. Galvão", gols: 1 }, { nome: "Amaury", gols: 1 }, { nome: "Ivamário", gols: 1 },
  { nome: "Rafha Santana", gols: 1 }, { nome: "Oliveira", gols: 1 }, { nome: "Marcola", gols: 1 },
  { nome: "Beradeiro", gols: 1 }
];

const CESAR_BASE = [
  { nome: 'Tellê', pontos: 79, golsSofridos: 106 },
  { nome: 'Baianinho', pontos: 54, golsSofridos: 177 },
  { nome: 'Roberto', pontos: 46, golsSofridos: 118 },
  { nome: 'Rogério', pontos: 16, golsSofridos: 52 },
  { nome: 'Adriel', pontos: 1, golsSofridos: 2 }
];

export default function App() {
  const [aba, setAba] = useState('geral');
  const [rodadas, setRodadas] = useState(() => {
    try {
      const saved = localStorage.getItem('arena_rodadas_2026');
      return saved ? JSON.parse(saved) : RODADAS_INICIAIS;
    } catch {
      return RODADAS_INICIAIS;
    }
  });

  const [dataSelecionada, setDataSelecionada] = useState(rodadas[0]?.data || '18/10/2026');

  // Estado do Admin / Formulário
  const [adminAuth, setAdminAuth] = useState(false);
  const [senhaInput, setSenhaInput] = useState('');
  const [erroSenha, setErroSenha] = useState(false);

  // Form State para Novo Jogo
  const [novaData, setNovaData] = useState(() => new Date().toISOString().split('T')[0]);
  const [nomePartida, setNomePartida] = useState('Partida 1');
  const [timeANome, setTimeANome] = useState('Time Verde');
  const [timeBNome, setTimeBNome] = useState('Time Vermelho');
  const [golsAInput, setGolsAInput] = useState(0);
  const [golsBInput, setGolsBInput] = useState(0);
  const [goleiroA, setGoleiroA] = useState(GOLEIROS_OPCOES[0]);
  const [goleiroB, setGoleiroB] = useState(GOLEIROS_OPCOES[1]);
  const [jogadoresA, setJogadoresA] = useState([]);
  const [jogadoresB, setJogadoresB] = useState([]);
  const [golsAutores, setGolsAutores] = useState([]); // [{ jogador: 'Adriano', quantidade: 1 }]
  const [sucessoSalvar, setSucessoSalvar] = useState(false);

  // Salvar no LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('arena_rodadas_2026', JSON.stringify(rodadas));
    } catch (e) {
      console.error("Erro ao salvar no LocalStorage", e);
    }
  }, [rodadas]);

  useEffect(() => {
    if (rodadas.length > 0 && !rodadas.find(r => r.data === dataSelecionada)) {
      setDataSelecionada(rodadas[0].data);
    }
  }, [rodadas, dataSelecionada]);

  // Recalcular rankings combinando Base + Rodadas Salvas
  const calcularRankings = () => {
    const mangMap = {};
    const brocMap = {};
    const cesarMap = {};

    // Inicializar com base
    MANGABEIRA_BASE.forEach(p => { mangMap[p.nome] = p.pontos; });
    ASSOCIADOS_OPCOES.forEach(n => { if (mangMap[n] === undefined) mangMap[n] = 0; });

    BROCADOR_BASE.forEach(p => { brocMap[p.nome] = p.gols; });
    ASSOCIADOS_OPCOES.forEach(n => { if (brocMap[n] === undefined) brocMap[n] = 0; });

    CESAR_BASE.forEach(g => {
      cesarMap[g.nome] = { pontos: g.pontos, golsSofridos: g.golsSofridos };
    });
    GOLEIROS_OPCOES.forEach(g => {
      if (!cesarMap[g]) cesarMap[g] = { pontos: 0, golsSofridos: 0 };
    });

    // Somar todas as rodadas
    rodadas.forEach(r => {
      r.jogos.forEach(j => {
        const ptsA = j.golsA > j.golsB ? 3 : (j.golsA === j.golsB ? 1 : 0);
        const ptsB = j.golsB > j.golsA ? 3 : (j.golsA === j.golsB ? 1 : 0);

        // Pontos Jogadores A
        (j.jogadoresA || []).forEach(nome => {
          mangMap[nome] = (mangMap[nome] || 0) + ptsA;
        });

        // Pontos Jogadores B
        (j.jogadoresB || []).forEach(nome => {
          mangMap[nome] = (mangMap[nome] || 0) + ptsB;
        });

        // Gols Marcados (Artilharia)
        (j.golsMarcados || []).forEach(g => {
          brocMap[g.jogador] = (brocMap[g.jogador] || 0) + (Number(g.quantidade) || 0);
        });

        // Goleiros
        if (j.goleiroA && cesarMap[j.goleiroA]) {
          cesarMap[j.goleiroA].pontos += ptsA;
          cesarMap[j.goleiroA].golsSofridos += Number(j.golsB) || 0;
        }
        if (j.goleiroB && cesarMap[j.goleiroB]) {
          cesarMap[j.goleiroB].pontos += ptsB;
          cesarMap[j.goleiroB].golsSofridos += Number(j.golsA) || 0;
        }
      });
    });

    const rankingMangabeira = Object.keys(mangMap)
      .map(nome => ({ nome, pontos: mangMap[nome] }))
      .sort((a, b) => b.pontos - a.pontos)
      .map((item, index) => ({ ...item, pos: index + 1 }));

    const rankingBrocador = Object.keys(brocMap)
      .map(nome => ({ nome, gols: brocMap[nome] }))
      .sort((a, b) => b.gols - a.gols)
      .map((item, index) => ({ ...item, pos: index + 1 }));

    const rankingCesar = Object.keys(cesarMap)
      .map(nome => ({
        nome,
        pontos: cesarMap[nome].pontos,
        golsSofridos: cesarMap[nome].golsSofridos
      }))
      .sort((a, b) => b.pontos - a.pontos)
      .map((item, index) => ({ ...item, pos: index + 1 }));

    return { rankingMangabeira, rankingBrocador, rankingCesar };
  };

  const { rankingMangabeira, rankingBrocador, rankingCesar } = calcularRankings();

  const rodadaAtual = rodadas.find(r => r.data === dataSelecionada) || rodadas[0];

  // Métodos do Formulário
  const toggleJogadorA = (nome) => {
    if (jogadoresA.includes(nome)) {
      setJogadoresA(jogadoresA.filter(n => n !== nome));
    } else {
      setJogadoresA([...jogadoresA, nome]);
      setJogadoresB(jogadoresB.filter(n => n !== nome)); // Remove do B se estiver
    }
  };

  const toggleJogadorB = (nome) => {
    if (jogadoresB.includes(nome)) {
      setJogadoresB(jogadoresB.filter(n => n !== nome));
    } else {
      setJogadoresB([...jogadoresB, nome]);
      setJogadoresA(jogadoresA.filter(n => n !== nome)); // Remove do A se estiver
    }
  };

  const handleAlterarGolsAutor = (jogador, quantidade) => {
    const qtd = Math.max(0, quantidade);
    const existe = golsAutores.find(g => g.jogador === jogador);
    if (qtd === 0) {
      setGolsAutores(golsAutores.filter(g => g.jogador !== jogador));
    } else if (existe) {
      setGolsAutores(golsAutores.map(g => g.jogador === jogador ? { ...g, quantidade: qtd } : g));
    } else {
      setGolsAutores([...golsAutores, { jogador, quantidade: qtd }]);
    }
  };

  const handleSalvarRodada = (e) => {
    e.preventDefault();
    if (!novaData) return;

    // Formatar data para DD/MM/YYYY se necessário
    const partesData = novaData.split('-');
    const dataFormatada = partesData.length === 3 ? `${partesData[2]}/${partesData[1]}/${partesData[0]}` : novaData;

    const novoJogoObj = {
      id: `j_${Date.now()}`,
      partida: nomePartida || "Partida",
      timeA: timeANome || "Time A",
      timeB: timeBNome || "Time B",
      golsA: Number(golsAInput) || 0,
      golsB: Number(golsBInput) || 0,
      goleiroA: goleiroA,
      goleiroB: goleiroB,
      jogadoresA: jogadoresA,
      jogadoresB: jogadoresB,
      golsMarcados: golsAutores
    };

    setRodadas(prevRodadas => {
      const idx = prevRodadas.findIndex(r => r.data === dataFormatada);
      if (idx >= 0) {
        // Adiciona à rodada existente daquela data
        const rodadasAtualizadas = [...prevRodadas];
        rodadasAtualizadas[idx] = {
          ...rodadasAtualizadas[idx],
          jogos: [novoJogoObj, ...rodadasAtualizadas[idx].jogos]
        };
        return rodadasAtualizadas;
      } else {
        // Cria nova data de rodada
        return [
          {
            data: dataFormatada,
            rodada: `Rodada (${dataFormatada})`,
            jogos: [novoJogoObj]
          },
          ...prevRodadas
        ];
      }
    });

    setDataSelecionada(dataFormatada);
    setSucessoSalvar(true);
    setTimeout(() => setSucessoSalvar(false), 3000);

    // Reset formulário leve
    setJogadoresA([]);
    setJogadoresB([]);
    setGolsAutores([]);
    setGolsAInput(0);
    setGolsBInput(0);
  };

  const handleResetDados = () => {
    if (window.confirm("Deseja realmente restaurar os dados originais do campeonato? Todas as rodadas cadastradas pelo celular serão apagadas.")) {
      setRodadas(RODADAS_INICIAIS);
      localStorage.removeItem('arena_rodadas_2026');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (senhaInput === 'sinprovenfs2026' || senhaInput === 'admin' || senhaInput === '1234') {
      setAdminAuth(true);
      setErroSenha(false);
    } else {
      setErroSenha(true);
    }
  };

  // Badges visuais
  const getPodioBadgeG7 = (pos) => {
    if (pos <= 7) {
      return (
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1 w-fit">
          ⭐ #{pos} G7
        </span>
      );
    }
    return <span className="text-emerald-300/40 font-semibold px-2">#{pos}</span>;
  };

  const getPodioApenasPrimeiro = (pos, corBadge = 'emerald') => {
    if (pos === 1) {
      const bg = corBadge === 'red' ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      return (
        <span className={`${bg} border px-2.5 py-1 rounded-lg font-extrabold text-xs sm:text-sm flex items-center gap-1 w-fit`}>
          🏆 #1º Lugar
        </span>
      );
    }
    return <span className="text-emerald-300/40 font-semibold px-2">#{pos}</span>;
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-3 sm:p-6 md:p-8 font-sans">
      {/* Header com a Logo */}
      <header className="mb-6 border-b border-emerald-800/60 pb-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start">
          <img 
            src="/logo.png" 
            alt="Logo Arena Sinprovenfs" 
            className="h-14 sm:h-20 w-auto object-contain rounded-xl bg-white p-1.5 shadow-md border border-emerald-700"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="text-center md:text-left">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2">
              ARENA SINPROVENFS
            </h1>
            <p className="text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase">Painel Oficial de Prêmios 2026</p>
          </div>
        </div>

        {/* Menu de Navegação em Abas */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-emerald-900/80 p-1.5 rounded-xl border border-emerald-800 w-full md:w-auto">
          <button 
            onClick={() => setAba('geral')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${aba === 'geral' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
          >
            Visão Geral
          </button>
          <button 
            onClick={() => setAba('jogos')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${aba === 'jogos' ? 'bg-teal-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
          >
            ⚽ Jogos
          </button>
          <button 
            onClick={() => setAba('mangabeira')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${aba === 'mangabeira' ? 'bg-emerald-600 text-white shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
          >
            Mangabeira
          </button>
          <button 
            onClick={() => setAba('brocador')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${aba === 'brocador' ? 'bg-red-600 text-white shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
          >
            Brocador
          </button>
          <button 
            onClick={() => setAba('cesar')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${aba === 'cesar' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
          >
            César
          </button>
          <button 
            onClick={() => setAba('admin')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all flex items-center gap-1 ${aba === 'admin' ? 'bg-amber-400 text-slate-950 font-black shadow-lg animate-pulse' : 'bg-emerald-800/80 text-amber-300 hover:bg-emerald-700'}`}
          >
            ➕ Cadastrar
          </button>
        </div>
      </header>

      {/* ABA VISÃO GERAL */}
      {aba === 'geral' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-emerald-900/50 p-5 sm:p-6 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-md">Prêmio Mangabeira</span>
              <p className="text-emerald-200/70 text-xs sm:text-sm mt-3">Líder do Ranking</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{rankingMangabeira[0]?.nome}</p>
              <p className="text-emerald-400 font-bold text-base sm:text-lg mt-1">{rankingMangabeira[0]?.pontos} <span className="text-xs font-normal text-emerald-200/60">pontos</span></p>
            </div>

            <div className="bg-emerald-900/50 p-5 sm:p-6 rounded-2xl border border-red-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/20 px-2.5 py-1 rounded-md">Prêmio Brocador</span>
              <p className="text-emerald-200/70 text-xs sm:text-sm mt-3">Artilheiro Máximo</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{rankingBrocador[0]?.nome}</p>
              <p className="text-red-400 font-bold text-base sm:text-lg mt-1">{rankingBrocador[0]?.gols} <span className="text-xs font-normal text-emerald-200/60">gols</span></p>
            </div>

            <div className="bg-emerald-900/50 p-5 sm:p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-md">Prêmio César</span>
              <p className="text-emerald-200/70 text-xs sm:text-sm mt-3">Melhor Goleiro</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{rankingCesar[0]?.nome}</p>
              <p className="text-amber-300 font-bold text-base sm:text-lg mt-1">{rankingCesar[0]?.pontos} <span className="text-xs font-normal text-emerald-200/60">pts ({rankingCesar[0]?.golsSofridos} GS)</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
              <p className="text-emerald-200/60 text-xs mb-4">Primeiros 10 colocados na classificação geral</p>
              <div className="h-72 sm:h-80 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingMangabeira.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                    <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={60} />
                    <YAxis stroke="#a7f3d0" />
                    <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="pontos" name="Pontos" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
              <p className="text-emerald-200/60 text-xs mb-4">Primeiros 10 colocados em número de gols</p>
              <div className="h-72 sm:h-80 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingBrocador.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                    <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={60} />
                    <YAxis stroke="#a7f3d0" />
                    <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="gols" name="Gols" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ABA JOGOS DA RODADA COM SELEÇÃO POR DATA */}
      {aba === 'jogos' && (
        <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-emerald-800/60 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-teal-300 flex items-center gap-2">
                ⚽ Súmula e Resultados das Partidas
              </h2>
              <p className="text-emerald-200/60 text-xs sm:text-sm mt-1">Histórico de partidas armazenadas e atualizadas</p>
            </div>

            {/* Filtro por Data */}
            <div className="flex items-center gap-2 bg-emerald-950 p-2 rounded-xl border border-emerald-700 w-full sm:w-auto">
              <span className="text-xs font-bold text-emerald-400 uppercase whitespace-nowrap">📅 Data:</span>
              <select 
                value={dataSelecionada} 
                onChange={(e) => setDataSelecionada(e.target.value)}
                className="bg-emerald-900 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-emerald-600 focus:outline-none w-full"
              >
                {rodadas.map(r => (
                  <option key={r.data} value={r.data}>
                    {r.data} ({r.rodada})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {rodadaAtual?.jogos.map((j) => (
              <div key={j.id} className="bg-emerald-950/90 p-4 sm:p-5 rounded-2xl border border-emerald-800/80 shadow-lg">
                <div className="flex justify-between items-center mb-3 border-b border-emerald-800/60 pb-2">
                  <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">{j.partida}</span>
                  <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    Súmula Finalizada
                  </span>
                </div>

                {/* Placar Principal */}
                <div className="flex justify-between items-center my-4">
                  <div className="w-2/5 text-right">
                    <p className="font-extrabold text-white text-sm sm:text-lg leading-tight">{j.timeA}</p>
                    <p className="text-[11px] sm:text-xs text-amber-300 font-semibold mt-1">🧤 {j.goleiroA}</p>
                  </div>

                  <div className="bg-emerald-900 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-amber-300 text-xl sm:text-2xl border-2 border-emerald-600 shadow-inner mx-2">
                    {j.golsA} x {j.golsB}
                  </div>

                  <div className="w-2/5 text-left">
                    <p className="font-extrabold text-white text-sm sm:text-lg leading-tight">{j.timeB}</p>
                    <p className="text-[11px] sm:text-xs text-amber-300 font-semibold mt-1">🧤 {j.goleiroB}</p>
                  </div>
                </div>

                {/* Escalação dos Times */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-5 pt-3 border-t border-emerald-900">
                  <div className="bg-emerald-900/30 p-2.5 sm:p-3 rounded-xl border border-emerald-800/40">
                    <p className="text-[11px] font-bold text-emerald-300 mb-1.5 uppercase">Escalação {j.timeA}:</p>
                    <div className="flex flex-wrap gap-1">
                      {j.jogadoresA && j.jogadoresA.map(nome => (
                        <span key={nome} className="bg-emerald-950 text-emerald-200 text-[11px] px-2 py-0.5 rounded-md border border-emerald-800">
                          {nome}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-900/30 p-2.5 sm:p-3 rounded-xl border border-emerald-800/40">
                    <p className="text-[11px] font-bold text-emerald-300 mb-1.5 uppercase">Escalação {j.timeB}:</p>
                    <div className="flex flex-wrap gap-1">
                      {j.jogadoresB && j.jogadoresB.map(nome => (
                        <span key={nome} className="bg-emerald-950 text-emerald-200 text-[11px] px-2 py-0.5 rounded-md border border-emerald-800">
                          {nome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Autores dos Gols */}
                {j.golsMarcados && j.golsMarcados.length > 0 && (
                  <div className="mt-3 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/60">
                    <p className="text-[11px] font-bold text-amber-300 mb-1">⚽ Autores dos Gols:</p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-emerald-100">
                      {j.golsMarcados.map((g, idx) => (
                        <span key={idx} className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/20 text-[11px] font-medium">
                          {g.jogador} ({g.quantidade} {g.quantidade > 1 ? 'gols' : 'gol'})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA MANGABEIRA */}
      {aba === 'mangabeira' && (
        <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">Classificação Geral - Prêmio Mangabeira</h2>
              <p className="text-emerald-200/60 text-xs sm:text-sm mt-0.5">Destaque especial para a zona de elite (Top 7 G7)</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              G7 Destacado
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-800 text-emerald-300/70 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Classificação</th>
                  <th className="py-3 px-3">Jogador</th>
                  <th className="py-3 px-3 text-right">Pontuação Geral</th>
                </tr>
              </thead>
              <tbody>
                {rankingMangabeira.map((item) => {
                  const isTop7 = item.pos <= 7;
                  return (
                    <tr 
                      key={item.nome} 
                      className={`border-b transition-all ${
                        isTop7 
                          ? 'bg-gradient-to-r from-emerald-800/60 via-emerald-900/40 to-emerald-950 border-emerald-500/30 font-semibold' 
                          : 'border-emerald-800/40 hover:bg-emerald-900/30 text-emerald-100'
                      }`}
                    >
                      <td className="py-3 px-3">{getPodioBadgeG7(item.pos)}</td>
                      <td className={`py-3 px-3 ${isTop7 ? 'text-white font-bold text-sm sm:text-base' : 'font-medium text-xs sm:text-sm'}`}>
                        {item.nome}
                      </td>
                      <td className="py-3 px-3 text-right font-black text-amber-300 text-sm sm:text-base">
                        {item.pontos} <span className="text-[10px] text-emerald-200/60 font-normal">pts</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ABA BROCADOR */}
      {aba === 'brocador' && (
        <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-400">Classificação Geral - Prêmio Brocador</h2>
              <p className="text-emerald-200/60 text-xs sm:text-sm mt-0.5">Ranking de artilharia completo</p>
            </div>
            <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">{rankingBrocador.length} Jogadores</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-800 text-emerald-300/70 text-xs font-bold uppercase">
                  <th className="py-3 px-3">Posição</th>
                  <th className="py-3 px-3">Jogador</th>
                  <th className="py-3 px-3 text-right">Total de Gols</th>
                </tr>
              </thead>
              <tbody>
                {rankingBrocador.map((item) => {
                  const isLider = item.pos === 1;
                  return (
                    <tr 
                      key={item.nome} 
                      className={`border-b transition-all ${
                        isLider 
                          ? 'bg-red-950/40 border-red-500/30 font-semibold' 
                          : 'border-emerald-800/40 hover:bg-emerald-900/30'
                      }`}
                    >
                      <td className="py-3 px-3">{getPodioApenasPrimeiro(item.pos, 'red')}</td>
                      <td className={`py-3 px-3 ${isLider ? 'text-white font-bold text-sm sm:text-base' : 'font-medium text-xs sm:text-sm'}`}>
                        {item.nome}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-red-400 text-sm sm:text-base">
                        {item.gols} gols
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ABA GOLEIROS (CÉSAR) */}
      {aba === 'cesar' && (
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-300 mb-1">Prêmio César - Gráfico dos Goleiros</h2>
            <p className="text-emerald-200/60 text-xs sm:text-sm mb-6">Comparação entre Pontos obtidos e Gols Sofridos</p>
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingCesar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                  <XAxis dataKey="nome" stroke="#a7f3d0" />
                  <YAxis stroke="#a7f3d0" />
                  <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="pontos" name="Pontos" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="golsSofridos" name="Gols Sofridos" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Tabela de Classificação dos Goleiros</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800 text-emerald-300/70 text-xs font-bold uppercase">
                    <th className="py-3 px-3">Posição</th>
                    <th className="py-3 px-3">Goleiro</th>
                    <th className="py-3 px-3 text-center">Pontos</th>
                    <th className="py-3 px-3 text-right">Gols Sofridos</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingCesar.map((item) => {
                    const isLider = item.pos === 1;
                    return (
                      <tr 
                        key={item.nome} 
                        className={`border-b transition-all ${
                          isLider 
                            ? 'bg-amber-950/40 border-amber-500/30 font-semibold' 
                            : 'border-emerald-800/40 hover:bg-emerald-900/30'
                        }`}
                      >
                        <td className="py-3 px-3">{getPodioApenasPrimeiro(item.pos, 'amber')}</td>
                        <td className={`py-3 px-3 ${isLider ? 'text-white font-bold text-sm sm:text-base' : 'font-medium text-xs sm:text-sm'}`}>
                          {item.nome}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-amber-300 text-sm">{item.pontos} pts</td>
                        <td className="py-3 px-3 text-right font-bold text-red-400 text-sm">{item.golsSofridos} GS</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ABA ADMIN: CADASTRAR JOGO (CELULAR) */}
      {aba === 'admin' && (
        <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80 max-w-2xl mx-auto">
          {!adminAuth ? (
            <div className="bg-emerald-950 p-6 rounded-2xl border border-emerald-700 text-center max-w-md mx-auto my-8">
              <div className="text-4xl mb-3">🔒</div>
              <h2 className="text-xl font-black text-white mb-2">Acesso do Administrador</h2>
              <p className="text-emerald-200/70 text-xs mb-6">Digite a senha para desbloquear o lançamento de partidas pelo celular.</p>
              
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <input 
                  type="password"
                  value={senhaInput}
                  onChange={(e) => setSenhaInput(e.target.value)}
                  placeholder="Digite a senha..."
                  className="w-full bg-emerald-900 text-white text-center font-bold px-4 py-3 rounded-xl border border-emerald-600 focus:outline-none focus:border-amber-400"
                />
                {erroSenha && <p className="text-red-400 text-xs font-bold">Senha incorreta. Tente "sinprovenfs2026"</p>}
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Desbloquear Painel
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-emerald-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-amber-300 flex items-center gap-2">
                    📱 Cadastrar Nova Partida
                  </h2>
                  <p className="text-emerald-200/60 text-xs mt-0.5">Preencha os dados e salve na hora pelo celular!</p>
                </div>
                <button 
                  onClick={() => setAdminAuth(false)} 
                  className="text-xs bg-emerald-950 hover:bg-emerald-800 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-700"
                >
                  🔒 Sair
                </button>
              </div>

              {sucessoSalvar && (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 p-3 rounded-xl mb-6 text-xs sm:text-sm font-bold flex items-center gap-2">
                  ✅ Jogo e pontos salvos com sucesso no sistema!
                </div>
              )}

              <form onSubmit={handleSalvarRodada} className="space-y-6">
                {/* Data e Nome da Partida */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-950 p-4 rounded-xl border border-emerald-800">
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">📅 Data da Rodada:</label>
                    <input 
                      type="date" 
                      value={novaData}
                      onChange={(e) => setNovaData(e.target.value)}
                      className="w-full bg-emerald-900 text-white text-sm font-bold p-2.5 rounded-lg border border-emerald-700 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">📌 Identificador da Partida:</label>
                    <input 
                      type="text" 
                      value={nomePartida}
                      onChange={(e) => setNomePartida(e.target.value)}
                      placeholder="Ex: Partida 1"
                      className="w-full bg-emerald-900 text-white text-sm font-bold p-2.5 rounded-lg border border-emerald-700 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Placar e Nomes dos Times */}
                <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 space-y-4">
                  <h3 className="text-xs font-black uppercase text-amber-300">⚽ Placar da Partida</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-200 mb-1">Time A (Nome):</label>
                      <input 
                        type="text" 
                        value={timeANome}
                        onChange={(e) => setTimeANome(e.target.value)}
                        className="w-full bg-emerald-900 text-white text-xs font-bold p-2 rounded-lg border border-emerald-700"
                      />
                      <label className="block text-[11px] font-bold text-emerald-200 mt-2 mb-1">Gols Time A:</label>
                      <input 
                        type="number" 
                        min="0"
                        value={golsAInput}
                        onChange={(e) => setGolsAInput(e.target.value)}
                        className="w-full bg-emerald-900 text-amber-300 font-black text-lg p-2 rounded-lg border border-emerald-700 text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-200 mb-1">Time B (Nome):</label>
                      <input 
                        type="text" 
                        value={timeBNome}
                        onChange={(e) => setTimeBNome(e.target.value)}
                        className="w-full bg-emerald-900 text-white text-xs font-bold p-2 rounded-lg border border-emerald-700"
                      />
                      <label className="block text-[11px] font-bold text-emerald-200 mt-2 mb-1">Gols Time B:</label>
                      <input 
                        type="number" 
                        min="0"
                        value={golsBInput}
                        onChange={(e) => setGolsBInput(e.target.value)}
                        className="w-full bg-emerald-900 text-amber-300 font-black text-lg p-2 rounded-lg border border-emerald-700 text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Seleção de Goleiros */}
                <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 space-y-3">
                  <h3 className="text-xs font-black uppercase text-amber-300">🧤 Escalacao de Goleiros</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-200 mb-1">Goleiro do {timeANome}:</label>
                      <select 
                        value={goleiroA}
                        onChange={(e) => setGoleiroA(e.target.value)}
                        className="w-full bg-emerald-900 text-white font-bold text-xs p-2.5 rounded-lg border border-emerald-700"
                      >
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-200 mb-1">Goleiro do {timeBNome}:</label>
                      <select 
                        value={goleiroB}
                        onChange={(e) => setGoleiroB(e.target.value)}
                        className="w-full bg-emerald-900 text-white font-bold text-xs p-2.5 rounded-lg border border-emerald-700"
                      >
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Escalação de Jogadores de Linha (Seleção Fácil) */}
                <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 space-y-3">
                  <h3 className="text-xs font-black uppercase text-amber-300">🏃 Selecionar Escalação dos Times</h3>
                  <p className="text-[11px] text-emerald-300/70">Toque nos nomes para escalar em cada time:</p>
                  
                  <div className="max-h-60 overflow-y-auto p-2 bg-emerald-900/40 rounded-xl border border-emerald-800 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {ASSOCIADOS_OPCOES.map(nome => {
                      const inA = jogadoresA.includes(nome);
                      const inB = jogadoresB.includes(nome);
                      return (
                        <div key={nome} className="flex items-center justify-between bg-emerald-950 p-1.5 rounded border border-emerald-800 text-xs">
                          <span className="font-semibold text-white truncate max-w-[70px] sm:max-w-[100px]">{nome}</span>
                          <div className="flex gap-1">
                            <button 
                              type="button"
                              onClick={() => toggleJogadorA(nome)}
                              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${inA ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-900 text-emerald-300'}`}
                            >
                              A
                            </button>
                            <button 
                              type="button"
                              onClick={() => toggleJogadorB(nome)}
                              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${inB ? 'bg-teal-500 text-slate-950' : 'bg-emerald-900 text-emerald-300'}`}
                            >
                              B
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lançamento dos Gols Marcados */}
                <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 space-y-3">
                  <h3 className="text-xs font-black uppercase text-amber-300">🎯 Lançar Gols (Artilharia)</h3>
                  <p className="text-[11px] text-emerald-300/70">Adicione a quantidade de gols marcados pelos jogadores nesta partida:</p>

                  <div className="space-y-2">
                    {[...jogadoresA, ...jogadoresB].length === 0 ? (
                      <p className="text-xs text-amber-300/70 italic">Escale os jogadores acima para habilitar o lançamento de gols.</p>
                    ) : (
                      [...jogadoresA, ...jogadoresB].map(nome => {
                        const reg = golsAutores.find(g => g.jogador === nome);
                        const qtd = reg ? reg.quantidade : 0;
                        return (
                          <div key={nome} className="flex justify-between items-center bg-emerald-900/50 p-2 rounded-lg border border-emerald-800">
                            <span className="text-xs font-bold text-white">{nome}</span>
                            <div className="flex items-center gap-2">
                              <button 
                                type="button"
                                onClick={() => handleAlterarGolsAutor(nome, qtd - 1)}
                                className="w-7 h-7 bg-emerald-950 hover:bg-emerald-800 text-white font-bold rounded-md border border-emerald-700 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="text-sm font-black text-amber-300 w-4 text-center">{qtd}</span>
                              <button 
                                type="button"
                                onClick={() => handleAlterarGolsAutor(nome, qtd + 1)}
                                className="w-7 h-7 bg-emerald-500 text-slate-950 font-bold rounded-md flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Botão de Salvar */}
                <button 
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-xl shadow-xl transition-all text-base uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  💾 Salvar Rodada no Sistema
                </button>

                <div className="pt-4 border-t border-emerald-800 text-center">
                  <button 
                    type="button" 
                    onClick={handleResetDados}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Restaurar dados originais do campeonato
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}