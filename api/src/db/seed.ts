import { randomBytes, randomUUID } from 'node:crypto';

import { db } from './index';
import { webhooks } from './schema/webhooks';

type StrapiWebhook = {
    name: string;
    url: string;
    pathname: string;
    method: string;
    ip: string;
    statusCode: number;
    contentType: string;
    headers: Record<string, string>;
    queryParams?: Record<string, string> | null;
    body: string;
};

const now = new Date();

const createStrapiPayload = (
    event: string,
    model: string,
    entry: Record<string, unknown>,
    meta: Record<string, unknown> = {},
) =>
    JSON.stringify(
        {
            id: randomUUID(),
            event,
            createdAt: now.toISOString(),
            model,
            ...meta,
            entry,
        },
        null,
        2,
    );

const byteLength = (payload: string) => Buffer.byteLength(payload, 'utf8');

const defaultHeaders = (event: string): Record<string, string> => ({
    'content-type': 'application/json',
    'user-agent': 'Strapi-Hookshot/5.0',
    'x-strapi-event': event,
    'x-strapi-signature': `sha256=${randomBytes(32).toString('hex')}`,
});

const strapiWebhooks: StrapiWebhook[] = [
    {
        name: 'Strapi Article Created',
        url: 'https://cms.example.com/content-manager/collection-types/api::article.article',
        pathname: '/content-manager/collection-types/api::article.article',
        method: 'POST',
        ip: '10.100.0.5',
        statusCode: 201,
        contentType: 'application/json',
        headers: defaultHeaders('entry.create'),
        body: createStrapiPayload('entry.create', 'api::article.article', {
            id: 101,
            title: 'Strapi getting started',
            slug: 'strapi-getting-started',
            category: 'guides',
            publishedAt: null,
        }),
    },
    {
        name: 'Strapi Article Updated',
        url: 'https://cms.example.com/content-manager/collection-types/api::article.article/101',
        pathname: '/content-manager/collection-types/api::article.article/101',
        method: 'PUT',
        ip: '10.100.0.6',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('entry.update'),
        body: createStrapiPayload('entry.update', 'api::article.article', {
            id: 101,
            title: 'Strapi getting started (updated)',
            slug: 'strapi-getting-started',
            category: 'guides',
            publishedAt: null,
        }),
    },
    {
        name: 'Strapi Article Published',
        url: 'https://cms.example.com/content-manager/collection-types/api::article.article/101/actions/publish',
        pathname: '/content-manager/collection-types/api::article.article/101/actions/publish',
        method: 'POST',
        ip: '10.100.0.7',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('entry.publish'),
        body: createStrapiPayload(
            'entry.publish',
            'api::article.article',
            {
                id: 101,
                title: 'Strapi getting started (updated)',
                slug: 'strapi-getting-started',
                category: 'guides',
                publishedAt: now.toISOString(),
            },
            { environment: 'production' },
        ),
    },
    {
        name: 'Strapi Article Unpublished',
        url: 'https://cms.example.com/content-manager/collection-types/api::article.article/101/actions/unpublish',
        pathname: '/content-manager/collection-types/api::article.article/101/actions/unpublish',
        method: 'POST',
        ip: '10.100.0.8',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('entry.unpublish'),
        body: createStrapiPayload(
            'entry.unpublish',
            'api::article.article',
            {
                id: 101,
                title: 'Strapi getting started (updated)',
                slug: 'strapi-getting-started',
                category: 'guides',
                publishedAt: null,
            },
            { environment: 'production' },
        ),
    },
    {
        name: 'Strapi Article Deleted',
        url: 'https://cms.example.com/content-manager/collection-types/api::article.article/101',
        pathname: '/content-manager/collection-types/api::article.article/101',
        method: 'DELETE',
        ip: '10.100.0.9',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('entry.delete'),
        body: createStrapiPayload('entry.delete', 'api::article.article', {
            id: 101,
        }),
    },
    {
        name: 'Strapi Media Uploaded',
        url: 'https://cms.example.com/content-manager/upload',
        pathname: '/content-manager/upload',
        method: 'POST',
        ip: '10.100.0.10',
        statusCode: 201,
        contentType: 'application/json',
        headers: defaultHeaders('media.create'),
        body: createStrapiPayload('media.create', 'plugin::upload.file', {
            id: 501,
            name: 'hero.jpg',
            mime: 'image/jpeg',
            size: 248.3,
            url: '/uploads/hero.jpg',
        }),
    },
    {
        name: 'Strapi Media Updated',
        url: 'https://cms.example.com/content-manager/upload/files/501',
        pathname: '/content-manager/upload/files/501',
        method: 'PUT',
        ip: '10.100.0.11',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('media.update'),
        body: createStrapiPayload('media.update', 'plugin::upload.file', {
            id: 501,
            name: 'hero-banner.jpg',
            alternativeText: 'Homepage hero banner',
            url: '/uploads/hero-banner.jpg',
        }),
    },
    {
        name: 'Strapi Media Deleted',
        url: 'https://cms.example.com/content-manager/upload/files/501',
        pathname: '/content-manager/upload/files/501',
        method: 'DELETE',
        ip: '10.100.0.12',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('media.delete'),
        body: createStrapiPayload('media.delete', 'plugin::upload.file', {
            id: 501,
            name: 'hero-banner.jpg',
        }),
    },
    {
        name: 'Strapi Review Workflow Transition',
        url: 'https://cms.example.com/content-manager/review-workflows/workflows/1/stages/2',
        pathname: '/content-manager/review-workflows/workflows/1/stages/2',
        method: 'POST',
        ip: '10.100.0.13',
        statusCode: 200,
        contentType: 'application/json',
        headers: defaultHeaders('review-workflow.stage.transition'),
        body: createStrapiPayload(
            'review-workflow.stage.transition',
            'api::article.article',
            {
                id: 101,
                title: 'Strapi getting started (updated)',
                workflowStage: 'Ready for QA',
            },
            { workflowId: 1, fromStageId: 1, toStageId: 2 },
        ),
    },
];

async function seed() {
    console.log('🌱 Starting seed...');

    try {
        await db.delete(webhooks);

        const seedPayload = strapiWebhooks.map((hook) => ({
            ...hook,
            queryParams: hook.queryParams ?? null,
            contentLength: byteLength(hook.body),
        }));

        const result = await db
            .insert(webhooks)
            .values(seedPayload)
            .returning({ id: webhooks.id });

        console.log(`✅ Successfully seeded ${result.length} webhooks`);
        console.log('📋 Webhook IDs:', result.map((r) => r.id).join(', '));
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

