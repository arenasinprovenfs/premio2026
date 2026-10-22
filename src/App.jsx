import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

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
  const [historico, setHistorico] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "partidas"), (snapshot) => {
      const docsData = snapshot.docs.map(doc => doc.data());
      if (docsData.length > 0) {
        const rodadasMap = {};
        docsData.forEach(jogo => {
          if (!rodadasMap[jogo.dataRodada]) {
            rodadasMap[jogo.dataRodada] = [];
          }
          rodadasMap[jogo.dataRodada].push(jogo);
        });

        const historicoFormatado = Object.keys(rodadasMap).map(data => ({
          data,
          jogos: rodadasMap[data]
        }));

        setHistorico(historicoFormatado);
      } else {
        setHistorico([]);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (historico.length > 0 && !dataSelecionada) {
      setDataSelecionada(historico[0].data);
    }
  }, [historico, dataSelecionada]);

  const [senhaInput, setSenhaInput] = useState('');
  const [autenticado, setAutenticado] = useState(false);

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

  useEffect(() => {
    const listaTimeA = [...jogadoresA, ...(substitutosA || []), `⚠️ Gol Contra (Time Vermelho)`];
    const listaTimeB = [...jogadoresB, ...(substitutosB || []), `⚠️ Gol Contra (Time Branco)`];

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
  }, [golsDetalhados, jogadoresA, jogadoresB, substitutosA, substitutosB]);

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

  const toggleJogador = (time, nome) => {
    if (time === 'A') {
      setJogadoresA(prev => prev.includes(nome) ? prev.filter(x => x !== nome) : [...prev, nome]);
      setSubstitutosA(prev => prev.filter(x => x !== nome));
    } else {
      setJogadoresB(prev => prev.includes(nome) ? prev.filter(x => x !== nome) : [...prev, nome]);
      setSubstitutosB(prev => prev.filter(x => x !== nome));
    }
  };

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

  const handleDeletarJogo = async (idJogo) => {
    if (!autenticado) {
      setAba('cadastrar');
      alert('Por favor, faça login como administrador na aba Cadastrar para excluir partidas.');
      return;
    }

    if (window.confirm('Tem certeza de que deseja excluir esta súmula permanentemente?')) {
      try {
        await deleteDoc(doc(db, "partidas", idJogo));
        alert('Súmula excluída com sucesso!');
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir a súmula no Firestore.');
      }
    }
  };

  const handleSalvarJogo = async (e) => {
    e.preventDefault();
    const dataFormatada = dataJogo.split('-').reverse().join('/');
    
    const golsMarcadosArray = Object.entries(golsDetalhados)
      .filter(([_, q]) => q > 0)
      .map(([jogador, quantidade]) => ({ jogador, quantidade }));

    const idJogo = jogoEditandoId || `j_${Date.now()}`;
    
    let rodadaExistente = historico.find(r => r.data === dataFormatada);
    const numPartida = rodadaExistente ? rodadaExistente.jogos.length + 1 : 1;

    const jogoObjeto = {
      id: idJogo,
      dataRodada: dataFormatada,
      partida: `PARTIDA ${String(numPartida).padStart(2, '0')}`,
      timeA: `Time Vermelho`,
      timeB: `Time Branco`,
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

    try {
      await setDoc(doc(db, "partidas", idJogo), jogoObjeto);
      alert(jogoEditandoId ? 'Súmula atualizada no Cloud Firestore!' : 'Nova partida salva no Cloud Firestore!');
      setDataSelecionada(dataFormatada);
      resetForm();
      setAba('jogos');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar no Firestore!');
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

        j.jogadoresA.forEach(nome => {
          let p = mangabeira.find(x => x.nome === nome);
          if (p) p.pontos += ptsA;
        });

        j.jogadoresB.forEach(nome => {
          let p = mangabeira.find(x => x.nome === nome);
          if (p) p.pontos += ptsB;
        });

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

  return (
    <div className="min-h-screen bg-[#03140E] text-slate-100 p-3 sm:p-6 lg:p-8 font-sans flex flex-col justify-between antialiased">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* HEADER MODERNO */}
        <header className="bg-[#08251B]/70 backdrop-blur-md rounded-2xl p-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="Logo Arena Sinprovenfs" 
              className="h-14 sm:h-16 w-auto object-contain rounded-xl bg-white/10 p-1.5 shadow-lg border border-emerald-500/20"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                ARENA SINPROVENFS
              </h1>
              <p className="text-emerald-400 font-bold text-xs tracking-wider uppercase mt-0.5">Painel Oficial de Prêmios 2026</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 bg-[#03140E]/80 p-1.5 rounded-xl border border-emerald-500/20">
            <button 
              onClick={() => setAba('geral')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'geral' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'}`}
            >
              Visão Geral
            </button>
            <button 
              onClick={() => setAba('jogos')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'jogos' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'}`}
            >
              ⚽ Jogos da Rodada
            </button>
            <button 
              onClick={() => setAba('mangabeira')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'mangabeira' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
            >
              Craque (Mangabeira)
            </button>
            <button 
              onClick={() => setAba('brocador')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'brocador' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
            >
              Artilharia (Brocador)
            </button>
            <button 
              onClick={() => setAba('cesar')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'cesar' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'}`}
            >
              Goleiros (César)
            </button>
            <button 
              onClick={() => { resetForm(); setAba('cadastrar'); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all ${aba === 'cadastrar' ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-emerald-950 text-amber-300 hover:text-white border border-amber-500/30'}`}
            >
              ➕ Cadastrar
            </button>
          </div>
        </header>

        {aba === 'geral' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-emerald-500/20 shadow-xl relative overflow-hidden">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">Prêmio Mangabeira</span>
                <p className="text-slate-400 text-xs mt-4">Líder do Ranking</p>
                <p className="text-3xl font-black text-white mt-1">{rankingMangabeira[0]?.nome}</p>
                <p className="text-emerald-400 font-bold text-base mt-1">{rankingMangabeira[0]?.pontos} <span className="text-xs font-normal text-slate-400">pontos</span></p>
              </div>

              <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-rose-500/20 shadow-xl relative overflow-hidden">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">Prêmio Brocador</span>
                <p className="text-slate-400 text-xs mt-4">Artilheiro Máximo</p>
                <p className="text-3xl font-black text-white mt-1">{rankingBrocador[0]?.nome}</p>
                <p className="text-rose-400 font-bold text-base mt-1">{rankingBrocador[0]?.gols} <span className="text-xs font-normal text-slate-400">gols</span></p>
              </div>

              <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-amber-500/20 shadow-xl relative overflow-hidden">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">Prêmio César</span>
                <p className="text-slate-400 text-xs mt-4">Melhor Goleiro</p>
                <p className="text-3xl font-black text-white mt-1">{rankingCesar[0]?.nome}</p>
                <p className="text-amber-300 font-bold text-base mt-1">{rankingCesar[0]?.pontos} <span className="text-xs font-normal text-slate-400">pts ({rankingCesar[0]?.golsSofridos} GS)</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
                <p className="text-slate-400 text-xs mb-4">Primeiros 10 colocados na classificação geral</p>
                <div className="h-80 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingMangabeira.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                      <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={60} />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#03140E', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }} />
                      <Bar dataKey="pontos" name="Pontos" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
                <p className="text-slate-400 text-xs mb-4">Primeiros 10 colocados em número de gols</p>
                <div className="h-80 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingBrocador.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                      <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={60} />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#03140E', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }} />
                      <Bar dataKey="gols" name="Gols" fill="#f43f5e" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl mb-8">
              <h2 className="text-lg font-bold text-white mb-1">Prêmio César - Desempenho dos Goleiros</h2>
              <p className="text-slate-400 text-xs mb-4">Comparativo entre Pontos obtidos vs. Gols Sofridos</p>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingCesar}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                    <XAxis dataKey="nome" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#03140E', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Legend />
                    <Bar dataKey="pontos" name="Pontos" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="golsSofridos" name="Gols Sofridos" fill="#f43f5e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {aba === 'jogos' && (
          <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2">
                  ⚽ Súmula e Resultados das Partidas
                </h2>
                <p className="text-slate-400 text-xs mt-1">Histórico completo de partidas em tempo real</p>
              </div>

              {historico.length > 0 && (
                <div className="flex items-center gap-2 bg-[#03140E] p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-xs font-bold text-emerald-400 uppercase">📅 Data da Rodada:</span>
                  <select 
                    value={dataSelecionada} 
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    className="bg-[#08251B] text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 focus:outline-none"
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
              <div className="text-center py-12 bg-[#03140E]/60 rounded-2xl border border-white/5">
                <p className="text-base font-bold text-emerald-300">Nenhuma rodada cadastrada ainda!</p>
                <p className="text-xs text-slate-400 mt-1">Acesse a aba "➕ Cadastrar" para inserir a primeira partida.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {rodadaAtual?.jogos.map((j) => {
                  const golsTimeA = j.golsMarcados ? j.golsMarcados.filter(g => j.jogadoresA.includes(g.jogador) || (j.substitutosA && j.substitutosA.includes(g.jogador)) || g.jogador.includes('Vermelho')) : [];
                  const golsTimeB = j.golsMarcados ? j.golsMarcados.filter(g => j.jogadoresB.includes(g.jogador) || (j.substitutosB && j.substitutosB.includes(g.jogador)) || g.jogador.includes('Branco')) : [];

                  return (
                    <div key={j.id} className="bg-[#03140E]/90 p-6 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
                      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3 flex-wrap gap-2">
                        <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                          {j.partida} • {rodadaAtual.data}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditarJogo(rodadaAtual.data, j)}
                            className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md"
                          >
                            ✏️ Editar Súmula
                          </button>
                          <button 
                            onClick={() => handleDeletarJogo(j.id)}
                            className="bg-rose-950/40 text-rose-300 border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-rose-900/60 transition-all shadow-md"
                          >
                            🗑️ Excluir
                          </button>
                          <span className="text-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider">
                            Finalizada ✓
                          </span>
                        </div>
                      </div>

                      {/* PLACAR NO ESTILO TRANSMISSÃO DE TV */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-6">
                        <div className="md:col-span-5 text-center md:text-right">
                          <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">Mandante</span>
                          <h3 className="text-2xl font-black text-white mt-1">TIME VERMELHO</h3>
                        </div>

                        <div className="md:col-span-2 flex justify-center items-center gap-2">
                          <div className="w-16 h-20 bg-gradient-to-b from-slate-800 to-slate-950 text-amber-400 border-2 border-amber-400/60 rounded-2xl text-4xl font-black flex items-center justify-center shadow-2xl">
                            {j.golsA}
                          </div>
                          <span className="text-xs font-black text-emerald-400 tracking-widest uppercase">VS</span>
                          <div className="w-16 h-20 bg-gradient-to-b from-slate-800 to-slate-950 text-slate-100 border-2 border-slate-600/60 rounded-2xl text-4xl font-black flex items-center justify-center shadow-2xl">
                            {j.golsB}
                          </div>
                        </div>

                        <div className="md:col-span-5 text-center md:text-left">
                          <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest bg-slate-200/10 px-2 py-0.5 rounded-md border border-slate-200/20">Visitante</span>
                          <h3 className="text-2xl font-black text-white mt-1">TIME BRANCO</h3>
                        </div>
                      </div>

                      {/* DETALHAMENTO DE ESCALAÇÃO E ARTILHARIA DOS TIMES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* TIME VERMELHO CARD */}
                        <div className="bg-[#08251B]/80 p-5 rounded-2xl border-t-4 border-t-rose-500/80 border-x border-b border-white/5 space-y-4 shadow-lg">
                          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-rose-400 inline-block shadow-sm"></span>
                            <h4 className="font-bold text-white text-sm">TIME VERMELHO</h4>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">⭐ Atletas Titulares:</p>
                            <div className="flex flex-wrap gap-2">
                              {j.goleiroA && (
                                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full font-semibold shadow-sm flex items-center gap-1.5">
                                  🧤 {j.goleiroA} <span className="bg-amber-400/20 text-amber-200 text-[9px] uppercase font-extrabold px-1.5 rounded">Goleiro</span>
                                </span>
                              )}
                              {j.jogadoresA.map(nome => (
                                <span key={nome} className="bg-slate-800/80 text-slate-200 border border-slate-700/60 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                  {nome}
                                </span>
                              ))}
                            </div>
                          </div>

                          {j.substitutosA && j.substitutosA.length > 0 && (
                            <div>
                              <p className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider mb-2">🔄 Substitutos:</p>
                              <div className="flex flex-wrap gap-2">
                                {j.substitutosA.map(nome => (
                                  <span key={nome} className="bg-amber-950/40 text-amber-200 border border-amber-700/50 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                    {nome}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {golsTimeA.length > 0 && (
                            <div className="pt-3 border-t border-white/5">
                              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">⚽ Artilheiros do Jogo:</p>
                              <div className="flex flex-wrap gap-2">
                                {golsTimeA.map((g, idx) => (
                                  <div key={idx} className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-200 px-3 py-1 rounded-xl text-xs font-bold">
                                    <span>{g.jogador}</span>
                                    <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-extrabold">{g.quantidade} {g.quantidade > 1 ? 'gols' : 'gol'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* TIME BRANCO CARD */}
                        <div className="bg-[#08251B]/80 p-5 rounded-2xl border-t-4 border-t-slate-200/80 border-x border-b border-white/5 space-y-4 shadow-lg">
                          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-400 inline-block shadow-sm"></span>
                            <h4 className="font-bold text-white text-sm">TIME BRANCO</h4>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">⭐ Atletas Titulares:</p>
                            <div className="flex flex-wrap gap-2">
                              {j.goleiroB && (
                                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full font-semibold shadow-sm flex items-center gap-1.5">
                                  🧤 {j.goleiroB} <span className="bg-amber-400/20 text-amber-200 text-[9px] uppercase font-extrabold px-1.5 rounded">Goleiro</span>
                                </span>
                              )}
                              {j.jogadoresB.map(nome => (
                                <span key={nome} className="bg-slate-800/80 text-slate-200 border border-slate-700/60 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                  {nome}
                                </span>
                              ))}
                            </div>
                          </div>

                          {j.substitutosB && j.substitutosB.length > 0 && (
                            <div>
                              <p className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider mb-2">🔄 Substitutos:</p>
                              <div className="flex flex-wrap gap-2">
                                {j.substitutosB.map(nome => (
                                  <span key={nome} className="bg-amber-950/40 text-amber-200 border border-amber-700/50 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                    {nome}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {golsTimeB.length > 0 && (
                            <div className="pt-3 border-t border-white/5">
                              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">⚽ Artilheiros do Jogo:</p>
                              <div className="flex flex-wrap gap-2">
                                {golsTimeB.map((g, idx) => (
                                  <div key={idx} className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-200 px-3 py-1 rounded-xl text-xs font-bold">
                                    <span>{g.jogador}</span>
                                    <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-extrabold">{g.quantidade} {g.quantidade > 1 ? 'gols' : 'gol'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {aba === 'mangabeira' && (
          <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-emerald-300 mb-1">Prêmio Mangabeira - Craque do Campeonato</h2>
            <p className="text-slate-400 text-xs mb-6">Classificação geral baseada nos pontos conquistados por partida</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-black uppercase text-emerald-400 bg-[#03140E]">
                    <th className="p-3">Posição</th>
                    <th className="p-3">Atleta</th>
                    <th className="p-3 text-right">Pontos Totais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {rankingMangabeira.map(item => (
                    <tr key={item.nome} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold">{item.pos <= 7 ? `⭐ #${item.pos} G7` : `#${item.pos}`}</td>
                      <td className="p-3 font-extrabold text-white">{item.nome}</td>
                      <td className="p-3 text-right font-black text-emerald-400">{item.pontos} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'brocador' && (
          <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-rose-400 mb-1">Prêmio Brocador - Artilharia</h2>
            <p className="text-slate-400 text-xs mb-6">Classificação geral de marcadores de gol</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-black uppercase text-rose-400 bg-[#03140E]">
                    <th className="p-3">Posição</th>
                    <th className="p-3">Atleta</th>
                    <th className="p-3 text-right">Gols Marcados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {rankingBrocador.map(item => (
                    <tr key={item.nome} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold">{item.pos === 1 ? '🏆 #1º Lugar' : `#${item.pos}`}</td>
                      <td className="p-3 font-extrabold text-white">{item.nome}</td>
                      <td className="p-3 text-right font-black text-rose-400">{item.gols} gols</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'cesar' && (
          <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-amber-400 mb-1">Prêmio César - Desempenho de Goleiros</h2>
            <p className="text-slate-400 text-xs mb-6">Pontuação geral e total de gols sofridos</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-black uppercase text-amber-400 bg-[#03140E]">
                    <th className="p-3">Posição</th>
                    <th className="p-3">Goleiro</th>
                    <th className="p-3 text-center">Gols Sofridos</th>
                    <th className="p-3 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {rankingCesar.map(item => (
                    <tr key={item.nome} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold">{item.pos === 1 ? '🏆 #1º Lugar' : `#${item.pos}`}</td>
                      <td className="p-3 font-extrabold text-white">{item.nome}</td>
                      <td className="p-3 text-center text-rose-300 font-bold">{item.golsSofridos}</td>
                      <td className="p-3 text-right font-black text-amber-400">{item.pontos} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'cadastrar' && (
          <div className="bg-[#08251B]/70 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto">
            {!autenticado ? (
              <form onSubmit={handleLogin} className="bg-[#03140E]/80 p-8 rounded-3xl border border-amber-500/30 text-center space-y-4">
                <h3 className="text-xl font-black text-amber-300">🔐 Área Restrita do Administrador</h3>
                <p className="text-slate-300 text-xs">Digite a senha para cadastrar ou editar partidas da liga.</p>
                <input 
                  type="password" 
                  value={senhaInput} 
                  onChange={(e) => setSenhaInput(e.target.value)} 
                  placeholder="Senha de acesso..." 
                  className="bg-slate-800 border border-slate-700 text-white p-2.5 rounded-xl text-center w-full max-w-xs block mx-auto focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl shadow-lg hover:bg-amber-300 transition-all text-sm">
                  Entrar no Painel
                </button>
              </form>
            ) : (
              <form onSubmit={handleSalvarJogo} className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl font-black text-amber-300">
                    {jogoEditandoId ? '✏️ Editar Partida Existente' : '➕ Cadastrar Nova Partida'}
                  </h3>
                  {jogoEditandoId && (
                    <button type="button" onClick={resetForm} className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-lg">
                      Cancelar Edição
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1">📅 Data do Jogo:</label>
                  <input 
                    type="date" 
                    value={dataJogo} 
                    onChange={(e) => setDataJogo(e.target.value)} 
                    className="bg-[#03140E] border border-slate-700 text-white p-2.5 rounded-xl font-bold text-sm" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CONFIGURAÇÃO TIME VERMELHO */}
                  <div className="bg-[#03140E]/60 p-4 rounded-2xl border border-rose-900/60 space-y-4">
                    <p className="font-extrabold text-rose-400 text-center uppercase tracking-wide text-xs">Time Vermelho</p>
                    <div>
                      <label className="block text-xs font-bold text-emerald-400 mb-1">🧤 Goleiro (Time Vermelho):</label>
                      <select 
                        value={goleiroA} 
                        onChange={(e) => setGoleiroA(e.target.value)} 
                        className="bg-[#08251B] text-white font-bold text-xs p-2 rounded-xl border border-slate-700 w-full"
                      >
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-400 mb-2">⭐ Jogadores Titulares:</label>
                      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-[#08251B]/40 rounded-xl border border-white/5">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleJogador('A', nome)} 
                            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${jogadoresA.includes(nome) ? 'bg-rose-600 text-white font-bold border-rose-500' : 'bg-slate-800/80 text-slate-300 border-slate-700/60'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-400 mb-2">🔄 Substitutos:</label>
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#08251B]/40 rounded-xl border border-white/5">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleSubstituto('A', nome)} 
                            className={`text-xs px-2 py-0.5 rounded-full border transition-all ${substitutosA.includes(nome) ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-slate-800/40 text-slate-400 border-slate-700/40'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CONFIGURAÇÃO TIME BRANCO */}
                  <div className="bg-[#03140E]/60 p-4 rounded-2xl border border-slate-700 space-y-4">
                    <p className="font-extrabold text-slate-100 text-center uppercase tracking-wide text-xs">Time Branco</p>
                    <div>
                      <label className="block text-xs font-bold text-emerald-400 mb-1">🧤 Goleiro (Time Branco):</label>
                      <select 
                        value={goleiroB} 
                        onChange={(e) => setGoleiroB(e.target.value)} 
                        className="bg-[#08251B] text-white font-bold text-xs p-2 rounded-xl border border-slate-700 w-full"
                      >
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-400 mb-2">⭐ Jogadores Titulares:</label>
                      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-[#08251B]/40 rounded-xl border border-white/5">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleJogador('B', nome)} 
                            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${jogadoresB.includes(nome) ? 'bg-slate-100 text-slate-950 font-bold border-white' : 'bg-slate-800/80 text-slate-300 border-slate-700/60'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-400 mb-2">🔄 Substitutos:</label>
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#08251B]/40 rounded-xl border border-white/5">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleSubstituto('B', nome)} 
                            className={`text-xs px-2 py-0.5 rounded-full border transition-all ${substitutosB.includes(nome) ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-slate-800/40 text-slate-400 border-slate-700/40'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* MARCAÇÃO DE GOLS */}
                <div className="bg-[#03140E]/80 p-4 rounded-2xl border border-white/10 space-y-3">
                  <p className="font-extrabold text-amber-300 text-center uppercase tracking-wide text-xs">⚽ Lançamento de Gols Marcados</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-rose-400 mb-2">Atletas do Time Vermelho:</p>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {[...jogadoresA, ...(substitutosA || []), `⚠️ Gol Contra (Time Vermelho)`].map(nome => (
                          <div key={nome} className="flex justify-between items-center bg-[#08251B]/60 p-2 rounded-xl text-xs">
                            <span className="font-bold text-white">{nome}</span>
                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => handleGolsJogador(nome, -1)} className="bg-[#03140E] text-white font-black w-6 h-6 rounded flex items-center justify-center">-</button>
                              <span className="font-black text-amber-300 w-4 text-center">{golsDetalhados[nome] || 0}</span>
                              <button type="button" onClick={() => handleGolsJogador(nome, 1)} className="bg-emerald-500 text-slate-950 font-black w-6 h-6 rounded flex items-center justify-center">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-200 mb-2">Atletas do Time Branco:</p>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {[...jogadoresB, ...(substitutosB || []), `⚠️ Gol Contra (Time Branco)`].map(nome => (
                          <div key={nome} className="flex justify-between items-center bg-[#08251B]/60 p-2 rounded-lg text-xs">
                            <span className="font-bold text-white">{nome}</span>
                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => handleGolsJogador(nome, -1)} className="bg-[#03140E] text-white font-black w-6 h-6 rounded flex items-center justify-center">-</button>
                              <span className="font-black text-amber-300 w-4 text-center">{golsDetalhados[nome] || 0}</span>
                              <button type="button" onClick={() => handleGolsJogador(nome, 1)} className="bg-emerald-500 text-slate-950 font-black w-6 h-6 rounded flex items-center justify-center">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button type="submit" className="bg-emerald-500 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-400 transition-all text-xs">
                    💾 Salvar Súmula
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

      {/* RODAPÉ MANTIDO */}
      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-white/10 pt-4">
        Aplicativo <span className="text-amber-300 font-extrabold">Olho no Lance</span> • Desenvolvido por <span className="text-emerald-300 font-bold">{NOME_DESENVOLVEDOR}</span>
      </footer>
    </div>
  );
}