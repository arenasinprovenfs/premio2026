import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Dados completos extraídos da planilha Prêmios 2026
const rankingMangabeira = [
  { pos: 1, nome: 'Adriano', pontos: 65 },
  { pos: 2, nome: 'Rodrigo', pontos: 56 },
  { pos: 3, nome: 'Jandir', pontos: 56 },
  { pos: 4, nome: 'Ballet', pontos: 55 },
  { pos: 5, nome: 'Robério', pontos: 54 },
  { pos: 6, nome: 'Lucas', pontos: 51 },
  { pos: 7, nome: 'Talisca', pontos: 51 },
  { pos: 8, nome: 'Rafa', pontos: 50 },
  { pos: 9, nome: 'Ricardo', pontos: 47 },
  { pos: 10, nome: 'Raul', pontos: 47 },
  { pos: 11, nome: 'Canário', pontos: 46 },
  { pos: 12, nome: 'Reinaldo', pontos: 46 },
  { pos: 13, nome: 'Remi', pontos: 45 },
  { pos: 14, nome: 'Minuano', pontos: 45 },
  { pos: 15, nome: 'Rafael Santana', pontos: 44 },
  { pos: 16, nome: 'PJ', pontos: 44 },
  { pos: 17, nome: 'Albino', pontos: 44 },
  { pos: 18, nome: 'Amaury', pontos: 43 },
  { pos: 19, nome: 'Capela', pontos: 42 },
  { pos: 20, nome: 'Vini HC', pontos: 41 },
  { pos: 21, nome: 'M. Yuri', pontos: 40 },
  { pos: 22, nome: 'Oliveira', pontos: 40 },
  { pos: 23, nome: 'Rapha Diniz', pontos: 40 },
  { pos: 24, nome: 'I. Galvão', pontos: 38 },
  { pos: 25, nome: 'Gamarra', pontos: 37 },
  { pos: 26, nome: 'Morais', pontos: 37 },
  { pos: 27, nome: 'Vanderson', pontos: 36 },
  { pos: 28, nome: 'R. Mateus', pontos: 34 },
  { pos: 29, nome: 'André', pontos: 34 },
  { pos: 30, nome: 'Michel', pontos: 31 },
];

const rankingBrocador = [
  { pos: 1, nome: 'Remi', gols: 50 },
  { pos: 2, nome: 'Rodrigo', gols: 45 },
  { pos: 3, nome: 'Raul', gols: 44 },
  { pos: 4, nome: 'Rafa', gols: 36 },
  { pos: 5, nome: 'Lucas', gols: 29 },
  { pos: 6, nome: 'Ricardo', gols: 29 },
  { pos: 7, nome: 'Jandir', gols: 25 },
  { pos: 8, nome: 'M. Yuri', gols: 23 },
  { pos: 9, nome: 'Gutto', gols: 22 },
  { pos: 10, nome: 'Murilo', gols: 19 },
  { pos: 11, nome: 'Nando', gols: 18 },
  { pos: 12, nome: 'Adriano', gols: 15 },
  { pos: 13, nome: 'Diniz', gols: 12 },
  { pos: 14, nome: 'André', gols: 12 },
  { pos: 15, nome: 'PH', gols: 11 },
  { pos: 16, nome: 'Canário', gols: 11 },
  { pos: 17, nome: 'Vini HC', gols: 11 },
  { pos: 18, nome: 'Gamarra', gols: 10 },
  { pos: 19, nome: 'Vanderson', gols: 10 },
  { pos: 20, nome: 'R. Mateus', gols: 10 },
];

const rankingCesar = [
  { pos: 1, nome: 'Tellê', pontos: 79, golsSofridos: 106 },
  { pos: 2, nome: 'Baianinho', pontos: 54, golsSofridos: 177 },
  { pos: 3, nome: 'Roberto', pontos: 46, golsSofridos: 118 },
  { pos: 4, nome: 'Rogério', pontos: 16, golsSofridos: 52 },
];

