import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Todos os 54 jogadores do Prêmio Mangabeira (Craque)
const rankingMangabeira = [
  { pos: 1, nome: "Adriano", pontos: 65 },
  { pos: 2, nome: "Rodrigo", pontos: 56 },
  { pos: 3, nome: "Jandir", pontos: 56 },
  { pos: 4, nome: "Ballet", pontos: 55 },
  { pos: 5, nome: "Robério", pontos: 54 },
  { pos: 6, nome: "Lucas", pontos: 51 },
  { pos: 7, nome: "Talisca", pontos: 51 },
  { pos: 8, nome: "Rafa", pontos: 50 },
  { pos: 9, nome: "Ricardo", pontos: 47 },
  { pos: 10, nome: "Raul", pontos: 47 },
  { pos: 11, nome: "Canário", pontos: 46 },
  { pos: 12, nome: "Reinaldo", pontos: 46 },
  { pos: 13, nome: "Remi", pontos: 45 },
  { pos: 14, nome: "Minuano", pontos: 45 },
  { pos: 15, nome: "Rafael Santana", pontos: 44 },
  { pos: 16, nome: "PJ", pontos: 44 },
  { pos: 17, nome: "Albino", pontos: 44 },
  { pos: 18, nome: "Amaury", pontos: 43 },
  { pos: 19, nome: "Capela", pontos: 42 },
  { pos: 20, nome: "Vini HC", pontos: 41 },
  { pos: 21, nome: "M. Yuri", pontos: 40 },
  { pos: 22, nome: "Oliveira", pontos: 40 },
  { pos: 23, nome: "Rapha Diniz", pontos: 40 },
  { pos: 24, nome: "I. Galvão", pontos: 38 },
  { pos: 25, nome: "Gamarra", pontos: 37 },
  { pos: 26, nome: "Morais", pontos: 37 },
  { pos: 27, nome: "Vanderson", pontos: 36 },
  { pos: 28, nome: "R. Mateus", pontos: 34 },
  { pos: 29, nome: "André", pontos: 34 },
  { pos: 30, nome: "Michel", pontos: 31 },
  { pos: 31, nome: "Garcia", pontos: 31 },
  { pos: 32, nome: "Marcelinho", pontos: 30 },
  { pos: 33, nome: "Harley", pontos: 30 },
  { pos: 34, nome: "M. Galvão", pontos: 28 },
  { pos: 35, nome: "Filipinho", pontos: 28 },
  { pos: 36, nome: "Nando", pontos: 27 },
  { pos: 37, nome: "Otaner", pontos: 26 },
  { pos: 38, nome: "Gusta", pontos: 26 },
  { pos: 39, nome: "Murilo", pontos: 25 },
  { pos: 40, nome: "Gutto", pontos: 25 },
  { pos: 41, nome: "Diniz", pontos: 23 },
  { pos: 42, nome: "Dyeggo", pontos: 20 },
  { pos: 43, nome: "Carioca", pontos: 18 },
  { pos: 44, nome: "Zé Paulo", pontos: 16 },
  { pos: 45, nome: "Juracy", pontos: 13 },
  { pos: 46, nome: "Kiko", pontos: 13 },
  { pos: 47, nome: "PH", pontos: 11 },
  { pos: 48, nome: "Babinha", pontos: 8 },
  { pos: 49, nome: "Marcola", pontos: 8 },
  { pos: 50, nome: "Guga", pontos: 7 },
  { pos: 51, nome: "Miskinis", pontos: 6 },
  { pos: 52, nome: "Dai", pontos: 4 },
  { pos: 53, nome: "Gilberto", pontos: 3 },
  { pos: 54, nome: "Jefinho", pontos: 3 }
];

