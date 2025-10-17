'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
	const [cookie, setCookie] = useState<string>('');
	const [csrfToken, setCsrfToken] = useState<string>('');

	const loadScores = useCallback(async () => {
		try {
			setError(null);
			const payload: Record<string, string> = {};
			if (cookie.trim()) payload.cookie = cookie.trim();
			if (csrfToken.trim()) payload.csrfToken = csrfToken.trim();
			const res = await fetch('/api/scores', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				cache: 'no-store',
			});
			const json = await res.json();
			if (!json.success) throw new Error(json.error);
			setScores(json.data as ScoreRow[]);
			setTimestamp(new Date().toLocaleTimeString());
			countdownRef.current = REFRESH_INTERVAL_SECONDS;
			setCountdown(REFRESH_INTERVAL_SECONDS);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Unknown error';
			setError('❌ Lỗi tải dữ liệu: ' + message);
		}
	}, [cookie, csrfToken]);

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
	}, [loadScores]);

	const counterClassName = countdown <= 10 ? 'danger' : countdown <= 20 ? 'warning' : '';

	return (
		<div style={{ padding: 20, background: '#f5f6fa', minHeight: '100vh' }}>
			<h1 style={{ color: '#2f3640', fontFamily: 'Segoe UI, sans-serif' }}>
				Bảng điểm sinh viên CITD
			</h1>
			<div className="controls">
				<div className="field">
					<label htmlFor="cookie">COOKIE</label>
					<input
						id="cookie"
						type="text"
						placeholder="Nhập CITD COOKIE của bạn"
						value={cookie}
						onChange={(e) => setCookie(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="csrf">RISE CSRF TOKEN</label>
					<input
						id="csrf"
						type="text"
						placeholder="Nhập CITD RISE CSRF TOKEN của bạn"
						value={csrfToken}
						onChange={(e) => setCsrfToken(e.target.value)}
					/>
				</div>
				<button onClick={() => void loadScores()}>Tải lại</button>
			</div>
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
				.controls {
					display: flex;
					gap: 12px;
					align-items: flex-end;
					margin: 12px 0 16px;
				}

				.field {
					display: flex;
					flex-direction: column;
					gap: 6px;
				}

				.field label {
					font-size: 0.9em;
					color: #555;
				}

				.field input {
					min-width: 360px;
					padding: 8px 10px;
					border: 1px solid #dcdde1;
					border-radius: 6px;
					outline: none;
				}

				button {
					padding: 8px 12px;
					background: #273c75;
					color: #fff;
					border: none;
					border-radius: 6px;
					cursor: pointer;
				}

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
