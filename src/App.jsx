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

// Ícone Vetorial de Camisa
const CamisaIcon = ({ corCamisa = "#dc2626", corBorda = "#ffffff" }) => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
    <path 
      d="M 28,15 L 40,24 Q 50,27 60,24 L 72,15 L 90,32 L 78,44 L 78,85 L 22,85 L 22,44 L 10,32 Z" 
      fill={corCamisa} 
      stroke={corBorda} 
      strokeWidth="3.5" 
    />
  </svg>
);

// Componente do Campo Tático Responsivo
const Campo3D = ({ goleiro, titulares = [], reservas = [], corTime = "red", nomeTime = "Time Vermelho" }) => {
  const isRed = corTime === "red";
  const corCamisaLinha = isRed ? "#dc2626" : "#f8fafc";
  const corCamisaGoleiro = "#f59e0b"; 

  // Formação Tática Fixo: 1 Zagueiro, 2 Laterais, 1 Volante, 2 Meias, 1 Atacante
  const posicoesLinha = [
    { top: '80%', left: '50%', sigla: 'ZC' }, 
    { top: '72%', left: '18%', sigla: 'LE' }, 
    { top: '72%', left: '82%', sigla: 'LD' }, 
    { top: '58%', left: '50%', sigla: 'VOL' }, 
    { top: '38%', left: '30%', sigla: 'ME' }, 
    { top: '38%', left: '70%', sigla: 'MD' }, 
    { top: '20%', left: '50%', sigla: 'ATA' }, 
  ];

  return (
    <div className="flex flex-col items-center w-full my-2">
      <p className={`font-black text-xs sm:text-sm uppercase tracking-wider mb-2 ${isRed ? 'text-red-400' : 'text-slate-100'}`}>
        ⚽ Escalação {nomeTime}
      </p>

      {/* Container Adaptável para Celular */}
      <div className="w-full max-w-xs sm:max-w-sm flex justify-center py-1">
        <div className="relative w-full h-[290px] sm:h-[340px] bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800 rounded-xl border-4 border-emerald-950 shadow-2xl overflow-hidden shadow-emerald-950/80">
          
          {/* Marcações do Campo */}
          <div className="absolute inset-2 border-2 border-white/50 rounded-sm"></div>
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t-2 border-white/50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/50 rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-12 sm:w-40 sm:h-16 border-2 border-b-0 border-white/50 bg-white/5"></div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-12 sm:w-40 sm:h-16 border-2 border-t-0 border-white/50 bg-white/5"></div>

          {/* Goleiro */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            <CamisaIcon corCamisa={corCamisaGoleiro} corBorda="#ffffff" />
            <span className="text-[9px] sm:text-[10px] font-black bg-slate-950/90 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 mt-0.5 max-w-[70px] sm:max-w-[90px] truncate shadow">
              {goleiro || "Goleiro"} (G)
            </span>
          </div>

          {/* Jogadores de Linha */}
          {posicoesLinha.map((pos, idx) => {
            const nomeJogador = titulares[idx];
            if (!nomeJogador) return null;
            return (
              <div 
                key={idx} 
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ top: pos.top, left: pos.left }}
              >
                <CamisaIcon corCamisa={corCamisaLinha} corBorda={isRed ? "#ffffff" : "#0f172a"} />
                <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border mt-0.5 max-w-[70px] sm:max-w-[90px] truncate shadow ${isRed ? 'bg-red-950/90 text-white border-red-500/50' : 'bg-slate-900/90 text-slate-100 border-slate-400'}`}>
                  {nomeJogador}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Banco de Reservas Otimizado */}
      {reservas && reservas.length > 0 && (
        <div className="w-full max-w-xs sm:max-w-sm bg-emerald-950/90 p-2 sm:p-2.5 rounded-xl border border-emerald-700/60 mt-2 shadow">
          <p className="text-[10px] sm:text-[11px] font-extrabold text-amber-400 mb-1 flex items-center gap-1 uppercase">
            🔄 Reservas ({reservas.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {reservas.map((nome, i) => (
              <span key={i} className="text-[10px] sm:text-xs bg-emerald-900/80 text-emerald-100 px-2 py-0.5 rounded-md border border-emerald-600/50 font-semibold">
                {nome}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [aba, setAba] = useState('geral');
  const [historico, setHistorico] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState('');

  // Sincronização Firestore
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
      alert('Faça login como administrador para editar.');
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
      alert('Faça login como administrador para excluir.');
      return;
    }

    if (window.confirm('Excluir esta súmula permanentemente?')) {
      try {
        await deleteDoc(doc(db, "partidas", idJogo));
        alert('Súmula excluída!');
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir no Firestore.');
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
      alert('Súmula salva com sucesso!');
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
        <header className="mb-6 border-b border-emerald-800/60 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Logo Arena Sinprovenfs" 
              className="h-12 sm:h-16 w-auto object-contain rounded-xl bg-white p-1 shadow border border-emerald-700"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                ARENA SINPROVENFS
              </h1>
              <p className="text-emerald-400 font-bold text-xs tracking-wider uppercase">Painel Oficial de Prêmios 2026</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-emerald-900/80 p-1.5 rounded-xl border border-emerald-800 w-full md:w-auto">
            <button onClick={() => setAba('geral')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${aba === 'geral' ? 'bg-emerald-500 text-slate-950' : 'text-emerald-200'}`}>Visão Geral</button>
            <button onClick={() => setAba('jogos')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${aba === 'jogos' ? 'bg-teal-500 text-slate-950' : 'text-emerald-200'}`}>⚽ Jogos</button>
            <button onClick={() => setAba('mangabeira')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${aba === 'mangabeira' ? 'bg-emerald-600 text-white' : 'text-emerald-200'}`}>Craque</button>
            <button onClick={() => setAba('brocador')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${aba === 'brocador' ? 'bg-red-600 text-white' : 'text-emerald-200'}`}>Artilharia</button>
            <button onClick={() => setAba('cesar')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${aba === 'cesar' ? 'bg-amber-500 text-slate-950' : 'text-emerald-200'}`}>Goleiros</button>
            <button onClick={() => { resetForm(); setAba('cadastrar'); }} className={`px-3 py-1.5 rounded-lg text-xs font-black ${aba === 'cadastrar' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-800 text-amber-300'}`}>➕ Cadastrar</button>
          </div>
        </header>

        {aba === 'geral' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">Prêmio Mangabeira</span>
                <p className="text-2xl font-black text-white mt-2">{rankingMangabeira[0]?.nome}</p>
                <p className="text-emerald-400 font-bold text-sm mt-0.5">{rankingMangabeira[0]?.pontos} pts</p>
              </div>

              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-red-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/20 px-2 py-0.5 rounded">Prêmio Brocador</span>
                <p className="text-2xl font-black text-white mt-2">{rankingBrocador[0]?.nome}</p>
                <p className="text-red-400 font-bold text-sm mt-0.5">{rankingBrocador[0]?.gols} gols</p>
              </div>

              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-amber-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">Prêmio César</span>
                <p className="text-2xl font-black text-white mt-2">{rankingCesar[0]?.nome}</p>
                <p className="text-amber-300 font-bold text-sm mt-0.5">{rankingCesar[0]?.pontos} pts ({rankingCesar[0]?.golsSofridos} GS)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800">
                <h2 className="text-lg font-bold text-white mb-2">Top 10 - Craque (Mangabeira)</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingMangabeira.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                      <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
                      <YAxis stroke="#a7f3d0" />
                      <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', color: '#fff' }} />
                      <Bar dataKey="pontos" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800">
                <h2 className="text-lg font-bold text-white mb-2">Top 10 - Artilharia (Brocador)</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankingBrocador.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                      <XAxis dataKey="nome" stroke="#a7f3d0" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
                      <YAxis stroke="#a7f3d0" />
                      <Tooltip contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', color: '#fff' }} />
                      <Bar dataKey="gols" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        {aba === 'jogos' && (
          <div className="bg-emerald-900/40 p-3 sm:p-6 rounded-2xl border border-emerald-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 border-b border-emerald-800/60 pb-3">
              <div>
                <h2 className="text-xl font-bold text-teal-300">⚽ Súmula e Resultados</h2>
              </div>

              {historico.length > 0 && (
                <div className="flex items-center gap-2 bg-emerald-950 p-1.5 rounded-xl border border-emerald-700 w-full sm:w-auto justify-between">
                  <span className="text-xs font-bold text-emerald-400">Rodada:</span>
                  <select 
                    value={dataSelecionada} 
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    className="bg-emerald-900 text-white font-bold text-xs px-2 py-1 rounded-lg border border-emerald-600 focus:outline-none"
                  >
                    {historico.map(r => (
                      <option key={r.data} value={r.data}>{r.data} ({r.jogos.length} jogos)</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {historico.length === 0 ? (
              <div className="text-center py-8 bg-emerald-950/60 rounded-xl">
                <p className="text-sm font-bold text-emerald-300">Nenhuma rodada cadastrada!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {rodadaAtual?.jogos.map((j) => {
                  const golsTimeA = j.golsMarcados ? j.golsMarcados.filter(g => j.jogadoresA.includes(g.jogador) || (j.substitutosA && j.substitutosA.includes(g.jogador)) || g.jogador.includes('Vermelho')) : [];
                  const golsTimeB = j.golsMarcados ? j.golsMarcados.filter(g => j.jogadoresB.includes(g.jogador) || (j.substitutosB && j.substitutosB.includes(g.jogador)) || g.jogador.includes('Branco')) : [];

                  return (
                    <div key={j.id} className="bg-emerald-950/90 p-3 sm:p-5 rounded-2xl border border-emerald-800/80 shadow-lg">
                      <div className="flex justify-between items-center mb-3 border-b border-emerald-800/60 pb-2 flex-wrap gap-2">
                        <span className="text-xs font-black uppercase text-emerald-400">{j.partida} • {rodadaAtual.data}</span>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => handleEditarJogo(rodadaAtual.data, j)} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-xs font-bold">✏️ Editar</button>
                          <button onClick={() => handleDeletarJogo(j.id)} className="bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full text-xs font-bold">🗑️ Excluir</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center my-3">
                        <div className="w-2/5 text-right">
                          <p className="font-extrabold text-red-400 text-sm sm:text-base">Time Vermelho</p>
                          <p className="text-[11px] text-amber-300 font-semibold">🧤 {j.goleiroA}</p>
                        </div>
                        <div className="bg-emerald-900 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl font-black text-amber-300 text-lg sm:text-2xl border border-emerald-600">
                          {j.golsA} x {j.golsB}
                        </div>
                        <div className="w-2/5 text-left">
                          <p className="font-extrabold text-slate-100 text-sm sm:text-base">Time Branco</p>
                          <p className="text-[11px] text-amber-300 font-semibold">🧤 {j.goleiroB}</p>
                        </div>
                      </div>

                      {/* CAMPOS TÁTICOS RESPONSIVOS */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4 bg-emerald-900/30 p-2 sm:p-4 rounded-2xl border border-emerald-800">
                        <Campo3D goleiro={j.goleiroA} titulares={j.jogadoresA} reservas={j.substitutosA} corTime="red" nomeTime="Time Vermelho" />
                        <Campo3D goleiro={j.goleiroB} titulares={j.jogadoresB} reservas={j.substitutosB} corTime="white" nomeTime="Time Branco" />
                      </div>

                      {/* RESUMO DOS GOLS */}
                      {(golsTimeA.length > 0 || golsTimeB.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-2 border-t border-emerald-800/80">
                          <div>
                            {golsTimeA.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                <span className="text-[11px] font-bold text-red-400 mr-1">⚽ Gols (Vermelho):</span>
                                {golsTimeA.map((g, idx) => (
                                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                    {g.jogador} ({g.quantidade})
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            {golsTimeB.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                <span className="text-[11px] font-bold text-slate-200 mr-1">⚽ Gols (Branco):</span>
                                {golsTimeB.map((g, idx) => (
                                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                    {g.jogador} ({g.quantidade})
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {aba === 'mangabeira' && (
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">Prêmio Mangabeira - Craque</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-800 uppercase text-emerald-400 bg-emerald-950">
                    <th className="p-2">Pos</th>
                    <th className="p-2">Atleta</th>
                    <th className="p-2 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/40">
                  {rankingMangabeira.map(item => (
                    <tr key={item.nome}>
                      <td className="p-2 font-bold">#{item.pos}</td>
                      <td className="p-2 font-extrabold text-white">{item.nome}</td>
                      <td className="p-2 text-right font-black text-emerald-400">{item.pontos} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'brocador' && (
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800">
            <h2 className="text-xl font-bold text-red-400 mb-4">Prêmio Brocador - Artilharia</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-800 uppercase text-red-400 bg-emerald-950">
                    <th className="p-2">Pos</th>
                    <th className="p-2">Atleta</th>
                    <th className="p-2 text-right">Gols</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/40">
                  {rankingBrocador.map(item => (
                    <tr key={item.nome}>
                      <td className="p-2 font-bold">#{item.pos}</td>
                      <td className="p-2 font-extrabold text-white">{item.nome}</td>
                      <td className="p-2 text-right font-black text-red-400">{item.gols} gols</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'cesar' && (
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800">
            <h2 className="text-xl font-bold text-amber-400 mb-4">Prêmio César - Goleiros</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-800 uppercase text-amber-400 bg-emerald-950">
                    <th className="p-2">Pos</th>
                    <th className="p-2">Goleiro</th>
                    <th className="p-2 text-center">Gols Sofridos</th>
                    <th className="p-2 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/40">
                  {rankingCesar.map(item => (
                    <tr key={item.nome}>
                      <td className="p-2 font-bold">#{item.pos}</td>
                      <td className="p-2 font-extrabold text-white">{item.nome}</td>
                      <td className="p-2 text-center text-red-300 font-bold">{item.golsSofridos}</td>
                      <td className="p-2 text-right font-black text-amber-400">{item.pontos} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {aba === 'cadastrar' && (
          <div className="bg-emerald-900/40 p-4 sm:p-6 rounded-2xl border border-emerald-800 max-w-4xl mx-auto">
            {!autenticado ? (
              <form onSubmit={handleLogin} className="bg-emerald-950/80 p-6 rounded-2xl border border-amber-500/30 text-center space-y-4">
                <h3 className="text-lg font-black text-amber-300">🔐 Área Restrita</h3>
                <input 
                  type="password" 
                  value={senhaInput} 
                  onChange={(e) => setSenhaInput(e.target.value)} 
                  placeholder="Senha de acesso..." 
                  className="bg-emerald-900 border border-emerald-700 text-white p-2.5 rounded-lg text-center w-full max-w-xs block mx-auto focus:outline-none"
                />
                <button type="submit" className="bg-amber-400 text-slate-950 font-black px-6 py-2 rounded-lg shadow">Entrar</button>
              </form>
            ) : (
              <form onSubmit={handleSalvarJogo} className="space-y-6">
                <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
                  <h3 className="text-lg font-black text-amber-300">{jogoEditandoId ? '✏️ Editar Súmula' : '➕ Nova Súmula'}</h3>
                  {jogoEditandoId && (
                    <button type="button" onClick={resetForm} className="text-xs bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-1 rounded">Cancelar</button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1">📅 Data:</label>
                  <input type="date" value={dataJogo} onChange={(e) => setDataJogo(e.target.value)} className="bg-emerald-950 border border-emerald-700 text-white p-2 rounded-lg font-bold text-xs" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* TIME VERMELHO */}
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-red-900/60 space-y-3">
                    <p className="font-extrabold text-red-400 text-center uppercase text-xs">Time Vermelho</p>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">Goleiro:</label>
                      <select value={goleiroA} onChange={(e) => setGoleiroA(e.target.value)} className="bg-emerald-900 text-white font-bold text-xs p-2 rounded-lg border border-emerald-700 w-full">
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">Titulares ({jogadoresA.length}/7):</label>
                      <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button type="button" key={nome} onClick={() => toggleJogador('A', nome)} className={`text-[10px] px-2 py-0.5 rounded-full border ${jogadoresA.includes(nome) ? 'bg-red-600 text-white font-bold' : 'bg-emerald-950/60 text-emerald-200'}`}>{nome}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-amber-400 mb-1">Reservas ({substitutosA.length}):</label>
                      <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button type="button" key={nome} onClick={() => toggleSubstituto('A', nome)} className={`text-[10px] px-2 py-0.5 rounded-full border ${substitutosA.includes(nome) ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-950/60 text-emerald-200/60'}`}>{nome}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* TIME BRANCO */}
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-slate-700 space-y-3">
                    <p className="font-extrabold text-slate-100 text-center uppercase text-xs">Time Branco</p>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">Goleiro:</label>
                      <select value={goleiroB} onChange={(e) => setGoleiroB(e.target.value)} className="bg-emerald-900 text-white font-bold text-xs p-2 rounded-lg border border-emerald-700 w-full">
                        {GOLEIROS_OPCOES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">Titulares ({jogadoresB.length}/7):</label>
                      <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button type="button" key={nome} onClick={() => toggleJogador('B', nome)} className={`text-[10px] px-2 py-0.5 rounded-full border ${jogadoresB.includes(nome) ? 'bg-slate-200 text-slate-950 font-bold' : 'bg-emerald-950/60 text-emerald-200'}`}>{nome}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-amber-400 mb-1">Reservas ({substitutosB.length}):</label>
                      <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800">
                        {ASSOCIADOS_OPCOES.map(nome => (
                          <button type="button" key={nome} onClick={() => toggleSubstituto('B', nome)} className={`text-[10px] px-2 py-0.5 rounded-full border ${substitutosB.includes(nome) ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-950/60 text-emerald-200/60'}`}>{nome}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRÉ-VISUALIZAÇÃO DOS CAMPOS AO CADASTRAR */}
                {(jogadoresA.length > 0 || jogadoresB.length > 0) && (
                  <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-700">
                    <p className="font-extrabold text-amber-300 text-center uppercase text-xs mb-2">📋 Pré-Visualização Tática</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Campo3D goleiro={goleiroA} titulares={jogadoresA} reservas={substitutosA} corTime="red" nomeTime="Time Vermelho" />
                      <Campo3D goleiro={goleiroB} titulares={jogadoresB} reservas={substitutosB} corTime="white" nomeTime="Time Branco" />
                    </div>
                  </div>
                )}

                {/* LANÇAMENTO DE GOLS */}
                <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-700 space-y-3">
                  <p className="font-extrabold text-amber-300 text-center uppercase text-xs">⚽ Lançamento de Gols</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] font-bold text-red-400 mb-1">Atletas (Time Vermelho):</p>
                      <div className="space-y-1 max-h-36 overflow-y-auto">
                        {[...jogadoresA, ...(substitutosA || []), `⚠️ Gol Contra (Time Vermelho)`].map(nome => (
                          <div key={nome} className="flex justify-between items-center bg-emerald-900/60 p-1.5 rounded text-xs">
                            <span className="font-bold text-white truncate max-w-[150px]">{nome}</span>
                            <div className="flex items-center gap-1.5">
                              <button type="button" onClick={() => handleGolsJogador(nome, -1)} className="bg-emerald-950 text-white font-black w-5 h-5 rounded">-</button>
                              <span className="font-black text-amber-300 w-3 text-center text-xs">{golsDetalhados[nome] || 0}</span>
                              <button type="button" onClick={() => handleGolsJogador(nome, 1)} className="bg-emerald-500 text-slate-950 font-black w-5 h-5 rounded">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-200 mb-1">Atletas (Time Branco):</p>
                      <div className="space-y-1 max-h-36 overflow-y-auto">
                        {[...jogadoresB, ...(substitutosB || []), `⚠️ Gol Contra (Time Branco)`].map(nome => (
                          <div key={nome} className="flex justify-between items-center bg-emerald-900/60 p-1.5 rounded text-xs">
                            <span className="font-bold text-white truncate max-w-[150px]">{nome}</span>
                            <div className="flex items-center gap-1.5">
                              <button type="button" onClick={() => handleGolsJogador(nome, -1)} className="bg-emerald-950 text-white font-black w-5 h-5 rounded">-</button>
                              <span className="font-black text-amber-300 w-3 text-center text-xs">{golsDetalhados[nome] || 0}</span>
                              <button type="button" onClick={() => handleGolsJogador(nome, 1)} className="bg-emerald-500 text-slate-950 font-black w-5 h-5 rounded">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-emerald-800">
                  <button type="submit" className="bg-emerald-500 text-slate-950 font-black px-5 py-2.5 rounded-xl shadow text-xs">
                    💾 Salvar Súmula
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-[11px] text-emerald-400/60 border-t border-emerald-800/40 pt-3">
        Aplicativo <span className="text-amber-300 font-extrabold">Olho no Lance</span> • Desenvolvido por <span className="text-emerald-300 font-bold">{NOME_DESENVOLVEDOR}</span>
      </footer>
    </div>
  );
}