// Todos os 52 jogadores do Prêmio Brocador (Artilharia)
const rankingBrocador = [
  { pos: 1, nome: "Remi", gols: 50 },
  { pos: 2, nome: "Rodrigo", gols: 45 },
  { pos: 3, nome: "Raul", gols: 44 },
  { pos: 4, nome: "Rafa", gols: 36 },
  { pos: 5, nome: "Lucas", gols: 29 },
  { pos: 6, nome: "Ricardo", gols: 29 },
  { pos: 7, nome: "Jandir", gols: 25 },
  { pos: 8, nome: "M. Yuri", gols: 23 },
  { pos: 9, nome: "Gutto", gols: 22 },
  { pos: 10, nome: "Murilo", gols: 19 },
  { pos: 11, nome: "Nando", gols: 18 },
  { pos: 12, nome: "Adriano", gols: 15 },
  { pos: 13, nome: "Diniz", gols: 12 },
  { pos: 14, nome: "André", gols: 12 },
  { pos: 15, nome: "PH", gols: 11 },
  { pos: 16, nome: "Canário", gols: 11 },
  { pos: 17, nome: "Vini HC", gols: 11 },
  { pos: 18, nome: "Gamarra", gols: 10 },
  { pos: 19, nome: "Vanderson", gols: 10 },
  { pos: 20, nome: "R. Mateus", gols: 10 },
  { pos: 21, nome: "Gusta", gols: 9 },
  { pos: 22, nome: "Morais", gols: 8 },
  { pos: 23, nome: "Robério", gols: 7 },
  { pos: 24, nome: "Talisca", gols: 7 },
  { pos: 25, nome: "Filipinho", gols: 7 },
  { pos: 26, nome: "Ballet", gols: 6 },
  { pos: 27, nome: "Carioca", gols: 6 },
  { pos: 28, nome: "Michel", gols: 5 },
  { pos: 29, nome: "Minuano", gols: 5 },
  { pos: 30, nome: "PJ", gols: 4 },
  { pos: 31, nome: "Otaner", gols: 4 },
  { pos: 32, nome: "Reinaldo", gols: 4 },
  { pos: 33, nome: "Jefinho", gols: 3 },
  { pos: 34, nome: "Juracy", gols: 3 },
  { pos: 35, nome: "Marcelinho", gols: 3 },
  { pos: 36, nome: "Capela", gols: 3 },
  { pos: 37, nome: "Guga", gols: 3 },
  { pos: 38, nome: "Dai", gols: 2 },
  { pos: 39, nome: "Telle", gols: 2 },
  { pos: 40, nome: "Rapha Diniz", gols: 2 },
  { pos: 41, nome: "Albino", gols: 2 },
  { pos: 42, nome: "Zé Paulo", gols: 2 },
  { pos: 43, nome: "Dyeggo", gols: 1 },
  { pos: 44, nome: "Babinha", gols: 1 },
  { pos: 45, nome: "Garcia", gols: 1 },
  { pos: 46, nome: "M. Galvão", gols: 1 },
  { pos: 47, nome: "Amaury", gols: 1 },
  { pos: 48, nome: "Ivamário", gols: 1 },
  { pos: 49, nome: "Rafha Santana", gols: 1 },
  { pos: 50, nome: "Oliveira", gols: 1 },
  { pos: 51, nome: "Marcola", gols: 1 },
  { pos: 52, nome: "Beradeiro", gols: 1 }
];

// Dados dos Goleiros (Prêmio César)
const rankingCesar = [
  { pos: 1, nome: 'Tellê', pontos: 79, golsSofridos: 106 },
  { pos: 2, nome: 'Baianinho', pontos: 54, golsSofridos: 177 },
  { pos: 3, nome: 'Roberto', pontos: 46, golsSofridos: 118 },
  { pos: 4, nome: 'Rogério', pontos: 16, golsSofridos: 52 },
];

export default function App() {
  const [aba, setAba] = useState('geral');

  // Função única padronizada para os selos ⭐ #1 G7 até ⭐ #7 G7
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wide flex items-center gap-2">
            🏆 ARENA SINPROVENFS - PRÊMIO 2026
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
          {/* Cards Principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Prêmio Mangabeira</span>
              <p className="text-slate-400 text-sm mt-3">Líder do Ranking</p>
              <p className="text-3xl font-black text-white mt-1">Adriano</p>
              <p className="text-amber-400 font-bold text-lg mt-1">65 <span className="text-sm font-normal text-slate-400">pontos</span></p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">Prêmio Brocador</span>
              <p className="text-slate-400 text-sm mt-3">Artilheiro Máximo</p>
              <p className="text-3xl font-black text-white mt-1">Remi</p>
              <p className="text-emerald-400 font-bold text-lg mt-1">50 <span className="text-sm font-normal text-slate-400">gols</span></p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-blue-500/30 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-md">Prêmio César</span>
              <p className="text-slate-400 text-sm mt-3">Melhor Goleiro</p>
              <p className="text-3xl font-black text-white mt-1">Tellê</p>
              <p className="text-blue-400 font-bold text-lg mt-1">79 <span className="text-sm font-normal text-slate-400">pts (106 GS)</span></p>
            </div>
          </div>

          {/* Gráficos Mangabeira e Brocador (Top 10) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">Top 10 - Prêmio Mangabeira (Craque)</h2>
              <p className="text-slate-400 text-xs mb-4">Primeiros 10 colocados na classificação geral</p>
              <div className="h-80 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingMangabeira.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="nome" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-