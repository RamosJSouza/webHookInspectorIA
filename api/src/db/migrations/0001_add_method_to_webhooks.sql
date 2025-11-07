ALTER TABLE "webhooks"
ADD COLUMN "method" text NOT NULL DEFAULT 'GET';

