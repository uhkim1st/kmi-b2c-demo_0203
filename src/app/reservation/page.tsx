'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PACKAGES, CALCULATE_PRICE, type Profile, type Package, type Slot } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Check, ChevronRight, User, Calendar, CreditCard, Sparkles, BrainCircuit, BarChart3, AlertCircle } from 'lucide-react';

type Step = 'REFERRAL' | 'SURVEY' | 'RECOMMENDATION' | 'CALENDAR' | 'CONFIRMATION';

export default function ReservationPage() {
    const [step, setStep] = useState<Step>('REFERRAL');
    const [referralCode, setReferralCode] = useState('');
    const [profile, setProfile] = useState<Profile>({ age: 30, gender: 'male', familyHistory: [] });
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    const nextStep = (next: Step) => setStep(next);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Navbar */}
            <nav className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">K</span>
                        </div>
                        <span className="font-bold text-blue-900">KMI 건강검진</span>
                    </div>
                    <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        B2C 전용 예약
                    </div>
                </div>
            </nav>

            <main className="max-w-md mx-auto px-4 pt-8">
                {/* Progress Indicator */}
                <div className="flex justify-between mb-8 px-2">
                    {['REFERRAL', 'SURVEY', 'CALENDAR', 'CONFIRMATION'].map((s, i) => {
                        const isActive = step === s || (s === 'SURVEY' && step === 'RECOMMENDATION');
                        const isDone = ['REFERRAL', 'SURVEY', 'RECOMMENDATION', 'CALENDAR', 'CONFIRMATION'].indexOf(step) > ['REFERRAL', 'SURVEY', 'CALENDAR', 'CONFIRMATION'].indexOf(s);

                        return (
                            <div key={s} className="flex flex-col items-center gap-1">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                    isActive ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-200" :
                                        isDone ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"
                                )}>
                                    {isDone ? <Check size={16} /> : i + 1}
                                </div>
                                <span className={cn("text-[10px] font-medium", isActive ? "text-blue-600" : "text-slate-400")}>
                                    {s === 'REFERRAL' ? '코드입력' : s === 'SURVEY' ? 'AI추천' : s === 'CALENDAR' ? '일정선택' : '예약확정'}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    {step === 'REFERRAL' && (
                        <motion.div
                            key="referral"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-bold text-slate-900">지인 추천 코드가 있나요?</h1>
                                <p className="text-slate-500">임직원 추천 코드를 입력하시면<br />특별 혜택가로 예약을 진행할 수 있습니다.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <input
                                    type="text"
                                    placeholder="추천 코드 6자리 입력"
                                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-xl font-bold tracking-widest uppercase"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value.slice(0, 6))}
                                />
                                <button
                                    onClick={() => nextStep('SURVEY')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                                >
                                    {referralCode.length === 6 ? '코드 적용 완료' : '코드 없이 진행하기'}
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <Sparkles className="text-blue-600 flex-shrink-0" size={20} />
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    지금 코드를 입력하면 <b>최대 15% 추가 할인</b> 및 <b>AI 정밀 영양 상담권</b>이 증정됩니다.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 'SURVEY' && (
                        <motion.div
                            key="survey"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-slate-900">맞춤 검진을 위한 정보</h1>
                                <p className="text-slate-500">AI가 당신의 건강 상태를 분석합니다.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                                {/* Age Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-sm font-bold text-slate-700">연령대</label>
                                        <span className="text-2xl font-black text-blue-600">{profile.age}세</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="20"
                                        max="80"
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        value={profile.age}
                                        onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                                    />
                                </div>

                                {/* Gender */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">성별</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['male', 'female'].map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => setProfile({ ...profile, gender: g as any })}
                                                className={cn(
                                                    "py-3 rounded-xl border-2 font-bold transition-all",
                                                    profile.gender === g
                                                        ? "border-blue-600 bg-blue-50 text-blue-600"
                                                        : "border-slate-100 text-slate-400 hover:border-slate-200"
                                                )}
                                            >
                                                {g === 'male' ? '남성' : '여성'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Family History */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">가족력 (중복 선택)</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['고혈압', '심장질환', '암', '뇌졸중', '당뇨', '기타 없음'].map((h) => (
                                            <button
                                                key={h}
                                                onClick={() => {
                                                    const history = profile.familyHistory.includes(h)
                                                        ? profile.familyHistory.filter(i => i !== h)
                                                        : [...profile.familyHistory, h];
                                                    setProfile({ ...profile, familyHistory: history });
                                                }}
                                                className={cn(
                                                    "py-3 px-2 rounded-xl border text-sm transition-all",
                                                    profile.familyHistory.includes(h)
                                                        ? "bg-slate-900 border-slate-900 text-white"
                                                        : "bg-white border-slate-200 text-slate-500"
                                                )}
                                            >
                                                {h}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => nextStep('RECOMMENDATION')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all"
                                >
                                    AI 분석 결과 확인하기
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'RECOMMENDATION' && (
                        <motion.div
                            key="recommendation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <BrainCircuit className="text-white" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">AI 맞춤형 분석 완료</h2>
                                    <p className="text-xs text-slate-500">당신의 건강 프로필을 기반으로 추천합니다.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {PACKAGES.map((pkg) => {
                                    const isRecommended =
                                        (profile.age >= 40 && pkg.id === 'cancer-screening') ||
                                        (profile.familyHistory.includes('고혈압') && pkg.id === 'cardio') ||
                                        (profile.age < 40 && pkg.id === 'basic') ||
                                        (profile.familyHistory.includes('암') && pkg.id === 'cancer-screening');

                                    return (
                                        <div
                                            key={pkg.id}
                                            onClick={() => {
                                                setSelectedPackage(pkg);
                                                nextStep('CALENDAR');
                                            }}
                                            className={cn(
                                                "relative p-6 rounded-2xl border-2 cursor-pointer transition-all group overflow-hidden",
                                                isRecommended
                                                    ? "border-blue-600 bg-white shadow-xl shadow-blue-100 ring-4 ring-blue-50"
                                                    : "border-slate-100 bg-white hover:border-blue-200"
                                            )}
                                        >
                                            {isRecommended && (
                                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-bl-xl font-bold uppercase tracking-wider">
                                                    Best Match
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                                                <p className="text-sm text-slate-500 line-clamp-2">{pkg.description}</p>

                                                <div className="flex flex-wrap gap-1 py-4">
                                                    {pkg.features.map(f => (
                                                        <span key={f} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                                            {f}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-end pt-2">
                                                    <div className="space-y-0.5">
                                                        <span className="text-xs text-slate-400">기본 요금</span>
                                                        <div className="text-2xl font-black text-slate-900">
                                                            {pkg.basePrice.toLocaleString()}원
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        <ChevronRight />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {step === 'CALENDAR' && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-slate-900">일정을 선택하세요</h1>
                                    <div className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded">
                                        B2C 할인 기간
                                    </div>
                                </div>
                                <p className="text-slate-500">가동률이 낮은 평일 오후는 추가 할인이 적용됩니다.</p>
                            </div>

                            {/* Day Selection (Simple horizontal slider) */}
                            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
                                {Array.from({ length: 7 }).map((_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + i + 1);
                                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                    return (
                                        <button
                                            key={i}
                                            className={cn(
                                                "flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all",
                                                i === 0 ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-white"
                                            )}
                                        >
                                            <span className="text-[10px] font-bold opacity-60">2월</span>
                                            <span className="text-xl font-black">{date.getDate()}</span>
                                            <span className={cn("text-[10px] font-bold", isWeekend ? "text-red-500" : "text-blue-500")}>
                                                {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Time Slots */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-sm font-bold text-slate-700">방문 시간대 ({selectedPackage?.name})</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { time: '08:30', occupancy: 95 },
                                        { time: '10:00', occupancy: 80 },
                                        { time: '13:30', occupancy: 25 },
                                        { time: '15:00', occupancy: 15 },
                                    ].map((slot) => {
                                        const pricing = CALCULATE_PRICE(selectedPackage?.basePrice || 0, slot.occupancy);
                                        const isDiscounted = pricing.discountRate > 0;

                                        return (
                                            <button
                                                key={slot.time}
                                                onClick={() => {
                                                    setSelectedSlot({ id: slot.time, date: '2/10', time: slot.time, occupancy: slot.occupancy, basePrice: selectedPackage?.basePrice || 0 });
                                                    nextStep('CONFIRMATION');
                                                }}
                                                className={cn(
                                                    "flex items-center justify-between p-5 rounded-2xl border-2 transition-all group",
                                                    isDiscounted
                                                        ? "border-blue-100 bg-blue-50/30 hover:border-blue-600"
                                                        : "border-slate-100 bg-white hover:border-blue-200"
                                                )}
                                            >
                                                <div className="flex flex-col items-start gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold text-slate-900">{slot.time}</span>
                                                        {isDiscounted && (
                                                            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                                핫딜 30%
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={cn("h-full transition-all", slot.occupancy > 50 ? "bg-red-400" : "bg-blue-400")}
                                                                style={{ width: `${slot.occupancy}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] text-slate-400">잔여 {100 - slot.occupancy}%</span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    {isDiscounted && (
                                                        <div className="text-xs text-slate-400 line-through">
                                                            {selectedPackage?.basePrice.toLocaleString()}원
                                                        </div>
                                                    )}
                                                    <div className={cn("text-xl font-black", isDiscounted ? "text-blue-600" : "text-slate-900")}>
                                                        {pricing.finalPrice.toLocaleString()}원
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                                <AlertCircle className="text-orange-500 shrink-0" size={18} />
                                <p className="text-[11px] text-orange-800 leading-tight">
                                    <b>예약 가이드:</b> 오후 시간대 신청 시 더욱 쾌적하고 조용한 환경에서 검진을 받으실 수 있습니다.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 'CONFIRMATION' && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center py-4">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                                    <Check size={40} strokeWidth={3} />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900">예약이 완료되었습니다!</h1>
                                <p className="text-slate-500 mt-2">안내 문자가 발송될 예정입니다.</p>
                            </div>

                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                        <span className="text-slate-400 text-sm">예약 상품</span>
                                        <span className="font-bold text-slate-900">{selectedPackage?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                        <span className="text-slate-400 text-sm">진행 일시</span>
                                        <span className="font-bold text-slate-900">2026년 2월 10일 {selectedSlot?.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                        <span className="text-slate-400 text-sm">추천 코드 적용</span>
                                        <span className="font-bold text-blue-600">PROMO_24 (활성)</span>
                                    </div>

                                    <div className="pt-6">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-slate-900 font-bold">최종 결제 금액</span>
                                            <div className="text-right">
                                                {selectedSlot && CALCULATE_PRICE(selectedSlot.basePrice, selectedSlot.occupancy).discountRate > 0 && (
                                                    <div className="text-xs text-blue-600 font-bold mb-1">다이내믹 프라이싱 -30% 적용</div>
                                                )}
                                                <span className="text-3xl font-black text-blue-600">
                                                    {selectedSlot ? CALCULATE_PRICE(selectedSlot.basePrice, selectedSlot.occupancy).finalPrice.toLocaleString() : 0}원
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                                    <h4 className="text-xs font-bold text-slate-700">주요 주의사항</h4>
                                    <ul className="text-[10px] text-slate-500 space-y-1">
                                        <li>• 검진 전날 오후 9시 이후부터 반드시 금식하세요.</li>
                                        <li>• 신분증을 지참하여 방문해 주세요.</li>
                                        <li>• 예약 변경 및 취소는 검진 3일 전까지 가능합니다.</li>
                                    </ul>
                                </div>

                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold"
                                >
                                    홈으로 이동
                                </button>
                            </div>

                            <div className="text-center">
                                <button className="text-slate-400 text-sm underline underline-offset-4">예약 상세 내역 PDF 다운로드</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Tabs Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 px-4 z-20">
                <div className="flex flex-col items-center gap-1 text-blue-600">
                    <Calendar size={20} />
                    <span className="text-[10px] font-bold">건강검진</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400">
                    <User size={20} />
                    <span className="text-[10px] font-medium">내 정보</span>
                </div>
                <div
                    onClick={() => window.location.href = '/admin'}
                    className="flex flex-col items-center gap-1 text-slate-400 cursor-pointer"
                >
                    <BarChart3 size={20} />
                    <span className="text-[10px] font-medium">관리자(Demo)</span>
                </div>
            </div>
        </div>
    );
}
