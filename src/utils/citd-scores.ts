export interface CitdScoreRow {
	stt: unknown;
	code: unknown;
	name: unknown;
	credits: unknown;
	avg: unknown;
}

type CitdOverrides = {
	cookie?: string;
	csrfToken?: string;
};

const getConfig = (overrides?: CitdOverrides) => {
	const url = process.env.CITD_SCORES_URL;
	const cookie = overrides?.cookie ?? process.env.CITD_COOKIE;
	const csrfToken = overrides?.csrfToken ?? process.env.CITD_RISE_CSRF_TOKEN;

	if (!url || !cookie || !csrfToken) {
		throw new Error(
			'Missing CITD configs. Please set CITD_SCORES_URL, CITD_COOKIE, CITD_RISE_CSRF_TOKEN'
		);
	}

	return { url, cookie, csrfToken };
};

export async function fetchScores(overrides?: CitdOverrides): Promise<CitdScoreRow[]> {
	const { url, cookie, csrfToken } = getConfig(overrides);

	const body = new URLSearchParams({
		rise_csrf_token: csrfToken,
		order_by: '',
		order_dir: '',
		search_by: '',
		server_side: '0',
		datatable: 'true',
	}).toString();

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
			'Cookie': cookie,
		},
		body,
		// Avoid Next.js caching for dynamic remote fetch
		cache: 'no-store',
	});

	const text = await res.text();

	// Upstream returns text-encoded JSON; parse defensively
	const json = JSON.parse(text) as { data?: unknown[] };

	const rows = Array.isArray(json.data) ? json.data : [];

	const result: CitdScoreRow[] = rows.map((r) => {
		if (!Array.isArray(r))
			return {
				stt: r as unknown,
				code: undefined,
				name: undefined,
				credits: undefined,
				avg: undefined,
			};
		const [stt, code, name, credits, , , , , avg] = r as unknown[];
		return { stt, code, name, credits, avg };
	});
	console.log(`✅ Fetched ${result.length} records`);
	return result;
}

export function buildScoresHtmlTable(scores: CitdScoreRow[]): string {
	const rows = scores
		.map(
			(r) =>
				`<tr><td>${String(r.stt ?? '')}</td><td>${String(r.code ?? '')}</td><td>${String(r.name ?? '')}</td><td>${String(r.credits ?? '')}</td><td>${String(r.avg ?? '')}</td></tr>`
		)
		.join('');

	return `
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
  <tbody>${rows}</tbody>
 </table>`;
}
