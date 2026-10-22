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
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-2 sm:p-6 font-sans flex flex-col justify-between">
      <div>
        <header className="mb-6 border-b border-emerald-800/60 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Logo Arena Sinprovenfs" 
              className="h-14 sm:h-16 w-auto object-contain rounded-xl bg-white p-1 shadow-md border border-emerald-700"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                ARENA SINPROVENFS
              </h1>
              <p className="text-emerald-400 font-bold text-xs tracking-wider uppercase">Painel Oficial de Prêmios 2026</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-emerald-900/80 p-1 rounded-xl border border-emerald-800 text-xs sm:text-sm">
            <button 
              onClick={() => setAba('geral')}
              className={`px-3 py-1.5 rounded-lg transition-all ${aba === 'geral' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Visão Geral
            </button>
            <button 
              onClick={() => setAba('jogos')}
              className={`px-3 py-1.5 rounded-lg transition-all ${aba === 'jogos' ? 'bg-teal-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              ⚽ Jogos
            </button>
            <button 
              onClick={() => setAba('mangabeira')}
              className={`px-3 py-1.5 rounded-lg transition-all ${aba === 'mangabeira' ? 'bg-emerald-600 text-white shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Craque
            </button>
            <button 
              onClick={() => setAba('brocador')}
              className={`px-3 py-1.5 rounded-lg transition-all ${aba === 'brocador' ? 'bg-red-600 text-white shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Artilharia
            </button>
            <button 
              onClick={() => setAba('cesar')}
              className={`px-3 py-1.5 rounded-lg transition-all ${aba === 'cesar' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-emerald-200/70 hover:text-white'}`}
            >
              Goleiros
            </button>
            <button 
              onClick={() => { resetForm(); setAba('cadastrar'); }}
              className={`px-3 py-1.5 rounded-lg transition-all ${aba === 'cadastrar' ? 'bg-amber-400 text-slate-950 shadow-md font-black' : 'bg-emerald-800/80 text-amber-300 hover:text-white border border-amber-500/40'}`}
            >
              ➕ Cadastrar
            </button>
          </div>
        </header>

        {aba === 'geral' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">Prêmio Mangabeira</span>
                <p className="text-emerald-200/70 text-xs mt-2">Líder do Ranking</p>
                <p className="text-2xl font-black text-white mt-0.5">{rankingMangabeira[0]?.nome}</p>
                <p className="text-emerald-400 font-bold text-base mt-0.5">{rankingMangabeira[0]?.pontos} <span className="text-xs font-normal text-emerald-200/60">pontos</span></p>
              </div>

              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-red-500/30 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/20 px-2 py-0.5 rounded">Prêmio Brocador</span>
                <p className="text-emerald-200/70 text-xs mt-2">Artilheiro Máximo</p>
                <p className="text-2xl font-black text-white mt-0.5">{rankingBrocador[0]?.nome}</p>
                <p className="text-red-400 font-bold text-base mt-0.5">{rankingBrocador[0]?.gols} <span className="text-xs font-normal text-emerald-200/60">gols</span></p>
              </div>

              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">Prêmio César</span>
                <p className="text-emerald-200/70 text-xs mt-2">Melhor Goleiro</p>
                <p className="text-2xl font-black text-white mt-0.5">{rankingCesar[0]?.nome}</p>
                <p className="text-amber-300 font-bold text-base mt-0.5">{rankingCesar[0]?.pontos} <span className="text-xs font-normal text-emerald-200/60">pts ({rankingCesar[0]?.golsSofridos} GS)</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80">
                <h2 className="text-lg font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
                <p className="text-emerald-200/60 text-xs mb-3">Primeiros 10 colocados na classificação geral</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingMangabeira.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                      <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={50} />
                      <YAxis stroke="#a7f3d0" />
                      <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="pontos" name="Pontos" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80">
                <h2 className="text-lg font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
                <p className="text-emerald-200/60 text-xs mb-3">Primeiros 10 colocados em número de gols</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingBrocador.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                      <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={50} />
                      <YAxis stroke="#a7f3d0" />
                      <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="gols" name="Gols" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80 mb-6">
              <h2 className="text-lg font-bold text-white mb-1">Prêmio César - Desempenho dos Goleiros</h2>
              <p className="text-emerald-200/60 text-xs mb-3">Comparativo entre Pontos obtidos vs. Gols Sofridos</p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingCesar}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                    <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#a7f3d0" />
                    <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', borderRadius: '8px', color: '#fff' }} />
                    <Legend />
                    <Bar dataKey="pontos" name="Pontos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="golsSofridos" name="Gols Sofridos" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {aba === 'jogos' && (
          <div className="bg-emerald-900/40 p-2 sm:p-4 rounded-2xl border border-emerald-800/80">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 border-b border-emerald-800/60 pb-3">
              <div>
                <h2 className="text-xl font-bold text-teal-300 flex items-center gap-1.5">
                  ⚽ Súmula das Partidas
                </h2>
                <p className="text-emerald-200/60 text-xs">Histórico completo em tempo real</p>
              </div>

              {historico.length > 0 && (
                <div className="flex items-center gap-1.5 bg-emerald-950 p-1.5 rounded-xl border border-emerald-700">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">📅 Data:</span>
                  <select 
                    value={dataSelecionada} 
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    className="bg-emerald-900 text-white font-bold text-xs px-2 py-1 rounded-lg border border-emerald-600 focus:outline-none"
                  >
                    {historico.map(r => (
                      <option key={r.data} value={r.data}>
                        {r.data} ({r.jogos.length} {r.jogos.length > 1 ? 'jogos' : 'jogo'})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {historico.length === 0 ? (
              <div className="text-center py-8 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
                <p className="text-base font-bold text-emerald-300">Nenhuma rodada cadastrada ainda!</p>
                <p className="text-xs text-emerald-200/60 mt-1">Acesse a aba "➕ Cadastrar" para inserir a primeira partida.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {rodadaAtual?.jogos.map((j) => {
                  const listaEscalacaoA = [
                    { nome: j.goleiroA, tipo: 'goleiro' },
                    ...j.jogadoresA.map(n => ({ nome: n, tipo: 'titular' })),
                    ...(j.substitutosA || []).map(n => ({ nome: n, tipo: 'substituto' }))
                  ];

                  const listaEscalacaoB = [
                    { nome: j.goleiroB, tipo: 'goleiro' },
                    ...j.jogadoresB.map(n => ({ nome: n, tipo: 'titular' })),
                    ...(j.substitutosB || []).map(n => ({ nome: n, tipo: 'substituto' }))
                  ];

                  const maxLinhas = Math.max(listaEscalacaoA.length, listaEscalacaoB.length, 1);

                  const getGols = (nome) => {
                    if (!j.golsMarcados) return 0;
                    const item = j.golsMarcados.find(g => g.jogador === nome);
                    return item ? item.quantidade : 0;
                  };

                  return (
                    <div key={j.id} className="w-full max-w-lg mx-auto my-3 font-sans">
                      {/* BOTÕES DE AÇÃO ADMINISTRATIVA E DATA */}
                      <div className="flex justify-between items-center mb-1.5 px-1">
                        <span className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">
                          {j.partida} • {rodadaAtual.data}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => handleEditarJogo(rodadaAtual.data, j)}
                            className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold hover:bg-amber-500 hover:text-slate-950 transition-all"
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            onClick={() => handleDeletarJogo(j.id)}
                            className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold hover:bg-red-600 hover:text-white transition-all"
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      </div>

                      {/* DESIGN ESTILO COMPACTO - CORES DA ARENA SINPROVENFS */}
                      <div className="rounded-xl overflow-hidden shadow-2xl border border-emerald-700/80 bg-emerald-950">
                        {/* BARRA SUPERIOR DO PLACAR */}
                        <div className="relative bg-emerald-900/90 border-b-2 border-emerald-600 flex items-center justify-between px-2 sm:px-4 py-1.5">
                          {/* TIME VERMELHO */}
                          <div className="flex items-center gap-1.5 w-5/12">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center font-black text-white text-[10px] border border-white shadow">
                              VER
                            </div>
                            <span className="font-black text-white text-xs sm:text-sm tracking-wide uppercase truncate">
                              VERMELHO
                            </span>
                          </div>

                          {/* CENTRO: PLACAR E "X" */}
                          <div className="flex items-center justify-center gap-1.5 z-10 w-2/12">
                            <span className="font-black text-lg sm:text-2xl text-white bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700 shadow-inner">
                              {j.golsA}
                            </span>
                            <span className="font-extrabold text-xs text-amber-400 uppercase">
                              X
                            </span>
                            <span className="font-black text-lg sm:text-2xl text-white bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700 shadow-inner">
                              {j.golsB}
                            </span>
                          </div>

                          {/* TIME BRANCO */}
                          <div className="flex items-center justify-end gap-1.5 w-5/12 text-right">
                            <span className="font-black text-white text-xs sm:text-sm tracking-wide uppercase truncate">
                              BRANCO
                            </span>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center font-black text-slate-900 text-[10px] border border-slate-400 shadow">
                              BRA
                            </div>
                          </div>
                        </div>

                        {/* TABELA DE JOGADORES (CORES VERDE ESMERALDA / CAMPO) */}
                        <div className="divide-y divide-emerald-800/40 bg-emerald-950">
                          {Array.from({ length: maxLinhas }).map((_, idx) => {
                            const pA = listaEscalacaoA[idx];
                            const pB = listaEscalacaoB[idx];
                            const isEven = idx % 2 === 0;

                            const colsA = pA ? getGols(pA.nome) : 0;
                            const colsB = pB ? getGols(pB.nome) : 0;

                            return (
                              <div 
                                key={idx} 
                                className={`flex justify-between items-center px-2.5 sm:px-4 py-1 text-[11px] sm:text-xs transition-colors ${
                                  isEven ? 'bg-emerald-950' : 'bg-emerald-900/40'
                                }`}
                              >
                                {/* LADO ESQUERDO: TIME VERMELHO */}
                                <div className="flex items-center gap-1 w-1/2 pr-1 min-w-0">
                                  {pA ? (
                                    <>
                                      <span className={`font-extrabold uppercase tracking-wide truncate ${
                                        pA.tipo === 'goleiro' ? 'text-amber-300' : pA.tipo === 'substituto' ? 'text-emerald-300/70' : 'text-emerald-100'
                                      }`}>
                                        {pA.tipo === 'goleiro' && '🧤 '}
                                        {pA.nome}
                                        {pA.tipo === 'substituto' && ' (Sub)'}
                                      </span>
                                      {colsA > 0 && (
                                        <span className="bg-red-600 text-white font-black text-[9px] px-1 py-0.2 rounded-full shadow flex-shrink-0">
                                          ⚽ {colsA}
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-transparent">-</span>
                                  )}
                                </div>

                                {/* LADO DIREITO: TIME BRANCO */}
                                <div className="flex items-center justify-end gap-1 w-1/2 pl-1 text-right min-w-0">
                                  {pB ? (
                                    <>
                                      {colsB > 0 && (
                                        <span className="bg-slate-100 text-slate-950 font-black text-[9px] px-1 py-0.2 rounded-full shadow flex-shrink-0">
                                          ⚽ {colsB}
                                        </span>
                                      )}
                                      <span className={`font-extrabold uppercase tracking-wide truncate ${
                                        pB.tipo === 'goleiro' ? 'text-amber-300' : pB.tipo === 'substituto' ? 'text-emerald-300/70' : 'text-emerald-100'
                                      }`}>
                                        {pB.tipo === 'substituto' && '(Sub) '}
                                        {pB.nome}
                                        {pB.tipo === 'goleiro' && ' 🧤'}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-transparent">-</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
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
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80">
            <h2 className="text-xl font-bold text-emerald-300 mb-1">Prêmio Mangabeira - Craque do Campeonato</h2>
            <p className="text-emerald-200/60 text-xs mb-4">Classificação geral baseada nos pontos conquistados por partida</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800 text-[11px] font-black uppercase text-emerald-400 bg-emerald-950/80">
                    <th className="p-2.5">Posição</th>
                    <th className="p-2.5">Atleta</th>
                    <th className="p-2.5 text-right">Pontos Totais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/40 text-xs sm:text-sm">
                  {rankingMangabeira.map(item => (
                    <tr key={item.nome} className="hover:bg-emerald-900/30 transition-colors">
                      <td className="p-2.5 font-bold">{item.pos <= 7 ? `⭐ #${item.pos} G7` : `#${item.pos}`}</td>
                      <td className="p-2.5 font-extrabold text-white">{item.nome}</td>
                      <td className="p-2.5 text-right font-black text-emerald-400">{item.pontos} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'brocador' && (
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80">
            <h2 className="text-xl font-bold text-red-400 mb-1">Prêmio Brocador - Artilharia</h2>
            <p className="text-emerald-200/60 text-xs mb-4">Classificação geral de marcadores de gol</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800 text-[11px] font-black uppercase text-red-400 bg-emerald-950/80">
                    <th className="p-2.5">Posição</th>
                    <th className="p-2.5">Atleta</th>
                    <th className="p-2.5 text-right">Gols Marcados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/40 text-xs sm:text-sm">
                  {rankingBrocador.map(item => (
                    <tr key={item.nome} className="hover:bg-emerald-900/30 transition-colors">
                      <td className="p-2.5 font-bold">{item.pos === 1 ? '🏆 #1º Lugar' : `#${item.pos}`}</td>
                      <td className="p-2.5 font-extrabold text-white">{item.nome}</td>
                      <td className="p-2.5 text-right font-black text-red-400">{item.gols} gols</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'cesar' && (
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80">
            <h2 className="text-xl font-bold text-amber-400 mb-1">Prêmio César - Desempenho de Goleiros</h2>
            <p className="text-emerald-200/60 text-xs mb-4">Pontuação geral e total de gols sofridos</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800 text-[11px] font-black uppercase text-amber-400 bg-emerald-950/80">
                    <th className="p-2.5">Posição</th>
                    <th className="p-2.5">Goleiro</th>
                    <th className="p-2.5 text-center">Gols Sofridos</th>
                    <th className="p-2.5 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/40 text-xs sm:text-sm">
                  {rankingCesar.map(item => (
                    <tr key={item.nome} className="hover:bg-emerald-900/30 transition-colors">
                      <td className="p-2.5 font-bold">{item.pos === 1 ? '🏆 #1º Lugar' : `#${item.pos}`}</td>
                      <td className="p-2.5 font-extrabold text-white">{item.nome}</td>
                      <td className="p-2.5 text-center text-red-300 font-bold">{item.golsSofridos}</td>
                      <td className="p-2.5 text-right font-black text-amber-400">{item.pontos} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'cadastrar' && (
          <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800/80 max-w-4xl mx-auto">
            {!autenticado ? (
              <form onSubmit={handleLogin} className="bg-emerald-950/80 p-6 rounded-2xl border border-amber-500/30 text-center space-y-4">
                <h3 className="text-lg font-black text-amber-300">🔐 Área Restrita do Administrador</h3>
                <p className="text-emerald-200/70 text-xs">Digite a senha para cadastrar ou editar partidas da liga.</p>
                <input 
                  type="password" 
                  value={senhaInput} 
                  onChange={(e) => setSenhaInput(e.target.value)} 
                  placeholder="Senha de acesso..." 
                  className="bg-emerald-900 border border-emerald-700 text-white p-2 rounded-lg text-center w-full max-w-xs block mx-auto text-sm focus:outline-none"
                />
                <button type="submit" className="bg-amber-400 text-slate-950 font-black px-5 py-2 rounded-lg shadow-lg hover:bg-amber-300 transition-all text-sm">
                  Entrar no Painel
                </button>
              </form>
            ) : (
              <form onSubmit={handleSalvarJogo} className="space-y-5">
                <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
                  <h3 className="text-lg font-black text-amber-300">
                    {jogoEditandoId ? '✏️ Editar Partida Existente' : '➕ Cadastrar Nova Partida'}
                  </h3>
                  {jogoEditandoId && (
                    <button type="button" onClick={resetForm} className="text-xs bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-1 rounded-lg">
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
                    className="bg-emerald-950 border border-emerald-700 text-white p-2 rounded-lg font-bold text-xs" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CONFIGURAÇÃO TIME VERMELHO */}
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-red-900/60 space-y-3">
                    <p className="font-extrabold text-red-400 text-center uppercase tracking-wide text-xs">Time Vermelho</p>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">🧤 Goleiro (Time Vermelho):</label>
                      <select 
                        value={goleiroA} 
                        onChange={(e) => setGoleiroA(e.target.value)} 
                        className="bg-emerald-900 text-white font-bold text-xs p-1.5 rounded-lg border border-emerald-700 w-full"
                      >
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1.5">⭐ Jogadores Titulares:</label>
                      <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleJogador('A', nome)} 
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${jogadoresA.includes(nome) ? 'bg-red-600 text-white font-bold border-red-500' : 'bg-emerald-950/60 text-emerald-200 border-emerald-800'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-amber-400 mb-1.5">🔄 Substitutos:</label>
                      <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleSubstituto('A', nome)} 
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${substitutosA.includes(nome) ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-emerald-950/60 text-emerald-200/60 border-emerald-800'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CONFIGURAÇÃO TIME BRANCO */}
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-slate-700 space-y-3">
                    <p className="font-extrabold text-slate-100 text-center uppercase tracking-wide text-xs">Time Branco</p>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">🧤 Goleiro (Time Branco):</label>
                      <select 
                        value={goleiroB} 
                        onChange={(e) => setGoleiroB(e.target.value)} 
                        className="bg-emerald-900 text-white font-bold text-xs p-1.5 rounded-lg border border-emerald-700 w-full"
                      >
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1.5">⭐ Jogadores Titulares:</label>
                      <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleJogador('B', nome)} 
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${jogadoresB.includes(nome) ? 'bg-slate-200 text-slate-950 font-bold border-white' : 'bg-emerald-950/60 text-emerald-200 border-emerald-800'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-amber-400 mb-1.5">🔄 Substitutos:</label>
                      <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button 
                            type="button" 
                            key={nome} 
                            onClick={() => toggleSubstituto('B', nome)} 
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${substitutosB.includes(nome) ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-emerald-950/60 text-emerald-200/60 border-emerald-800'}`}
                          >
                            {nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* MARCAÇÃO DE GOLS */}
                <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-700 space-y-2">
                  <p className="font-extrabold text-amber-300 text-center uppercase tracking-wide text-xs">⚽ Lançamento de Gols Marcados</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] font-bold text-red-400 mb-1.5">Atletas do Time Vermelho:</p>
                      <div className="space-y-1 max-h-36 overflow-y-auto">
                        {[...jogadoresA, ...(substitutosA || []), `⚠️ Gol Contra (Time Vermelho)`].map(nome => (
                          <div key={nome} className="flex justify-between items-center bg-emerald-900/60 p-1.5 rounded-lg text-xs">
                            <span className="font-bold text-white text-[11px]">{nome}</span>
                            <div className="flex items-center gap-1.5">
                              <button type="button" onClick={() => handleGolsJogador(nome, -1)} className="bg-emerald-950 text-white font-black w-5 h-5 rounded flex items-center justify-center text-xs">-</button>
                              <span className="font-black text-amber-300 w-3 text-center text-xs">{golsDetalhados[nome] || 0}</span>
                              <button type="button" onClick={() => handleGolsJogador(nome, 1)} className="bg-emerald-500 text-slate-950 font-black w-5 h-5 rounded flex items-center justify-center text-xs">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-200 mb-1.5">Atletas do Time Branco:</p>
                      <div className="space-y-1 max-h-36 overflow-y-auto">
                        {[...jogadoresB, ...(substitutosB || []), `⚠️ Gol Contra (Time Branco)`].map(nome => (
                          <div key={nome} className="flex justify-between items-center bg-emerald-900/60 p-1.5 rounded-lg text-xs">
                            <span className="font-bold text-white text-[11px]">{nome}</span>
                            <div className="flex items-center gap-1.5">
                              <button type="button" onClick={() => handleGolsJogador(nome, -1)} className="bg-emerald-950 text-white font-black w-5 h-5 rounded flex items-center justify-center text-xs">-</button>
                              <span className="font-black text-amber-300 w-3 text-center text-xs">{golsDetalhados[nome] || 0}</span>
                              <button type="button" onClick={() => handleGolsJogador(nome, 1)} className="bg-emerald-500 text-slate-950 font-black w-5 h-5 rounded flex items-center justify-center text-xs">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-emerald-800">
                  <button type="submit" className="bg-emerald-500 text-slate-950 font-black px-5 py-2.5 rounded-xl shadow-lg hover:bg-emerald-400 transition-all text-xs">
                    💾 Salvar Súmula
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-xs text-emerald-400/60 border-t border-emerald-800/40 pt-3">
        Aplicativo <span className="text-amber-300 font-extrabold">Olho no Lance</span> • Desenvolvido por <span className="text-emerald-300 font-bold">{NOME_DESENVOLVEDOR}</span>
      </footer>
    </div>
  );
}