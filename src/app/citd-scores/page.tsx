'use client';

import { useEffect, useRef, useState } from 'react';

type ScoreRow = {
	stt: unknown;
	code: unknown;
	name: unknown;
	credits: unknown;
	avg: unknown;
};

const REFRESH_INTERVAL_SECONDS = 60; // giây

export default function CitdScoresPage() {
	const [scores, setScores] = useState<ScoreRow[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [timestamp, setTimestamp] = useState<string>('');
	const [countdown, setCountdown] = useState<number>(REFRESH_INTERVAL_SECONDS);
	const countdownRef = useRef<number>(REFRESH_INTERVAL_SECONDS);

	async function loadScores() {
		try {
			setError(null);
			const res = await fetch('/api/scores', { cache: 'no-store' });
			const json = await res.json();
			if (!json.ok) throw new Error(json.error);
			setScores(json.data as ScoreRow[]);
			setTimestamp(new Date().toLocaleTimeString());
			countdownRef.current = REFRESH_INTERVAL_SECONDS;
			setCountdown(REFRESH_INTERVAL_SECONDS);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error';
			setError('❌ Lỗi tải dữ liệu: ' + message);
		}
	}

	useEffect(() => {
		loadScores();
		const timer = setInterval(() => {
			setCountdown((prev) => {
				const next = prev - 1;
				if (next <= 0) {
					void loadScores();
					return REFRESH_INTERVAL_SECONDS;
				}
				return next;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const counterClassName = countdown <= 10 ? 'danger' : countdown <= 20 ? 'warning' : '';

	return (
		<div style={{ padding: 20, background: '#f5f6fa', minHeight: '100vh' }}>
			<h1 style={{ color: '#2f3640', fontFamily: 'Segoe UI, sans-serif' }}>
				Bảng điểm sinh viên CITD
			</h1>
			<div id="content">
				{error ? (
					<p>{error}</p>
				) : scores === null ? (
					<p>Đang tải dữ liệu...</p>
				) : (
					<div className="table-wrapper">
						<table>
							<thead>
								<tr>
									<th>#</th>
									<th>Mã HP</th>
									<th>Tên học phần</th>
									<th>Tín chỉ</th>
									<th>Điểm TB</th>
								</tr>
							</thead>
							<tbody>
								{scores.map((r, idx) => (
									<tr key={idx}>
										<td>{String(r.stt ?? '')}</td>
										<td>{String(r.code ?? '')}</td>
										<td>{String(r.name ?? '')}</td>
										<td>{String(r.credits ?? '')}</td>
										<td>{String(r.avg ?? '')}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			{timestamp && <div className="timestamp">Cập nhật lúc: {timestamp}</div>}
			<div id="counter" className={counterClassName}>
				Tự động cập nhật sau: {countdown}s
			</div>

			<style jsx>{`
				.table-wrapper {
					background: #ffffff;
					border-radius: 8px;
					overflow: hidden;
				}

				table {
					border-collapse: collapse;
					width: 100%;
					background: white;
				}

				th,
				td {
					border-bottom: 1px solid #ddd;
					padding: 8px 12px;
					text-align: left;
				}

				tr:hover {
					background: #f1f2f6;
				}
				th {
					background: #718093;
					color: white;
				}

				.timestamp,
				#counter {
					margin-top: 8px;
					font-size: 0.9em;
					color: #555;
				}

				#counter.warning {
					color: #e67e22;
				}
				#counter.danger {
					color: #e74c3c;
					font-weight: bold;
				}
			`}</style>
		</div>
	);
}
