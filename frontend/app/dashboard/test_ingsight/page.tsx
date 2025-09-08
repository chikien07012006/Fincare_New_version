"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function TestInsightPage() {
  const searchParams = useSearchParams()
  const [ocrData, setOcrData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dataParam = searchParams.get("data")
    if (dataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(dataParam))
        setOcrData(parsed)
      } catch {
        setOcrData(null)
      }
    }
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    )
  }

  if (!ocrData) {
    return <div>Không có dữ liệu OCR</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kết quả đánh giá hồ sơ vay vốn</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Điểm các tiêu chí tài chính</h2>
        <ul className="list-disc list-inside">
          <li>Khả năng thanh toán ngắn hạn: {ocrData.score_current_ratio}</li>
          <li>Khả năng thanh toán nhanh: {ocrData.score_quick_ratio}</li>
          <li>Tỷ lệ nợ phải trả / Tổng tài sản: {ocrData.score_debt_to_assets}</li>
          <li>ROE: {ocrData.score_roe}</li>
          <li>Tổng điểm: {ocrData.total_score}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Xếp hạng tín dụng</h2>
        <ul className="list-disc list-inside">
          <li>BIDV: {ocrData.classification_BIDV[0]} - {ocrData.classification_BIDV[1]}</li>
          <li>Techcombank: {ocrData.classification_Techcombank[0]} - {ocrData.classification_Techcombank[1]}</li>
          <li>Vietcombank: {ocrData.classification_Vietcombank[0]} - {ocrData.classification_Vietcombank[1]}</li>
          <li>Vietinbank: {ocrData.classification_Vietinbank[0]} - {ocrData.classification_Vietinbank[1]}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Lời khuyên cải thiện hồ sơ</h2>
        {ocrData.advice && ocrData.advice.length > 0 ? (
          <ul className="list-disc list-inside">
            {ocrData.advice.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Không có lời khuyên nào.</p>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Tình trạng các tiêu chí</h2>
        {ocrData.aspects_state && ocrData.aspects_state.length > 0 ? (
          <ul className="list-disc list-inside">
            {ocrData.aspects_state.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Không có lời khuyên nào.</p>
        )}
      </section>
    </div>
  )
}
