import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { categoria: 'Vendas', pontos: 4000 },
  { categoria: 'Metas', pontos: 3000 },
  { categoria: 'Engajamento', pontos: 2000 },
  { categoria: 'Bônus', pontos: 2780 },
];

export default function App() {
  const [pontos, setPontos] = useState(11780);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold text-indigo-400">Dashboard - Prêmios 2026</h1>
        <p className="text-slate-400">Acompanhamento de desempenho e recompensas</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-slate-400 text-sm font-medium">Pontuação Total</h2>
          <p className="text-4xl font-extrabold text-green-400 mt-2">{pontos.toLocaleString()} pts</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-slate-400 text-sm font-medium">Nível Atual</h2>
          <p className="text-4xl font-extrabold text-amber-400 mt-2">Ouro</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-slate-400 text-sm font-medium">Próximo Prêmio</h2>
          <p className="text-4xl font-extrabold text-indigo-400 mt-2">Viagem 2026</p>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-xl font-bold mb-4">Desempenho por Categoria</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="categoria" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
              <Bar dataKey="pontos" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button 
        onClick={() => setPontos(pontos + 500)}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Simular Resgate de Pontos (+500)
      </button>
    </div>
  );
}