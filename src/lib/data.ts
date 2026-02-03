export type Profile = {
    age: number;
    gender: 'male' | 'female';
    familyHistory: string[];
};

export type Package = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    features: string[];
    recommendedFor: string[];
};

export type Slot = {
    id: string;
    date: string;
    time: string;
    occupancy: number; // 0 to 100
    basePrice: number;
};

export const PACKAGES: Package[] = [
    {
        id: 'basic',
        name: '베이직 실속 검진',
        description: '기본적인 건강 상태를 점검하고 싶은 입문자를 위한 실속 패키지',
        basePrice: 250000,
        features: ['기본 혈액 검사', '흉부 X-ray', '복부 초음파', '뇨검사'],
        recommendedFor: ['20-30대', '건강검진 입문자'],
    },
    {
        id: 'cardio',
        name: '심혈관 정밀 패키지',
        description: '고혈압이나 심장 질환 가족력이 있는 분들을 위한 집중 케어',
        basePrice: 450000,
        features: ['심장 초음파', '동맥경화도 검사', '심전도', '경동맥 초음파'],
        recommendedFor: ['고혈압 가족력', '심장질환 우려'],
    },
    {
        id: 'cancer-screening',
        name: '암 예방 프리미엄',
        description: '한국인 5대암을 포함한 전신 건강 상태 정밀 점검',
        basePrice: 850000,
        features: ['위/대장 내시경', '복부 CT', '폐 CT', '종양 표지자 검사'],
        recommendedFor: ['40대 이상', '암 가족력'],
    },
    {
        id: 'stress-care',
        name: '직장인 활력 패키지',
        description: '과도한 업무와 스트레스에 노출된 직장인을 위한 스트레스 및 간 기능 정밀 검사',
        basePrice: 350000,
        features: ['간 기능 정밀', '갑상선 초음파', '자율신경 균형 검사'],
        recommendedFor: ['스트레스', '피로 누적'],
    },
];

export const CALCULATE_PRICE = (basePrice: number, occupancy: number) => {
    // Logic: 가동률이 30% 이하인 슬롯은 자동으로 30% 할인
    const discountRate = occupancy <= 30 ? 0.3 : 0;
    return {
        discountRate,
        finalPrice: Math.floor(basePrice * (1 - discountRate)),
    };
};