export default function App() {
  const [aba, setAba] = useState('geral');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-amber-400 tracking-wide">🏆 Prêmios 2026</h1>
          <p className="text-slate-400 text-sm mt-1">Painel Oficial de Desempenho e Classificação</p>
        </div>
        <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button 
            onClick={() => setAba('geral')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${aba === 'geral' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Visão Geral
          </button>
          <button 
            onClick={() => setAba('mangabeira')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${aba === 'mangabeira' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Craque (Mangabeira)
          </button>
          <button 
            onClick={() => setAba('brocador')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${aba === 'brocador' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Artilharia (Brocador)
          </button>
          <button 
            onClick={() => setAba('cesar')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${aba === 'cesar' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Goleiros (César)
          </button>
        </div>
      </header>

      {/* CONTEÚDO DA ABA VISÃO GERAL */}
      {aba === 'geral' && (
        <>
          {/* Cards Principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Prêmio Mangabeira</span>
              <p className="text-slate-400 text-sm mt-3">Líder do Ranking</p>
              <p className="text-3xl font-black text-white mt-1">Adriano</p>
              <p className="text-amber-400 font-bold text-lg mt-1">65 <span className="text-sm font-normal text-slate-400">pontos</span></p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">Prêmio Brocador</span>
              <p className="text-slate-400 text-sm mt-3">Artilheiro Máximo</p>
              <p className="text-3xl font-black text-white mt-1">Remi</p>
              <p className="text-emerald-400 font-bold text-lg mt-1">50 <span className="text-sm font-normal text-slate-400">gols</span></p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-blue-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-md">Prêmio César</span>
              <p className="text-slate-400 text-sm mt-3">Melhor Goleiro</p>
              <p className="text-3xl font-black text-white mt-1">Tellê</p>
              <p className="text-blue-400 font-bold text-lg mt-1">79 <span className="text-sm font-normal text-slate-400">pts (106 GS)</span></p>
            </div>
          </div>

          {/* Gráficos Resumidos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingMangabeira.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Bar dataKey="pontos" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingBrocador.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Bar dataKey="gols" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO DA ABA CRAQUE (MANGABEIRA) */}
      {aba === 'mangabeira' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-indigo-400 mb-2">Classificação Geral - Prêmio Mangabeira</h2>
          <p className="text-slate-400 text-sm mb-6">Pontuação acumulada de todos os jogadores</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-sm">
                  <th className="py-3 px-4">Posição</th>
                  <th className="py-3 px-4">Jogador</th>
                  <th className="py-3 px-4 text-right">Pontuação Geral</th>
                </tr>
              </thead>
              <tbody>
                {rankingMangabeira.map((item) => (
                  <tr key={item.pos} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-indigo-400">#{item.pos}</td>
                    <td className="py-3 px-4 font-medium text-white">{item.nome}</td>
                    <td className="py-3 px-4 text-right font-bold text-amber-400">{item.pontos} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA ARTILHARIA (BROCADOR) */}
      {aba === 'brocador' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">Classificação Geral - Prêmio Brocador</h2>
          <p className="text-slate-400 text-sm mb-6">Ranking de Artilharia do Campeonato</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-sm">
                  <th className="py-3 px-4">Posição</th>
                  <th className="py-3 px-4">Jogador</th>
                  <th className="py-3 px-4 text-right">Total de Gols</th>
                </tr>
              </thead>
              <tbody>
                {rankingBrocador.map((item) => (
                  <tr key={item.pos} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-emerald-400">#{item.pos}</td>
                    <td className="py-3 px-4 font-medium text-white">{item.nome}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">{item.gols} gols</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA GOLEIROS (CÉSAR) */}
      {aba === 'cesar' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-blue-400 mb-2">Classificação Geral - Prêmio César</h2>
          <p className="text-slate-400 text-sm mb-6">Desempenho Geral dos Goleiros</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-sm">
                  <th className="py-3 px-4">Posição</th>
                  <th className="py-3 px-4">Goleiro</th>
                  <th className="py-3 px-4 text-center">Pontos</th>
                  <th className="py-3 px-4 text-right">Gols Sofridos</th>
                </tr>
              </thead>
              <tbody>
                {rankingCesar.map((item) => (
                  <tr key={item.pos} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-blue-400">#{item.pos}</td>
                    <td className="py-3 px-4 font-medium text-white">{item.nome}</td>
                    <td className="py-3 px-4 text-center font-bold text-amber-400">{item.pontos} pts</td>
                    <td className="py-3 px-4 text-right font-bold text-red-400">{item.golsSofridos} GS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}