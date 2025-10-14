// mail.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

const SENT_FROM = {
	email: 'ITNotification@360f.com',
	name: 'Charlie Khoa',
};

export async function sendMail(
	subject = 'Báo cáo điểm CITD tự động',
	html = '<h1>Điểm CITD</h1><p>Đây là email tự động gửi từ hệ thống CITD Scores.</p>',
	recipients = ['lcdkhoa1992@gmail.com', 'lcdkhoa@hotmail.com']
): Promise<void> {
	const msg = {
		to: recipients,
		from: SENT_FROM,
		subject,
		html,
		text: html.replace(/<[^>]+>/g, ''),
	};

	try {
		const response = await sgMail.sendMultiple(msg);
		console.log('✅ Mail sent successfully to:', recipients.join(', '));
		console.log('📨 Response:', response[0].statusCode);
	} catch (error: unknown) {
		if (typeof error === 'object' && error !== null && 'response' in error) {
			const res = (error as { response?: { body?: unknown } }).response;
			console.error('❌ Mail send failed:', res?.body ?? error);
		} else {
			console.error('❌ Mail send failed:', error);
		}
	}
}
