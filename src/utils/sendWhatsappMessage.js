export async function sendWhatsappMessage(phone, message) {
	try {
		const response = await fetch(
			"https://leanapi.gooadmin.com/api/v1/send/whatsapp/message",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumbers: [phone],
					message: message,
				}),
			}
		);
		return await response.json();
	} catch (error) {
		console.error("Error sending WhatsApp message:", error);
		throw error;
	}
}
