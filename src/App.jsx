import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// CRÉDITOS DO DESENVOLVEDOR (COM TITULAÇÃO)
const NOME_DESENVOLVEDOR = "Prof. Me. Ícaro Galvão";

export const ASSOCIADOS_OPCOES = [
  "Adriano", "Albino", "Amaury", "André", "Babinha", "Ballet", "Beradeiro", "Canário", 
  "Capela", "Carioca", "Dai", "Diniz", "Dyeggo", "Filipinho", "Gamarra", "Garcia", 
  "Guga", "Gusta", "Gutto", "Harley", "I. Galvão", "Jandir", "Jefinho", "Juracy", 
  "Kiko", "Lucas", "M. Galvão", "M. Yuri", "Marcola", "Marcelinho", "Michel", "Minuano", 
  "Miskinis", "Morais", "Murilo", "Nando", "Oliveira", "Otaner", "PH", "PJ", 
  "R. Mateus", "Rafa", "Rafael Santana", "Rapha Diniz", "Raul", "Reinaldo", "Remi", 
  "Ricardo", "Robério", "Rodrigo", "Talisca", "Vanderson", "Vini HC", "Zé Paulo"
];

export const GOLEIROS_OPCOES = ["Tellê", "Baianinho", "Roberto", "Rogério", "Adriel"];

const historicoRodadasInicial = [];

