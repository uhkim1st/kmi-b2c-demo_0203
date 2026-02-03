'use client';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { cn } from '@/lib/utils';
import {
    TrendingUp, Users, Wallet, Calendar, AlertCircle,
    ArrowUpRight, ArrowDownRight, Search, Bell, Menu,
    Award, Target, Database, Settings
} from 'lucide-react';

const REFERRAL_DATA = [
    { name: '영업팀', count: 145, conversion: 68 },
    { name: '마케팅', count: 210, conversion: 75 },
    { name: '개발본부', count: 85, conversion: 42 },
    { name: '인사과', count: 120, conversion: 90 },
    { name: '본사직할', count: 160, conversion: 55 },
];

const REVENUE_DATA = [
    { time: '08:00', occupancy: 95, recommendations: '유지' },
    { time: '10:00', occupancy: 88, recommendations: '유지' },
    { time: '13:00', occupancy: 45, recommendations: '20% 할인 권장' },
    { time: '14:30', occupancy: 30, recommendations: '30% 할인 권장' },
    { time: '16:00', occupancy: 15, recommendations: '40% 타임세일 권장' },
];

const DAILY_TREND = [
    { day: 'Mon', reservations: 42 },
    { day: 'Tue', reservations: 55 },
    { day: 'Wed', reservations: 48 },
    { day: 'Thu', reservations: 70 },
    { day: 'Fri', reservations: 85 },
    { day: 'Sat', reservations: 92 },
    { day: 'Sun', reservations: 35 },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* PC Sidebar */}
            <aside className="hidden lg:flex w-64 bg-slate-900 flex-col py-8 px-6 text-white shrink-0">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl">K</div>
                    <div className="font-bold text-lg leading-tight">KMI <span className="block text-xs font-normal opacity-50">SaaS Interface</span></div>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { icon: LayoutDashboard, label: '통합 대시보드', active: true },
                        { icon: Users, label: '추천 코드 관리' },
                        { icon: Target, label: 'B2C 수익 관리(RM)' },
                        { icon: Database, label: '데이터 분석 센터' },
                        { icon: Settings, label: '사용자 설정' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-colors",
                                item.active ? "bg-blue-600 font-bold" : "hover:bg-slate-800 text-slate-400"
                            )}
                        >
                            {i === 0 ? <LayoutDashboard size={20} /> : <item.icon size={20} />}
                            {item.label}
                        </div>
                    ))}
                </nav>

                <div className="pt-6 border-t border-slate-800">
                    <div className="bg-slate-800 rounded-xl p-4">
                        <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">PRO PLAN ACTIVE</div>
                        <div className="text-sm font-medium">데이터 인사이트 센터</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Header */}
                <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                        <h1 className="text-base md:text-xl font-bold text-slate-900 truncate">SaaS 전용 데이터 인사이트</h1>
                        <span className="shrink-0 bg-blue-50 text-blue-600 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-blue-100 italic">Live</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="검색어 입력..." className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-500 w-64" />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="w-8 h-8 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden" />
                            <span className="text-sm font-bold text-slate-700 hidden sm:inline">관리자님</span>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: '전체 예약 건수', value: '1,248', trend: '+12.5%', icon: Calendar, up: true },
                            { label: 'B2C 전환율', value: '24.8%', trend: '+4.2%', icon: TrendingUp, up: true },
                            { label: '추천 코드 활성수', value: '642', trend: '-2.1%', icon: Users, up: false },
                            { label: '추당수익(ARPU)', value: '38만원', trend: '+8.4%', icon: Wallet, up: true },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                        <stat.icon size={24} />
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-0.5 text-xs font-bold",
                                        stat.up ? "text-green-500" : "text-red-500"
                                    )}>
                                        {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {stat.trend}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart: Office Performance */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">임직원 추천 성과 분석</h3>
                                    <p className="text-sm text-slate-400">부서별 지인 예약 건수 및 전환율</p>
                                </div>
                                <select className="bg-slate-50 border-none rounded-lg text-xs font-bold p-2 outline-none">
                                    <option>최근 30일</option>
                                    <option>최근 3개월</option>
                                </select>
                            </div>
                            <div className="h-[300px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={REFERRAL_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} name="예약건수" />
                                        <Bar dataKey="conversion" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={40} name="전환율(%)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Daily Trend Area Chart */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">실시간 유입 트렌드</h3>
                                <p className="text-sm text-slate-400">B2C 플랫폼 요일별 예약 추이</p>
                            </div>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={DAILY_TREND}>
                                        <defs>
                                            <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="reservations" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-blue-600 font-bold">최고 예약일</div>
                                    <div className="font-black text-slate-900">토요일 (92건)</div>
                                </div>
                                <Award className="text-blue-600" size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Revenue Management (RM) Report */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-900 text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg">수익 최적화(RM) 리포트</h3>
                                    <p className="text-xs opacity-60">센터별 실시간 가동률 분석 및 가격 전략 제안</p>
                                </div>
                            </div>
                            <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all">전략 즉시 적용</button>
                        </div>
                        <div className="p-0 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                            <table className="w-full min-w-[700px] text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="px-5 md:px-8 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">시간대</th>
                                        <th className="px-5 md:px-8 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">현재 가동률</th>
                                        <th className="px-5 md:px-8 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">예상 가동률</th>
                                        <th className="px-5 md:px-8 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">수익 최적화 권장안</th>
                                        <th className="px-5 md:px-8 py-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest text-right">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {REVENUE_DATA.map((row, i) => (
                                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                            <td className="px-5 md:px-8 py-6 font-bold text-slate-900">{row.time}</td>
                                            <td className="px-5 md:px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full",
                                                                row.occupancy > 70 ? "bg-red-500" : row.occupancy > 40 ? "bg-orange-400" : "bg-blue-500"
                                                            )}
                                                            style={{ width: `${row.occupancy}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-bold">{row.occupancy}%</span>
                                                </div>
                                            </td>
                                            <td className="px-5 md:px-8 py-6 text-sm text-slate-500 font-medium">{(row.occupancy + (i % 2 === 0 ? 5 : -3))}%</td>
                                            <td className="px-5 md:px-8 py-6">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[11px] md:text-xs font-bold border",
                                                    row.recommendations.includes('할인')
                                                        ? "bg-blue-50 text-blue-600 border-blue-100"
                                                        : "bg-slate-50 text-slate-500 border-slate-100"
                                                )}>
                                                    {row.recommendations}
                                                </span>
                                            </td>
                                            <td className="px-5 md:px-8 py-6 text-right text-slate-300">
                                                {row.occupancy > 80 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Missing icons
function LayoutDashboard({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    );
}
