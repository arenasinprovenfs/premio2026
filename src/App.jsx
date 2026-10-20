import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Lista Oficial de Associados e Goleiros da Arena para Seleção
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

// HISTÓRICO DE RODADAS POR DATA
const historicoRodadas = [
  {
    data: "18/10/2026",
    rodada: "Rodada 1",
    jogos: [
      {
        id: "r1_j1",
        partida: "PARTIDA 1",
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
        partida: "PARTIDA 2",
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

// Dados Base Globais (Acumulado)
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
  const [dataSelecionada, setDataSelecionada] = useState(historicoRodadas[0]?.data || '');

  // Ordenação automática
  const rankingMangabeira = [...dadosMangabeiraBase]
    .sort((a, b) => b.pontos - a.pontos)
    .map((item, index) => ({ ...item, pos: index + 1 }));

  const rankingBrocador = [...dadosBrocadorBase]
    .sort((a, b) => b.gols - a.gols)
    .map((item, index) => ({ ...item, pos: index + 1 }));

  const rankingCesar = [...dadosCesarBase]
    .sort((a, b) => b.pontos - a.pontos)
    .map((item, index) => ({ ...item, pos: index + 1 }));

  const rodadaAtual = historicoRodadas.find(r => r.data === dataSelecionada) || historicoRodadas[0];

  // Selos G7 (Craque)
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

  // Selos 1º Colocado
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

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 font-sans">
      {/* Header com a Logo */}
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

          <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
            <h2 className="text-xl font-bold text-white mb-1">Prêmio César - Desempenho dos Goleiros</h2>
            <p className="text-emerald-200/60 text-xs mb-4">Comparativo de Pontos obtidos vs. Gols Sofridos</p>
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

      {/* ABA JOGOS DA RODADA COM FILTRO DE DATA */}
      {aba === 'jogos' && (
        <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-emerald-800/60 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-teal-300 flex items-center gap-2">
                ⚽ Súmula e Resultados das Partidas
              </h2>
              <p className="text-emerald-200/60 text-sm mt-1">Histórico completo de partidas com seleção por data</p>
            </div>

            {/* Filtro de Seleção por Data */}
            <div className="flex items-center gap-2 bg-emerald-950 p-2 rounded-xl border border-emerald-700">
              <span className="text-xs font-bold text-emerald-400 uppercase">📅 Data da Rodada:</span>
              <select 
                value={dataSelecionada} 
                onChange={(e) => setDataSelecionada(e.target.value)}
                className="bg-emerald-900 text-white font-bold text-sm px-3 py-1.5 rounded-lg border border-emerald-600 focus:outline-none"
              >
                {historicoRodadas.map(r => (
                  <option key={r.data} value={r.data}>
                    {r.data} ({r.rodada})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {rodadaAtual?.jogos.map((j) => (
              <div key={j.id} className="bg-emerald-950/90 p-5 rounded-2xl border border-emerald-800/80 shadow-lg">
                <div className="flex justify-between items-center mb-4 border-b border-emerald-800/60 pb-2">
                  <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">{j.partida}</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                    Súmula Finalizada
                  </span>
                </div>

                {/* Placar Principal */}
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

                {/* Escalação dos Times */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-emerald-900">
                  <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-800/40">
                    <p className="text-xs font-bold text-emerald-300 mb-2 uppercase">Escalação {j.timeA}:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {j.jogadoresA.map(nome => (
                        <span key={nome} className="bg-emerald-950 text-emerald-200 text-xs px-2 py-1 rounded-md border border-emerald-800">
                          {nome}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-800/40">
                    <p className="text-xs font-bold text-emerald-300 mb-2 uppercase">Escalação {j.timeB}:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {j.jogadoresB.map(nome => (
                        <span key={nome} className="bg-emerald-950 text-emerald-200 text-xs px-2 py-1 rounded-md border border-emerald-800">
                          {nome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Autores dos Gols */}
                {j.golsMarcados.length > 0 && (
                  <div className="mt-4 bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/60">
                    <p className="text-xs font-bold text-amber-300 mb-1">⚽ Autores dos Gols:</p>
                    <div className="flex flex-wrap gap-2 text-xs text-emerald-100">
                      {j.golsMarcados.map((g, idx) => (
                        <span key={idx} className="bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/20 font-medium">
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
        <div className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-300">Classificação Geral - Prêmio Mangabeira</h2>
              <p className="text-emerald-200/60 text-sm mt-1">Destaque especial para a zona de elite (Top 7 G7)</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">G7 Destacado</span>
              <span className="bg-emerald-950 text-emerald-300/70 px-3 py-1 rounded-full text-xs font-semibold">{rankingMangabeira.length} Jogadores</span>
            </div>
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
              <p className="text-emerald-200/60 text-sm mt-1">Ranking de artilharia completo com destaque para o Líder</p>
            </div>
            <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">{rankingBrocador.length} Jogadores</span>
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
            <h2 className="text-2xl font-bold text-amber-300 mb-2">Prêmio César - Gráfico dos Goleiros</h2>
            <p className="text-emerald-200/60 text-sm mb-6">Comparação entre Pontuação obtida e Gols Sofridos</p>
            <div className="h-80 w-full">
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
  );
}