const dadosMangabeiraBase = [
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

const dadosBrocadorBase = [
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
  { nome: "Guga", gols: 3 }, { nome: "Dai", gols: 2 }, { nome: "Telle", gols: 2 },
  { nome: "Rapha Diniz", gols: 2 }, { nome: "Albino", gols: 2 }, { nome: "Zé Paulo", gols: 2 },
  { nome: "Dyeggo", gols: 1 }, { nome: "Babinha", gols: 1 }, { nome: "Garcia", gols: 1 },
  { nome: "M. Galvão", gols: 1 }, { nome: "Amaury", gols: 1 }, { nome: "Ivamário", gols: 1 },
  { nome: "Rafha Santana", gols: 1 }, { nome: "Oliveira", gols: 1 }, { nome: "Marcola", gols: 1 },
  { nome: "Beradeiro", gols: 1 }
];

const dadosCesarBase = [
  { nome: 'Tellê', pontos: 79, golsSofridos: 106 },
  { nome: 'Baianinho', pontos: 54, golsSofridos: 177 },
  { nome: 'Roberto', pontos: 46, golsSofridos: 118 },
  { nome: 'Rogério', pontos: 16, golsSofridos: 52 },
  { nome: 'Adriel', pontos: 1, golsSofridos: 2 }
];

export default function App() {
  const [aba, setAba] = useState('geral');
  
  // Utilizando versão v7 para renovação automática de cache
  const [historico, setHistorico] = useState(() => {
    const salvos = localStorage.getItem('arena_historico_jogos_v7');
    return salvos ? JSON.parse(salvos) : historicoRodadasInicial;
  });

  const [dataSelecionada, setDataSelecionada] = useState('');

  useEffect(() => {
    if (historico.length > 0 && !dataSelecionada) {
      setDataSelecionada(historico[0].data);
    }
  }, [historico, dataSelecionada]);

  // Autenticação Admin
  const [senhaInput, setSenhaInput] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  // Estados do Formulário de Cadastro/Edição
  const [jogoEditandoId, setJogoEditandoId] = useState(null);
  const [dataJogo, setDataJogo] = useState('2026-10-25');
  const [goleiroA, setGoleiroA] = useState(GOLEIROS_OPCOES[0]);
  const [goleiroB, setGoleiroB] = useState(GOLEIROS_OPCOES[1]);
  const [jogadoresA, setJogadoresA] = useState([]);
  const [jogadoresB, setJogadoresB] = useState([]);
  const [substitutosA, setSubstitutosA] = useState([]);
  const [substitutosB, setSubstitutosB] = useState([]);
  const [golsA, setGolsA] = useState(0);
  const [golsB, setGolsB] = useState(0);
  const [golsDetalhados, setGolsDetalhados] = useState({});

  // CÁLCULO AUTOMÁTICO DO PLACAR A PARTIR DOS GOLS DETALHADOS
  useEffect(() => {
    const listaTimeA = [...jogadoresA, ...(substitutosA || []), `⚠️ Gol Contra (Time ${goleiroA})`];
    const listaTimeB = [...jogadoresB, ...(substitutosB || []), `⚠️ Gol Contra (Time ${goleiroB})`];

    let totalA = 0;
    let totalB = 0;

    listaTimeA.forEach(nome => {
      if (golsDetalhados[nome]) totalA += golsDetalhados[nome];
    });

    listaTimeB.forEach(nome => {
      if (golsDetalhados[nome]) totalB += golsDetalhados[nome];
    });

    setGolsA(totalA);
    setGolsB(totalB);
  }, [golsDetalhados, jogadoresA, jogadoresB, substitutosA, substitutosB, goleiroA, goleiroB]);

  const salvarHistoricoLocal = (novoHistorico) => {
    setHistorico(novoHistorico);
    localStorage.setItem('arena_historico_jogos_v7', JSON.stringify(novoHistorico));
  };

  const resetForm = () => {
    setJogoEditandoId(null);
    setJogadoresA([]);
    setJogadoresB([]);
    setSubstitutosA([]);
    setSubstitutosB([]);
    setGolsA(0);
    setGolsB(0);
    setGolsDetalhados({});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (senhaInput === 'sinprovenfs2026') {
      setAutenticado(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  // Toggle Titulares
  const toggleJogador = (time, nome) => {
    if (time === 'A') {
      setJogadoresA(prev => prev.includes(nome) ? prev.filter(x => x !== nome) : [...prev, nome]);
      setSubstitutosA(prev => prev.filter(x => x !== nome));
    } else {
      setJogadoresB(prev => prev.includes(nome) ? prev.filter(x => x !== nome) : [...prev, nome]);
      setSubstitutosB(prev => prev.filter(x => x !== nome));
    }
  };

  // Toggle Substitutos
  const toggleSubstituto = (time, nome) => {
    if (time === 'A') {
      setSubstitutosA(prev => prev.includes(nome) ? prev.filter(x => x !== nome) : [...prev, nome]);
      setJogadoresA(prev => prev.filter(x => x !== nome));
    } else {
      setSubstitutosB(prev => prev.includes(nome) ? prev.filter(x => x !== nome) : [...prev, nome]);
      setJogadoresB(prev => prev.filter(x => x !== nome));
    }
  };

  const handleGolsJogador = (nome, delta) => {
    setGolsDetalhados(prev => {
      const atual = prev[nome] || 0;
      const novo = Math.max(0, atual + delta);
      return { ...prev, [nome]: novo };
    });
  };

  // Carregar Jogo para Edição
  const handleEditarJogo = (dataRodada, jogo) => {
    if (!autenticado) {
      setAba('cadastrar');
      alert('Por favor, faça login como administrador na aba Cadastrar para editar partidas.');
      return;
    }

    const partes = dataRodada.split('/');
    if (partes.length === 3) {
      setDataJogo(`${partes[2]}-${partes[1]}-${partes[0]}`);
    }

    setJogoEditandoId(jogo.id);
    setGoleiroA(jogo.goleiroA);
    setGoleiroB(jogo.goleiroB);
    setJogadoresA(jogo.jogadoresA || []);
    setJogadoresB(jogo.jogadoresB || []);
    setSubstitutosA(jogo.substitutosA || []);
    setSubstitutosB(jogo.substitutosB || []);
    setGolsA(jogo.golsA);
    setGolsB(jogo.golsB);

    const mapGols = {};
    if (jogo.golsMarcados) {
      jogo.golsMarcados.forEach(g => {
        mapGols[g.jogador] = g.quantidade;
      });
    }
    setGolsDetalhados(mapGols);

    setAba('cadastrar');
  };

  // Salvar / Atualizar Jogo
  const handleSalvarJogo = (e) => {
    e.preventDefault();
    const dataFormatada = dataJogo.split('-').reverse().join('/');
    
    const golsMarcadosArray = Object.entries(golsDetalhados)
      .filter(([_, q]) => q > 0)
      .map(([jogador, quantidade]) => ({ jogador, quantidade }));

    let novoHistorico = JSON.parse(JSON.stringify(historico));

    if (jogoEditandoId) {
      // MODO EDIÇÃO
      novoHistorico.forEach(r => {
        const idx = r.jogos.findIndex(j => j.id === jogoEditandoId);
        if (idx !== -1) {
          r.jogos[idx] = {
            ...r.jogos[idx],
            timeA: `Time ${goleiroA}`,
            timeB: `Time ${goleiroB}`,
            golsA: Number(golsA),
            golsB: Number(golsB),
            goleiroA,
            goleiroB,
            jogadoresA,
            jogadoresB,
            substitutosA,
            substitutosB,
            golsMarcados: golsMarcadosArray
          };
        }
      });
      alert('Súmula da partida atualizada com sucesso!');
    } else {
      // MODO NOVO CADASTRO
      let rodadaExistente = novoHistorico.find(r => r.data === dataFormatada);
      const numPartida = rodadaExistente ? rodadaExistente.jogos.length + 1 : 1;

      const novoJogo = {
        id: `j_${Date.now()}`,
        partida: `PARTIDA ${String(numPartida).padStart(2, '0')}`,
        timeA: `Time ${goleiroA}`,
        timeB: `Time ${goleiroB}`,
        golsA: Number(golsA),
        golsB: Number(golsB),
        goleiroA,
        goleiroB,
        jogadoresA,
        jogadoresB,
        substitutosA,
        substitutosB,
        golsMarcados: golsMarcadosArray
      };

      if (rodadaExistente) {
        rodadaExistente.jogos.push(novoJogo);
      } else {
        novoHistorico.unshift({
          data: dataFormatada,
          jogos: [novoJogo]
        });
      }
      alert('Nova partida salva com sucesso!');
    }

    salvarHistoricoLocal(novoHistorico);
    setDataSelecionada(dataFormatada);
    resetForm();
    setAba('jogos');
  };

  const handleZerarHistoricoLocal = () => {
    if (window.confirm('Tem certeza que deseja zerar e apagar todas as rodadas cadastradas?')) {
      salvarHistoricoLocal([]);
      setDataSelecionada('');
      resetForm();
      alert('Histórico de rodadas zerado com sucesso!');
    }
  };

  const calcularRankings = () => {
    let mangabeira = JSON.parse(JSON.stringify(dadosMangabeiraBase));
    let brocador = JSON.parse(JSON.stringify(dadosBrocadorBase));
    let cesar = JSON.parse(JSON.stringify(dadosCesarBase));

    historico.forEach(r => {
      r.jogos.forEach(j => {
        const ptsA = j.golsA > j.golsB ? 3 : (j.golsA === j.golsB ? 1 : 0);
        const ptsB = j.golsB > j.golsA ? 3 : (j.golsA === j.golsB ? 1 : 0);

        // SOMENTE TITULARES GANHAM PONTOS NO MANGABEIRA
        j.jogadoresA.forEach(nome => {
          let p = mangabeira.find(x => x.nome === nome);
          if (p) p.pontos += ptsA;
        });

        j.jogadoresB.forEach(nome => {
          let p = mangabeira.find(x => x.nome === nome);
          if (p) p.pontos += ptsB;
        });

        // SOMENTE JOGADORES REAIS SOMAM GOLS NO BROCADOR (GOL CONTRA É IGNORADO)
        j.golsMarcados.forEach(g => {
          if (!g.jogador.includes("Gol Contra")) {
            let p = brocador.find(x => x.nome === g.jogador);
            if (p) p.gols += g.quantidade;
          }
        });

        let golA = cesar.find(x => x.nome === j.goleiroA);
        if (golA) {
          golA.golsSofridos += j.golsB;
          golA.pontos += ptsA;
        }

        let golB = cesar.find(x => x.nome === j.goleiroB);
        if (golB) {
          golB.golsSofridos += j.golsA;
          golB.pontos += ptsB;
        }
      });
    });

    return {
      mangabeira: mangabeira.sort((a, b) => b.pontos - a.pontos).map((item, i) => ({ ...item, pos: i + 1 })),
      brocador: brocador.sort((a, b) => b.gols - a.gols).map((item, i) => ({ ...item, pos: i + 1 })),
      cesar: cesar.sort((a, b) => b.pontos - a.pontos).map((item, i) => ({ ...item, pos: i + 1 }))
    };
  };

  const { mangabeira: rankingMangabeira, brocador: rankingBrocador, cesar: rankingCesar } = calcularRankings();
  const rodadaAtual = historico.find(r => r.data === dataSelecionada) || historico[0];

  const getPodioBadgeG7 = (pos) => {
    if (pos <= 7) {
      return (
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-bold text-sm flex items-center gap-1 w-fit">
          ⭐ #{pos} G7
        </span>
      );
    }
    return <span className="text-emerald-300/40 font-semibold px-2">#{pos}</span>;
  };

  const getPodioApenasPrimeiro = (pos, corBadge = 'emerald') => {
    if (pos === 1) {
      if (corBadge === 'red') {
        return (
          <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-1 rounded-lg font-extrabold text-sm flex items-center gap-1 w-fit">
            🏆 #1º Lugar
          </span>
        );
      }
      return (
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-extrabold text-sm flex items-center gap-1 w-fit">
          🏆 #1º Lugar
        </span>
      );
    }
    return <span className="text-emerald-300/40 font-semibold px-2">#{pos}</span>;
  };

  // Listas separadas para os gols por time
  const opcoesGolsTimeA = [
    ...jogadoresA, 
    ...(substitutosA || []), 
    `⚠️ Gol Contra (Time ${goleiroA})`
  ];

  const opcoesGolsTimeB = [
    ...jogadoresB, 
    ...(substitutosB || []), 
    `⚠️ Gol Contra (Time ${goleiroB})`
  ];

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 font-sans flex flex-col justify-between">
      <div>
        {/* Cabeçalho */}
        <header className="mb-8 border-b border-emerald-800/60 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="Logo Arena Sinprovenfs" 
              className="h-16 sm:h-20 w-auto object-contain rounded-xl bg-white p-1.5 shadow-md border border-emerald-700"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2">
                ARENA SINPROVENFS
              </h1>
              <p className="text-emerald-400 font-bold text-sm tracking-wider uppercase">Painel Oficial de Prêmios 2026</p>
            </div>
          </div>

          {/* Menu de Navegação */}
          <div className="flex flex-wrap gap-2 bg-emerald-900/80 p-1.5 rounded-xl border border-emerald-800">
            <button 
              onClick={() => setAba('geral')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'geral' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Visão Geral
            </button>
            <button 
              onClick={() => setAba('jogos')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'jogos' ? 'bg-teal-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              ⚽ Jogos da Rodada
            </button>
            <button 
              onClick={() => setAba('mangabeira')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'mangabeira' ? 'bg-emerald-600 text-white shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Craque (Mangabeira)
            </button>
            <button 
              onClick={() => setAba('brocador')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'brocador' ? 'bg-red-600 text-white shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Artilharia (Brocador)
            </button>
            <button 
              onClick={() => setAba('cesar')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'cesar' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Goleiros (César)
            </button>
            <button 
              onClick={() => { resetForm(); setAba('cadastrar'); }}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'cadastrar' ? 'bg-amber-400 text-slate-950 shadow-md font-black' : 'bg-emerald-800/80 text-amber-300 hover:text-white border border-amber-500/40'}`}
            >
              ➕ Cadastrar
            </button>
          </div>
        </header>

        {/* ABA VISÃO GERAL */}
        {aba === 'geral' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-md">Prêmio Mangabeira</span>
                <p className="text-emerald-200/70 text-sm mt-3">Líder do Ranking</p>
                <p className="text-3xl font-black text-white mt-1">{rankingMangabeira[0]?.nome}</p>
                <p className="text-emerald-400 font-bold text-lg mt-1">{rankingMangabeira[0]?.pontos} <span className="text-sm font-normal text-emerald-200/60">pontos</span></p>
              </div>

              <div className="bg-emerald-900/50 p-6 rounded-2xl border border-red-500/30 shadow-lg relative overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/20 px-2.5 py-1 rounded-md">Prêmio Brocador</span>
                <p className="text-emerald-200/70 text-sm mt-3">Artilheiro Máximo</p>
                <p className="text-3xl font-black text-white mt-1">{rankingBrocador[0]?.nome}</p>
                <p className="text-red-400 font-bold text-lg mt-1">{rankingBrocador[0]?.gols} <span className="text-sm font-normal text-emerald-200/60">gols</span></p>
              </div>

              <div className="bg-emerald-900/50 p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-md">Prêmio César</span>
                <p className="text-emerald-200/70 text-sm mt-3">Melhor Goleiro</p>
                <p className="text-3xl font-black text-white mt-1">{rankingCesar[0]?.nome}</p>
                <p className="text-amber-300 font-bold text-lg mt-1">{rankingCesar[0]?.pontos} <span className="text-sm font-normal text-emerald-200/60">pts ({rankingCesar[0]?.golsSofridos} GS)</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
                <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
                <p className="text-emerald-200/60 text-xs mb-4">Primeiros 10 colocados na classificação geral</p>
                <div className="h-80 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingMangabeira.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                      <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={60} />
                      <YAxis stroke="#a7f3d0" />
                      <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="pontos" name="Pontos" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
                <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
                <p className="text-emerald-200/60 text-xs mb-4">Primeiros 10 colocados em número de gols</p>
                <div className="h-80 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingBrocador.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                      <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={60} />
                      <YAxis stroke="#a7f3d0" />
                      <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="gols" name="Gols" fill="#ef4444" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80 mb-8">
              <h2 className="text-xl font-bold text-white mb-1">Prêmio César - Desempenho dos Goleiros</h2>
              <p className="text-emerald-200/60 text-xs mb-4">Comparativo entre Pontos obtidos vs. Gols Sofridos</p>
              <div className="h-72 w-full">
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
          </>
        )}

        {/* ABA JOGOS DA RODADA */}
        {aba === 'jogos' && (
          <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-emerald-800/60 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-teal-300 flex items-center gap-2">
                  ⚽ Súmula e Resultados das Partidas
                </h2>
                <p className="text-emerald-200/60 text-sm mt-1">Histórico completo de partidas</p>
              </div>

              {historico.length > 0 && (
                <div className="flex items-center gap-2 bg-emerald-950 p-2 rounded-xl border border-emerald-700">
                  <span className="text-xs font-bold text-emerald-400 uppercase">📅 Data da Rodada:</span>
                  <select 
                    value={dataSelecionada} 
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    className="bg-emerald-900 text-white font-bold text-sm px-3 py-1.5 rounded-lg border border-emerald-600 focus:outline-none"
                  >
                    {historico.map(r => (
                      <option key={r.data} value={r.data}>
                        {r.data} ({r.jogos.length} {r.jogos.length > 1 ? 'partidas' : 'partida'})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {historico.length === 0 ? (
              <div className="text-center py-12 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
                <p className="text-lg font-bold text-emerald-300">Nenhuma rodada cadastrada ainda!</p>
                <p className="text-sm text-emerald-200/60 mt-1">Acesse a aba "➕ Cadastrar" no topo para inserir a primeira partida da temporada.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {rodadaAtual?.jogos.map((j) => (
                  <div key={j.id} className="bg-emerald-950/90 p-5 rounded-2xl border border-emerald-800/80 shadow-lg">
                    <div className="flex justify-between items-center mb-4 border-b border-emerald-800/60 pb-2 flex-wrap gap-2">
                      <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                        {j.partida} • {rodadaAtual.data}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditarJogo(rodadaAtual.data, j)}
                          className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-all"
                        >
                          ✏️ Editar Súmula
                        </button>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                          Súmula Finalizada
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-4">
                      <div className="w-2/5 text-right">
                        <p className="font-extrabold text-white text-lg">{j.timeA}</p>
                        <p className="text-xs text-amber-300 font-semibold mt-1">🧤 Goleiro: {j.goleiroA}</p>
                      </div>

                      <div className="bg-emerald-900 px-5 py-2.5 rounded-xl font-black text-amber-300 text-2xl border-2 border-emerald-600 shadow-inner">
                        {j.golsA} x {j.golsB}
                      </div>

                      <div className="w-2/5 text-left">
                        <p className="font-extrabold text-white text-lg">{j.timeB}</p>
                        <p className="text-xs text-amber-300 font-semibold mt-1">🧤 Goleiro: {j.goleiroB}</p>
                      </div>
                    </div>

                    {/* ESCALAÇÕES E SUBSTITUTOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-emerald-900">
                      <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-800/40">
                        <p className="text-xs font-bold text-emerald-300 mb-2 uppercase">Escalação Titular {j.timeA}:</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {j.jogadoresA.map(nome => (
                            <span key={nome} className="bg-emerald-950 text-emerald-200 text-xs px-2 py-1 rounded-md border border-emerald-800">
                              {nome}
                            </span>
                          ))}
                        </div>
                        {j.substitutosA && j.substitutosA.length > 0 && (
                          <>
                            <p className="text-[11px] font-bold text-amber-400/80 mb-1 uppercase">🔄 Substitutos (Apenas Gols):</p>
                            <div className="flex flex-wrap gap-1.5">
                              {j.substitutosA.map(nome => (
                                <span key={nome} className="bg-amber-950/40 text-amber-300 text-xs px-2 py-0.5 rounded-md border border-amber-800/50">
                                  {nome}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-800/40">
                        <p className="text-xs font-bold text-emerald-300 mb-2 uppercase">Escalação Titular {j.timeB}:</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {j.jogadoresB.map(nome => (
                            <span key={nome} className="bg-emerald-950 text-emerald-200 text-xs px-2 py-1 rounded-md border border-emerald-800">
                              {nome}
                            </span>
                          ))}
                        </div>
                        {j.substitutosB && j.substitutosB.length > 0 && (
                          <>
                            <p className="text-[11px] font-bold text-amber-400/80 mb-1 uppercase">🔄 Substitutos (Apenas Gols):</p>
                            <div className="flex flex-wrap gap-1.5">
                              {j.substitutosB.map(nome => (
                                <span key={nome} className="bg-amber-950/40 text-amber-300 text-xs px-2 py-0.5 rounded-md border border-amber-800/50">
                                  {nome}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {j.golsMarcados.length > 0 && (
                      <div className="mt-4 bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/60">
                        <p className="text-xs font-bold text-amber-300 mb-1">⚽ Autores dos Gols:</p>
                        <div className="flex flex-wrap gap-2 text-xs text-emerald-100">
                          {j.golsMarcados.map((g, idx) => (
                            <span key={idx} className={`px-2.5 py-1 rounded-lg border font-medium ${g.jogador.includes('Gol Contra') ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-amber-500/10 text-amber-300 border-amber-500/20'}`}>
                              {g.jogador} ({g.quantidade} {g.quantidade > 1 ? 'gols' : 'gol'})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABA CADASTRAR */}
        {aba === 'cadastrar' && (
          <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80 max-w-3xl mx-auto">
            {!autenticado ? (
              <div className="bg-emerald-950 p-6 rounded-2xl border border-emerald-700 text-center">
                <h2 className="text-xl font-bold text-amber-300 mb-2">🔒 ÁREA RESTRITA - ADMINISTRAÇÃO</h2>
                <p className="text-xs text-emerald-200/70 mb-4">Insira a senha do administrador para lançar partidas diretamente pelo celular.</p>
                
                <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-xs mx-auto">
                  <input 
                    type="password" 
                    placeholder="Digite a senha..."
                    value={senhaInput}
                    onChange={(e) => setSenhaInput(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-900 text-white font-bold border border-emerald-600 focus:outline-none text-center"
                  />
                  <button 
                    type="submit"
                    className="bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl shadow-lg hover:bg-amber-300 transition-all"
                  >
                    Entrar no Painel
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-emerald-800 pb-3 flex-wrap gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-amber-300">
                      {jogoEditandoId ? '✏️ Editar Súmula da Partida' : '📝 Cadastrar Partida'}
                    </h2>
                    <p className="text-xs text-emerald-200/60">
                      {jogoEditandoId ? 'Altere os dados da súmula selecionada' : 'Adicione uma nova partida para a data informada'}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {jogoEditandoId && (
                      <button 
                        type="button"
                        onClick={resetForm}
                        className="text-xs bg-slate-700 text-white border border-slate-500 px-3 py-1.5 rounded-lg hover:bg-slate-600 transition-all font-bold"
                      >
                        ❌ Cancelar Edição
                      </button>
                    )}
                    <button 
                      onClick={handleZerarHistoricoLocal}
                      className="text-xs bg-red-600/30 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold"
                    >
                      🗑️ Zerar Histórico
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSalvarJogo} className="space-y-6">
                  {/* Data */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1 uppercase">📅 Data da Partida:</label>
                    <input 
                      type="date" 
                      value={dataJogo}
                      onChange={(e) => setDataJogo(e.target.value)}
                      className="w-full bg-emerald-950 border border-emerald-700 rounded-xl px-4 py-2.5 text-white font-bold"
                      required
                    />
                  </div>

                  {/* Seleção dos Goleiros */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800">
                      <label className="block text-xs font-bold text-amber-300 mb-1 uppercase">Goleiro Time A:</label>
                      <select 
                        value={goleiroA}
                        onChange={(e) => setGoleiroA(e.target.value)}
                        className="w-full bg-emerald-900 border border-emerald-600 rounded-lg px-3 py-2 text-white font-bold"
                      >
                        {GOLEIROS_OPCOES.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800">
                      <label className="block text-xs font-bold text-amber-300 mb-1 uppercase">Goleiro Time B:</label>
                      <select 
                        value={goleiroB}
                        onChange={(e) => setGoleiroB(e.target.value)}
                        className="w-full bg-emerald-900 border border-emerald-600 rounded-lg px-3 py-2 text-white font-bold"
                      >
                        {GOLEIROS_OPCOES.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Placar (Calculado automaticamente de acordo com a atribuição de gols) */}
                  <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 flex justify-around items-center">
                    <div className="text-center">
                      <p className="text-xs font-bold text-emerald-300 uppercase mb-1">Gols Time A</p>
                      <input 
                        type="number" 
                        min="0"
                        value={golsA}
                        onChange={(e) => setGolsA(Number(e.target.value))}
                        className="w-20 bg-emerald-900 text-center font-black text-2xl text-amber-300 border border-emerald-600 rounded-xl py-2"
                      />
                    </div>
                    <span className="text-2xl font-black text-emerald-500">X</span>
                    <div className="text-center">
                      <p className="text-xs font-bold text-emerald-300 uppercase mb-1">Gols Time B</p>
                      <input 
                        type="number" 
                        min="0"
                        value={golsB}
                        onChange={(e) => setGolsB(Number(e.target.value))}
                        className="w-20 bg-emerald-900 text-center font-black text-2xl text-amber-300 border border-emerald-600 rounded-xl py-2"
                      />
                    </div>
                  </div>

                  {/* ESCALAÇÕES TITULARES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800">
                      <p className="text-xs font-bold text-emerald-300 mb-2 uppercase">⭐ Titulares (Ganha Pontos e Gols) - Time A:</p>
                      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <label key={nome} className="flex items-center gap-2 text-xs bg-emerald-900/50 p-1.5 rounded cursor-pointer hover:bg-emerald-900">
                            <input 
                              type="checkbox" 
                              checked={jogadoresA.includes(nome)}
                              onChange={() => toggleJogador('A', nome)}
                              className="rounded text-emerald-500 focus:ring-0"
                            />
                            <span className={jogadoresA.includes(nome) ? 'font-bold text-emerald-200' : 'text-emerald-300/60'}>{nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800">
                      <p className="text-xs font-bold text-emerald-300 mb-2 uppercase">⭐ Titulares (Ganha Pontos e Gols) - Time B:</p>
                      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <label key={nome} className="flex items-center gap-2 text-xs bg-emerald-900/50 p-1.5 rounded cursor-pointer hover:bg-emerald-900">
                            <input 
                              type="checkbox" 
                              checked={jogadoresB.includes(nome)}
                              onChange={() => toggleJogador('B', nome)}
                              className="rounded text-emerald-500 focus:ring-0"
                            />
                            <span className={jogadoresB.includes(nome) ? 'font-bold text-emerald-200' : 'text-emerald-300/60'}>{nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ESCALAÇÕES SUBSTITUTOS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-800/60">
                      <p className="text-xs font-bold text-amber-300 mb-2 uppercase">🔄 Substitutos (Apenas Gols / Sem Pontos) - Time A:</p>
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-2">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <label key={nome} className="flex items-center gap-2 text-xs bg-amber-900/30 p-1.5 rounded cursor-pointer hover:bg-amber-900/50">
                            <input 
                              type="checkbox" 
                              checked={substitutosA.includes(nome)}
                              onChange={() => toggleSubstituto('A', nome)}
                              className="rounded text-amber-500 focus:ring-0"
                            />
                            <span className={substitutosA.includes(nome) ? 'font-bold text-amber-200' : 'text-emerald-300/60'}>{nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-800/60">
                      <p className="text-xs font-bold text-amber-300 mb-2 uppercase">🔄 Substitutos (Apenas Gols / Sem Pontos) - Time B:</p>
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-2">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <label key={nome} className="flex items-center gap-2 text-xs bg-amber-900/30 p-1.5 rounded cursor-pointer hover:bg-amber-900/50">
                            <input 
                              type="checkbox" 
                              checked={substitutosB.includes(nome)}
                              onChange={() => toggleSubstituto('B', nome)}
                              className="rounded text-amber-500 focus:ring-0"
                            />
                            <span className={substitutosB.includes(nome) ? 'font-bold text-amber-200' : 'text-emerald-300/60'}>{nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ATRIBUIÇÃO DE GOLS DIVIDIDA POR TIME */}
                  {(opcoesGolsTimeA.length > 1 || opcoesGolsTimeB.length > 1) && (
                    <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800">
                      <p className="text-xs font-bold text-amber-300 mb-3 uppercase">⚽ Atribuir Gols aos Autores (Atualiza Placar Automático):</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* GOLS TIME A */}
                        <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-800">
                          <p className="text-xs font-bold text-emerald-300 mb-2 border-b border-emerald-800 pb-1">
                            Gols do Time {goleiroA} (Time A):
                          </p>
                          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {opcoesGolsTimeA.map(nome => {
                              const isSub = substitutosA.includes(nome);
                              const isGolContra = nome.includes("Gol Contra");
                              return (
                                <div key={nome} className={`flex justify-between items-center p-2 rounded-lg border text-xs ${isGolContra ? 'bg-red-950/60 border-red-800' : 'bg-emerald-950/80 border-emerald-800'}`}>
                                  <span className="font-semibold text-emerald-100 flex items-center gap-1">
                                    {nome} {isSub && <span className="text-[10px] text-amber-400 font-normal">(Sub)</span>}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      type="button" 
                                      onClick={() => handleGolsJogador(nome, -1)}
                                      className="w-6 h-6 bg-emerald-900 text-emerald-300 font-bold rounded flex items-center justify-center border border-emerald-700"
                                    >
                                      -
                                    </button>
                                    <span className="font-bold text-amber-300 min-w-[12px] text-center">{golsDetalhados[nome] || 0}</span>
                                    <button 
                                      type="button" 
                                      onClick={() => handleGolsJogador(nome, 1)}
                                      className="w-6 h-6 bg-emerald-700 text-white font-bold rounded flex items-center justify-center border border-emerald-600"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* GOLS TIME B */}
                        <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-800">
                          <p className="text-xs font-bold text-emerald-300 mb-2 border-b border-emerald-800 pb-1">
                            Gols do Time {goleiroB} (Time B):
                          </p>
                          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {opcoesGolsTimeB.map(nome => {
                              const isSub = substitutosB.includes(nome);
                              const isGolContra = nome.includes("Gol Contra");
                              return (
                                <div key={nome} className={`flex justify-between items-center p-2 rounded-lg border text-xs ${isGolContra ? 'bg-red-950/60 border-red-800' : 'bg-emerald-950/80 border-emerald-800'}`}>
                                  <span className="font-semibold text-emerald-100 flex items-center gap-1">
                                    {nome} {isSub && <span className="text-[10px] text-amber-400 font-normal">(Sub)</span>}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      type="button" 
                                      onClick={() => handleGolsJogador(nome, -1)}
                                      className="w-6 h-6 bg-emerald-900 text-emerald-300 font-bold rounded flex items-center justify-center border border-emerald-700"
                                    >
                                      -
                                    </button>
                                    <span className="font-bold text-amber-300 min-w-[12px] text-center">{golsDetalhados[nome] || 0}</span>
                                    <button 
                                      type="button" 
                                      onClick={() => handleGolsJogador(nome, 1)}
                                      className="w-6 h-6 bg-emerald-700 text-white font-bold rounded flex items-center justify-center border border-emerald-600"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botão de Ação */}
                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 text-slate-950 font-black py-3.5 rounded-xl text-base shadow-xl hover:bg-emerald-400 transition-all border border-emerald-400"
                  >
                    {jogoEditandoId ? '💾 Atualizar Súmula da Partida' : '💾 Salvar Súmula da Partida'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ABA MANGABEIRA */}
        {aba === 'mangabeira' && (
          <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-emerald-300">Classificação Geral - Prêmio Mangabeira</h2>
                <p className="text-emerald-200/60 text-sm mt-1">Destaque especial para a zona de elite (Top 7 G7)</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">G7 Destacado</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800 text-emerald-300/70 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Classificação</th>
                    <th className="py-3.5 px-4">Jogador</th>
                    <th className="py-3.5 px-4 text-right">Pontuação Geral</th>
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
                        <td className="py-3.5 px-4">{getPodioBadgeG7(item.pos)}</td>
                        <td className={`py-3.5 px-4 ${isTop7 ? 'text-white font-bold text-base' : 'font-medium'}`}>
                          {item.nome}
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-amber-300 text-base">
                          {item.pontos} <span className="text-xs text-emerald-200/60 font-normal">pts</span>
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
          <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-red-400">Classificação Geral - Prêmio Brocador</h2>
                <p className="text-emerald-200/60 text-sm mt-1">Ranking de artilharia completo</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800 text-emerald-300/70 text-sm">
                    <th className="py-3 px-4">Posição</th>
                    <th className="py-3 px-4">Jogador</th>
                    <th className="py-3 px-4 text-right">Total de Gols</th>
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
                        <td className="py-3 px-4">{getPodioApenasPrimeiro(item.pos, 'red')}</td>
                        <td className={`py-3 px-4 ${isLider ? 'text-white font-bold text-base' : 'font-medium'}`}>
                          {item.nome}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-red-400 text-base">
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

        {/* ABA GOLEIROS */}
        {aba === 'cesar' && (
          <div className="space-y-8">
            <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
              <h2 className="text-xl font-bold text-white mb-4">Tabela de Classificação dos Goleiros</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-800 text-emerald-300/70 text-sm">
                      <th className="py-3 px-4">Posição</th>
                      <th className="py-3 px-4">Goleiro</th>
                      <th className="py-3 px-4 text-center">Pontos</th>
                      <th className="py-3 px-4 text-right">Gols Sofridos</th>
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
                          <td className="py-3 px-4">{getPodioApenasPrimeiro(item.pos, 'amber')}</td>
                          <td className={`py-3 px-4 ${isLider ? 'text-white font-bold text-base' : 'font-medium'}`}>
                            {item.nome}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-amber-300">{item.pontos} pts</td>
                          <td className="py-3 px-4 text-right font-bold text-red-400">{item.golsSofridos} GS</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RODAPÉ */}
      <footer className="mt-12 pt-6 border-t border-emerald-800/60 text-center text-xs text-emerald-300/60">
        <p>© Olho no Lance • Todos os direitos reservados</p>
        <p className="mt-1 font-medium text-emerald-400">
          Desenvolvido com ⚽ por <span className="text-white font-bold">{NOME_DESENVOLVEDOR}</span>
        </p>
      </footer>
    </div>
  );
}