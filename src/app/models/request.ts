export interface Request {
    amount: number;
    repaymentFrequency: 'weekly' | 'monthly' | 'quarterly' | 'bi-annually' | 'annually';
    period: number;
    startDate: Date;
    interestType: 'FIXED_RATE' | 'REDUCING_BALANCE'
}