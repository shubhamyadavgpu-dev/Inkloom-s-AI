-- Sample data for Inkloom AI.
-- Run schema.sql first, then run this file.
-- Safe to re-run: records are inserted only when their identifying values do not exist.

USE inkloom_ai;

INSERT INTO submissions (title, category, owner, content, status)
SELECT 'Autumn campaign — landing page', 'Marketing', 'Olivia Chen',
       'Discover a clearer way to manage your digital protection needs.', 'pending'
WHERE NOT EXISTS (
  SELECT 1 FROM submissions WHERE title = 'Autumn campaign — landing page'
);

INSERT INTO submissions (title, category, owner, content, status)
SELECT 'Product update announcement', 'Product', 'Daniel Reed',
       'We are introducing improvements to Smart Protection for a simpler experience.', 'review'
WHERE NOT EXISTS (
  SELECT 1 FROM submissions WHERE title = 'Product update announcement'
);

INSERT INTO submissions (title, category, owner, content, status)
SELECT 'LinkedIn thought leadership post', 'Social', 'Maya Patel',
       'Trust is built through clear communication and responsible product information.', 'approved'
WHERE NOT EXISTS (
  SELECT 1 FROM submissions WHERE title = 'LinkedIn thought leadership post'
);

INSERT INTO submissions (title, category, owner, content, status)
SELECT 'Customer onboarding email', 'Lifecycle', 'Ethan Brooks',
       'Welcome to Smart Protection. Review the available tools to get started.', 'revision'
WHERE NOT EXISTS (
  SELECT 1 FROM submissions WHERE title = 'Customer onboarding email'
);

INSERT INTO brand_rules (name, description, active)
SELECT 'Avoid absolute promises',
       'Avoid: 100% guaranteed. Do not make absolute promises unless supported by approved evidence.', 1
WHERE NOT EXISTS (SELECT 1 FROM brand_rules WHERE name = 'Avoid absolute promises');

INSERT INTO brand_rules (name, description, active)
SELECT 'Professional tone',
       'Use clear, professional and trustworthy language. Avoid slang and exaggerated claims.', 1
WHERE NOT EXISTS (SELECT 1 FROM brand_rules WHERE name = 'Professional tone');

INSERT INTO brand_rules (name, description, active)
SELECT 'Approved product terminology',
       'Use the approved product name "Smart Protection" consistently.', 1
WHERE NOT EXISTS (SELECT 1 FROM brand_rules WHERE name = 'Approved product terminology');
