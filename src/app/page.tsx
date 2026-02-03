'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Zap, HeartPulse, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-200 rounded-full blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100 mb-2">
            <Zap size={16} /> B2C 신규 출시 기념 이벤트 중
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15]">
            가장 스마트한<br />
            <span className="text-blue-600">건강검진 파트너</span><br />
            KMI HUB
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
            AI 기반 맞춤 검진 설계부터<br /> 실시간 할인이 적용되는 다이내믹 예약까지.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/reservation"
              className="px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-200"
            >
              간편 예약 시작하기
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/admin"
              className="px-8 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              관리자 모드 체험
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-4xl mx-auto px-4 -mt-10 mb-20 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: HeartPulse, title: "AI 맞춤 패키지", desc: "나이, 성별, 가족력 기반 최적 추천" },
          { icon: Zap, title: "다이내믹 프라이싱", desc: "실시간 잔여 슬롯 혜택 적용" },
          { icon: ShieldCheck, title: "검증된 전문 의료진", desc: "KMI의 35년 검진 노하우" },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 space-y-3"
          >
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <f.icon size={24} />
            </div>
            <h3 className="font-bold text-slate-900">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Referral Info */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold leading-tight">임직원 지인이신가요?</h2>
            <p className="opacity-60">추천 코드를 입력하시면<br /> B2C 전용 특별 혜택을 더해드립니다.</p>
          </div>
          <Link href="/reservation" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
            <UserPlus size={20} /> 추천 코드 입력하고 할인받기
          </Link>
        </div>
      </section>

      <footer className="mt-auto py-10 border-t text-center text-slate-400 text-xs">
        © 2026 KMI Health Management Institute. All rights reserved.
      </footer>
    </div>
  );
}
