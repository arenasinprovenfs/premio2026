import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Dados do Prêmio Mangabeira (Craque) - Apenas o nome e os pontos
const dadosMangabeira = [
  { nome: "Adriano", pontos: 65 },
  { nome: "Rodrigo", pontos: 56 },
  { nome: "Jandir", pontos: 56 },
  { nome: "Ballet", pontos: 55 },
  { nome: "Robério", pontos: 54 },
  { nome: "Lucas", pontos: 51 },
  { nome: "Talisca", pontos: 51 },
  { nome: "Rafa", pontos: 50 },
  { nome: "Ricardo", pontos: 47 },
  { nome: "Raul", pontos: 47 },
  { nome: "Canário", pontos: 46 },
  { nome: "Reinaldo", pontos: 46 },
  { nome: "Remi", pontos: 45 },
  { nome: "Minuano", pontos: 45 },
  { nome: "Rafael Santana", pontos: 44 },
  { nome: "PJ", pontos: 44 },
  { nome: "Albino", pontos: 44 },
  { nome: "Amaury", pontos: 43 },
  { nome: "Capela", pontos: 42 },
  { nome: "Vini HC", pontos: 41 },
  { nome: "M. Yuri", pontos: 40 },
  { nome: "Oliveira", pontos: 40 },
  { nome: "Rapha Diniz", pontos: 40 },
  { nome: "I. Galvão", pontos: 38 },
  { nome: "Gamarra", pontos: 37 },
  { nome: "Morais", pontos: 37 },
  { nome: "Vanderson", pontos: 36 },
  { nome: "R. Mateus", pontos: 34 },
  { nome: "André", pontos: 34 },
  { nome: "Michel", pontos: 31 },
  { nome: "Garcia", pontos: 31 },
  { nome: "Marcelinho", pontos: 30 },
  { nome: "Harley", pontos: 30 },
  { nome: "M. Galvão", pontos: 28 },
  { nome: "Filipinho", pontos: 28 },
  { nome: "Nando", pontos: 27 },
  { nome: "Otaner", pontos: 26 },
  { nome: "Gusta", pontos: 26 },
  { nome: "Murilo", pontos: 25 },
  { nome: "Gutto", pontos: 25 },
  { nome: "Diniz", pontos: 23 },
  { nome: "Dyeggo", pontos: 20 },
  { nome: "Carioca", pontos: 18 },
  { nome: "Zé Paulo", pontos: 16 },
  { pos: 45, nome: "Juracy", pontos: 13 },
  { nome: "Kiko", pontos: 13 },
  { nome: "PH", pontos: 11 },
  { nome: "Babinha", pontos: 8 },
  { nome: "Marcola", pontos: 8 },
  { nome: "Guga", pontos: 7 },
  { nome: "Miskinis", pontos: 6 },
  { nome: "Dai", pontos: 4 },
  { nome: "Gilberto", pontos: 3 },
  { nome: "Jefinho", pontos: 3 }
];

// Dados do Prêmio Brocador (Artilharia)
const dadosBrocador = [
  { nome: "Remi", gols: 50 },
  { nome: "Rodrigo", gols: 45 },
  { nome: "Raul", gols: 44 },
  { nome: "Rafa", gols: 36 },
  { nome: "Lucas", gols: 29 },
  { nome: "Ricardo", gols: 29 },
  { nome: "Jandir", gols: 25 },
  { nome: "M. Yuri", gols: 23 },
  { nome: "Gutto", gols: 22 },
  { nome: "Murilo", gols: 19 },
  { nome: "Nando", gols: 18 },
  { nome: "Adriano", gols: 15 },
  { nome: "Diniz", gols: 12 },
  { nome: "André", gols: 12 },
  { nome: "PH", gols: 11 },
  { nome: "Canário", gols: 11 },
  { nome: "Vini HC", gols: 11 },
  { nome: "Gamarra", gols: 10 },
  { nome: "Vanderson", gols: 10 },
  { nome: "R. Mateus", gols: 10 },
  { nome: "Gusta", gols: 9 },
  { nome: "Morais", gols: 8 },
  { nome: "Robério", gols: 7 },
  { nome: "Talisca", gols: 7 },
  { nome: "Filipinho", gols: 7 },
  { nome: "Ballet", gols: 6 },
  { nome: "Carioca", gols: 6 },
  { nome: "Michel", gols: 5 },
  { nome: "Minuano", gols: 5 },
  { nome: "PJ", gols: 4 },
  { nome: "Otaner", gols: 4 },
  { nome: "Reinaldo", gols: 4 },
  { nome: "Jefinho", gols: 3 },
  { nome: "Juracy", gols: 3 },
  { nome: "Marcelinho", gols: 3 },
  { nome: "Capela", gols: 3 },
  { nome: "Guga", gols: 3 },
  { nome: "Dai", gols: 2 },
  { nome: "Telle", gols: 2 },
  { nome: "Rapha Diniz", gols: 2 },
  { nome: "Albino", gols: 2 },
  { nome: "Zé Paulo", gols: 2 },
  { nome: "Dyeggo", gols: 1 },
  { nome: "Babinha", gols: 1 },
  { nome: "Garcia", gols: 1 },
  { nome: "M. Galvão", gols: 1 },
  { nome: "Amaury", gols: 1 },
  { nome: "Ivamário", gols: 1 },
  { nome: "Rafha Santana", gols: 1 },
  { nome: "Oliveira", gols: 1 },
  { nome: "Marcola", gols: 1 },
  { nome: "Beradeiro", gols: 1 }
];

