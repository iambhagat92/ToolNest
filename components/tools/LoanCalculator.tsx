'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'

export default function LoanCalculator() {
    const [principal, setPrincipal] = useState(100000)
    const [annualRate, setAnnualRate] = useState(8.5)
    const [years, setYears] = useState(20)

    const monthlyRate = annualRate / 12 / 100
    const months = years * 12
    const emi = monthlyRate > 0
        ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
        : principal / months

    const totalPayment = emi * months
    const totalInterest = totalPayment - principal

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const generateAmortization = () => {
        const schedule: Array<{ month: number; emi: number; principal: number; interest: number; balance: number }> = []
        let balance = principal

        for (let month = 1; month <= months; month++) {
            const interestPayment = balance * monthlyRate
            const principalPayment = emi - interestPayment
            balance = balance - principalPayment

            if (month <= 12 || month % 12 === 0 || month === months) {
                schedule.push({
                    month,
                    emi: emi,
                    principal: principalPayment,
                    interest: interestPayment,
                    balance: Math.max(0, balance),
                })
            }
        }

        return schedule
    }

    const amortization = generateAmortization()

    return (
        <div className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Loan Amount (₹)
                    </label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                        type="range"
                        min="10000"
                        max="10000000"
                        step="10000"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="w-full mt-2 accent-primary-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Interest Rate (% p.a.)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.1"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(Number(e.target.value))}
                        className="w-full mt-2 accent-primary-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Loan Tenure (Years)
                    </label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full mt-2 accent-primary-600"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Monthly EMI
                    </div>
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {formatCurrency(emi)}
                    </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Total Payment
                    </div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(totalPayment)}
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Total Interest
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {formatCurrency(totalInterest)}
                    </div>
                </div>
            </div>

            {/* Payment Breakdown Chart */}
            <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Payment Breakdown
                </h3>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"
                        style={{ width: `${(principal / totalPayment) * 100}%` }} />
                    <div className="flex-1 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg"
                        style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
                </div>
                <div className="flex justify-around text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary-500 rounded" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Principal: {formatCurrency(principal)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Interest: {formatCurrency(totalInterest)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Amortization Schedule */}
            <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Amortization Schedule (Yearly Summary)
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                                <th className="text-left py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">Month</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">EMI</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">Principal</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">Interest</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {amortization.map((row) => (
                                <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-2 px-2 text-gray-900 dark:text-gray-100">{row.month}</td>
                                    <td className="text-right py-2 px-2 text-gray-900 dark:text-gray-100">
                                        {formatCurrency(row.emi)}
                                    </td>
                                    <td className="text-right py-2 px-2 text-primary-600 dark:text-primary-400">
                                        {formatCurrency(row.principal)}
                                    </td>
                                    <td className="text-right py-2 px-2 text-orange-600 dark:text-orange-400">
                                        {formatCurrency(row.interest)}
                                    </td>
                                    <td className="text-right py-2 px-2 text-gray-600 dark:text-gray-400">
                                        {formatCurrency(row.balance)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Expert Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            Financial Planning Tips
                        </h3>
                        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                            <li>• Keep EMI below 40% of your monthly income for comfortable repayment</li>
                            <li>• Shorter tenure means higher EMI but lower total interest</li>
                            <li>• Consider making prepayments to reduce interest burden</li>
                            <li>• Compare offers from multiple lenders for the best rates</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
