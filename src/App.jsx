import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Dados reais extraídos da planilha Prêmios 2026
const dadosMangabeira = [
  { nome: 'Adriano', pontos: 65 },
  { nome: 'Jandir', pontos: 56 },
  { nome: 'Rodrigo', pontos: 56 },
  { nome: 'Ballet', pontos: 55 },
  { nome: 'Robério', pontos: 54 },
  { nome: 'Lucas', pontos: 51 },
  { nome: 'Talisca', pontos: 51 },
  { nome: 'Rafa', pontos: 50 },
  { nome: 'Ricardo', pontos: 47 },
  { nome: 'Raul', pontos: 47 },
];

const dadosBrocador = [
  { nome: 'Remi', gols: 50 },
  { nome: 'Rodrigo', gols: 45 },
  { nome: 'Raul', gols: 44 },
  { nome: 'Rafa', gols: 36 },
  { nome: 'Lucas', gols: 29 },
  { nome: 'Ricardo', gols: 29 },
  { nome: 'Jandir', gols: 25 },
  { nome: 'M. Yuri', gols: 23 },
  { nome: 'Gutto', gols: 22 },
  { nome: 'Murilo', gols: 19 },
];

const dadosCesar = [
  { nome: 'Tellê', pontos: 79, golsSofridos: 106 },
  { nome: 'Baianinho', pontos: 54, golsSofridos: 177 },
  { nome: 'Roberto', pontos: 46, golsSofridos: 118 },
  { nome: 'Rogério', pontos: 16, golsSofridos: 52 },
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
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
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
        </div>
      </header>

      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Prêmio Mangabeira</span>
          <p className="text-slate-400 text-sm mt-3">Líder do Ranking</p>
          <p className="text-3xl font-black text-white mt-1">Adriano</p>
          <p className="text-amber-400 font-bold text-lg mt-1">65 <span className="text-sm font-normal text-slate-400">pontos</span></p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">Prêmio Brocador</span>
          <p className="text-slate-400 text-sm mt-3">Artilheiro Máximo</p>
          <p className="text-3xl font-black text-white mt-1">Remi</p>
          <p className="text-emerald-400 font-bold text-lg mt-1">50 <span className="text-sm font-normal text-slate-400">gols</span></p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-2xl border border-blue-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-md">Prêmio César</span>
          <p className="text-slate-400 text-sm mt-3">Melhor Goleiro</p>
          <p className="text-3xl font-black text-white mt-1">Tellê</p>
          <p className="text-blue-400 font-bold text-lg mt-1">79 <span className="text-sm font-normal text-slate-400">pts (106 GS)</span></p>
        </div>
      </div>

      {/* Seção de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico Mangabeira */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
          <p className="text-slate-400 text-xs mb-6">Pontuação geral acumulada</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosMangabeira} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="pontos" name="Pontos" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico Brocador */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Brocador (Artilharia)</h2>
          <p className="text-slate-400 text-xs mb-6">Total de gols marcados no ano</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosBrocador} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="gols" name="Gols" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico César - Goleiros */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Prêmio César - Desempenho dos Goleiros</h2>
        <p className="text-slate-400 text-xs mb-6">Comparativo de Pontos obtidos vs. Gols Sofridos</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosCesar} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="nome" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Bar dataKey="pontos" name="Pontos" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="golsSofridos" name="Gols Sofridos" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}