// Dados dos Goleiros (Prêmio César)
const dadosCesar = [
  { nome: 'Tellê', pontos: 79, golsSofridos: 106 },
  { nome: 'Baianinho', pontos: 54, golsSofridos: 177 },
  { nome: 'Roberto', pontos: 46, golsSofridos: 118 },
  { nome: 'Rogério', pontos: 16, golsSofridos: 52 },
];

export default function App() {
  const [aba, setAba] = useState('geral');

  // Ordenação AUTOMÁTICA do maior para o menor com calculo de posição
  const rankingMangabeira = [...dadosMangabeira]
    .sort((a, b) => b.pontos - a.pontos)
    .map((item, index) => ({ ...item, pos: index + 1 }));

  const rankingBrocador = [...dadosBrocador]
    .sort((a, b) => b.gols - a.gols)
    .map((item, index) => ({ ...item, pos: index + 1 }));

  const rankingCesar = [...dadosCesar]
    .sort((a, b) => b.pontos - a.pontos)
    .map((item, index) => ({ ...item, pos: index + 1 }));

  // Selos G7 (Apenas no Prêmio Mangabeira - Top 7)
  const getPodioBadgeG7 = (pos) => {
    if (pos <= 7) {
      return (
        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-1 rounded-lg font-bold text-sm flex items-center gap-1 w-fit">
          ⭐ #{pos} G7
        </span>
      );
    }
    return <span className="text-slate-500 font-semibold px-2">#{pos}</span>;
  };

  // Selos para 1º Colocado
  const getPodioApenasPrimeiro = (pos, corBadge = 'emerald') => {
    if (pos === 1) {
      if (corBadge === 'blue') {
        return (
          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-1 rounded-lg font-extrabold text-sm flex items-center gap-1 w-fit">
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
    return <span className="text-slate-500 font-semibold px-2">#{pos}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wide flex items-center gap-2">
            🏆 ARENA SINPROVENFS - PRÊMIOS 2026
          </h1>
          <p className="text-slate-400 text-sm mt-1">Painel Oficial de Desempenho e Classificação</p>
        </div>
        <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button 
            onClick={() => setAba('geral')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'geral' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Visão Geral
          </button>
          <button 
            onClick={() => setAba('mangabeira')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'mangabeira' ? 'bg-indigo-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Craque (Mangabeira)
          </button>
          <button 
            onClick={() => setAba('brocador')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'brocador' ? 'bg-emerald-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Artilharia (Brocador)
          </button>
          <button 
            onClick={() => setAba('cesar')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${aba === 'cesar' ? 'bg-blue-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Goleiros (César)
          </button>
        </div>
      </header>

      {/* ABA VISÃO GERAL */}
      {aba === 'geral' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Prêmio Mangabeira</span>
              <p className="text-slate-400 text-sm mt-3">Líder do Ranking</p>
              <p className="text-3xl font-black text-white mt-1">{rankingMangabeira[0]?.nome}</p>
              <p className="text-amber-400 font-bold text-lg mt-1">{rankingMangabeira[0]?.pontos} <span className="text-sm font-normal text-slate-400">pontos</span></p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">Prêmio Brocador</span>
              <p className="text-slate-400 text-sm mt-3">Artilheiro Máximo</p>
              <p className="text-3xl font-black text-white mt-1">{rankingBrocador[0]?.nome}</p>
              <p className="text-emerald-400 font-bold text-lg mt-1">{rankingBrocador[0]?.gols} <span className="text-sm font-normal text-slate-400">gols</span></p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-blue-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-md">Prêmio César</span>
              <p className="text-slate-400 text-sm mt-3">Melhor Goleiro</p>
              <p className="text-3xl font-black text-white mt-1">{rankingCesar[0]?.nome}</p>
              <p className="text-blue-400 font-bold text-lg mt-1">{rankingCesar[0]?.pontos} <span className="text-sm font-normal text-slate-400">pts ({rankingCesar[0]?.golsSofridos} GS)</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
              <p className="text-slate-400 text-xs mb-4">Primeiros 10 colocados na classificação geral</p>
              <div className="h-80 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingMangabeira.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={60} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                    <Bar dataKey="pontos" name="Pontos" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
              <p className="text-slate-400 text-xs mb-4">Primeiros 10 colocados em número de gols</p>
              <div className="h-80 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingBrocador.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={60} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                    <Bar dataKey="gols" name="Gols" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-1">Prêmio César - Desempenho dos Goleiros</h2>
            <p className="text-slate-400 text-xs mb-4">Comparativo de Pontos obtidos vs. Gols Sofridos</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingCesar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="nome" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="pontos" name="Pontos" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="golsSofridos" name="Gols Sofridos" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* ABA MANGABEIRA */}
      {aba === 'mangabeira' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-indigo-400">Classificação Geral - Prêmio Mangabeira</h2>
              <p className="text-slate-400 text-sm mt-1">Destaque especial para a zona de elite (Top 7 G7)</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold">G7 Destacado</span>
              <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-semibold">{rankingMangabeira.length} Jogadores</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
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
                          ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-500/30 font-semibold' 
                          : 'border-slate-800/40 hover:bg-slate-800/30 text-slate-300'
                      }`}
                    >
                      <td className="py-3.5 px-4">{getPodioBadgeG7(item.pos)}</td>
                      <td className={`py-3.5 px-4 ${isTop7 ? 'text-white font-bold text-base' : 'font-medium'}`}>
                        {item.nome}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-amber-400 text-base">
                        {item.pontos} <span className="text-xs text-slate-400 font-normal">pts</span>
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
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-400">Classificação Geral - Prêmio Brocador</h2>
              <p className="text-slate-400 text-sm mt-1">Ranking de artilharia completo com destaque para o Líder</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">{rankingBrocador.length} Jogadores</span>
          </div>
          
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
                {rankingBrocador.map((item) => {
                  const isLider = item.pos === 1;
                  return (
                    <tr 
                      key={item.nome} 
                      className={`border-b transition-all ${
                        isLider 
                          ? 'bg-emerald-950/40 border-emerald-500/30 font-semibold' 
                          : 'border-slate-800/50 hover:bg-slate-800/30'
                      }`}
                    >
                      <td className="py-3 px-4">{getPodioApenasPrimeiro(item.pos, 'emerald')}</td>
                      <td className={`py-3 px-4 ${isLider ? 'text-white font-bold text-base' : 'font-medium'}`}>
                        {item.nome}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400 text-base">
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
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-blue-400 mb-2">Prêmio César - Gráfico dos Goleiros</h2>
            <p className="text-slate-400 text-sm mb-6">Comparação entre Pontuação obtida e Gols Sofridos</p>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingCesar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="nome" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="pontos" name="Pontos" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="golsSofridos" name="Gols Sofridos" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">Tabela de Classificação dos Goleiros</h2>
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
                  {rankingCesar.map((item) => {
                    const isLider = item.pos === 1;
                    return (
                      <tr 
                        key={item.nome} 
                        className={`border-b transition-all ${
                          isLider 
                            ? 'bg-blue-950/40 border-blue-500/30 font-semibold' 
                            : 'border-slate-800/50 hover:bg-slate-800/30'
                        }`}
                      >
                        <td className="py-3 px-4">{getPodioApenasPrimeiro(item.pos, 'blue')}</td>
                        <td className={`py-3 px-4 ${isLider ? 'text-white font-bold text-base' : 'font-medium'}`}>
                          {item.nome}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-amber-400">{item.pontos} pts</td>
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
