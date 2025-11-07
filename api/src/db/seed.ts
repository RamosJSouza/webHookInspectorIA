import { db } from './index';
import { webhooks } from './schema/webhooks';

async function seed() {
    console.log('🌱 Starting seed...');

    try {
        const webhook1Body = JSON.stringify({
            status: 'completed',
            videoId: 'abc123',
            url: 'https://cdn.example.com/videos/abc123.mp4',
        }, null, 2);
        
        const webhook2Body = JSON.stringify({
            event: 'payment.succeeded',
            data: {
                amount: 10000,
                currency: 'usd',
                customer: 'cus_123456',
            },
        }, null, 2);
        
        const webhook3Body = JSON.stringify({
            notificationId: 'notif_123',
            sent: true,
            timestamp: new Date().toISOString(),
        }, null, 2);
        
        const webhook4Body = JSON.stringify({
            orderId: 'order_789',
            status: 'shipped',
            trackingNumber: 'TRACK123456',
        }, null, 2);
        
        const webhook5Body = 'Hello World!';

        const seedWebhooks = [
            {
                name: 'POST /video/upload/status',
                url: 'https://api.example.com/video/upload/status',
                pathname: '/video/upload/status',
                method: 'POST',
                ip: '127.0.0.1',
                statusCode: 200,
                contentType: 'application/json',
                contentLength: webhook1Body.length,
                queryParams: {
                    videoId: 'abc123',
                    format: 'mp4',
                } as Record<string, string>,
                headers: {
                    'content-type': 'application/json',
                    'user-agent': 'Mozilla/5.0',
                    'accept': 'application/json',
                    'authorization': 'Bearer token123',
                } as Record<string, string>,
                body: webhook1Body,
            },
            {
                name: 'POST /payment/webhook',
                url: 'https://api.example.com/payment/webhook?provider=stripe',
                pathname: '/payment/webhook',
                method: 'POST',
                ip: '192.168.1.100',
                statusCode: 200,
                contentType: 'application/json',
                contentLength: webhook2Body.length,
                queryParams: {
                    provider: 'stripe',
                } as Record<string, string>,
                headers: {
                    'content-type': 'application/json',
                    'user-agent': 'Stripe/1.0',
                    'stripe-signature': 'signature123',
                    'x-forwarded-for': '192.168.1.100',
                } as Record<string, string>,
                body: webhook2Body,
            },
            {
                name: 'GET /user/notification',
                url: 'https://api.example.com/user/notification?userId=123&type=email',
                pathname: '/user/notification',
                method: 'GET',
                ip: '10.0.0.1',
                statusCode: 200,
                contentType: 'application/json',
                contentLength: webhook3Body.length,
                queryParams: {
                    userId: '123',
                    type: 'email',
                } as Record<string, string>,
                headers: {
                    'content-type': 'application/json',
                    'user-agent': 'CustomApp/1.0',
                    'api-key': 'key_abc123',
                } as Record<string, string>,
                body: webhook3Body,
            },
            {
                name: 'POST /order/update',
                url: 'https://api.example.com/order/update',
                pathname: '/order/update',
                method: 'POST',
                ip: '172.16.0.1',
                statusCode: 201,
                contentType: 'application/json',
                contentLength: webhook4Body.length,
                queryParams: null,
                headers: {
                    'content-type': 'application/json',
                    'user-agent': 'ECommerceBot/2.0',
                    'x-api-version': 'v2',
                } as Record<string, string>,
                body: webhook4Body,
            },
            {
                name: 'PUT /webhook/test',
                url: 'https://api.example.com/webhook/test?id=test123',
                pathname: '/webhook/test',
                method: 'PUT',
                ip: '127.0.0.1',
                statusCode: 200,
                contentType: 'text/plain',
                contentLength: webhook5Body.length,
                queryParams: {
                    id: 'test123',
                } as Record<string, string>,
                headers: {
                    'content-type': 'text/plain',
                    'user-agent': 'TestClient/1.0',
                } as Record<string, string>,
                body: webhook5Body,
            },
        ];

        const result = await db.insert(webhooks).values(seedWebhooks).returning({ id: webhooks.id });

        console.log(`✅ Successfully seeded ${result.length} webhooks`);
        console.log('📋 Webhook IDs:', result.map(r => r.id).join(', '));
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed()
    .then(() => {
        console.log('✨ Seed completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    });

