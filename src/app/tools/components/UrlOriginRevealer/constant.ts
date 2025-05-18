import { BugReport, Security, Warning } from '@mui/icons-material';

export const securityServices = [
	{
		name: 'VirusTotal',
		icon: BugReport,
		url: 'https://www.virustotal.com/gui/home/url',
		color: '#4CAF50',
		buttonText: 'Check with VirusTotal',
		tooltip: 'Check this URL for malware, phishing, and other threats using VirusTotal.',
	},
	{
		name: 'Google Safe Browsing',
		icon: Security,
		url: (originalUrl: string) =>
			`https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(originalUrl)}`,
		color: '#2196F3',
		buttonText: 'Check with Google Safe Browsing',
		tooltip: 'Check if this URL is flagged as unsafe by Google Safe Browsing.',
	},
	{
		name: 'ScamAdviser',
		icon: Warning,
		url: (originalUrl: string) =>
			`https://www.scamadviser.com/check-website/${encodeURIComponent(originalUrl)}`,
		color: '#FF9800',
		buttonText: 'Check with ScamAdviser',
		tooltip: 'Check the reputation and trustworthiness of this URL using ScamAdviser.',
	},
];
