-- USERS
SELECT 'USERS TABLE' as "=== USERS ===";
SELECT id, email, name, role FROM users ORDER BY role, name;

-- OPPORTUNITIES  
SELECT '' as "";
SELECT 'OPPORTUNITIES TABLE' as "=== OPPORTUNITIES ===";
SELECT id, title, capacity, status FROM opportunities ORDER BY title;

-- APPLICATIONS
SELECT '' as "";
SELECT 'APPLICATIONS TABLE' as "=== APPLICATIONS ===";
SELECT a.id, u.name as "user", o.title as "opportunity", a.status, a."appliedAt" FROM applications a JOIN users u ON a."userId" = u.id JOIN opportunities o ON a."opportunityId" = o.id ORDER BY a."appliedAt" DESC;

-- ODEJ ORGANIZATIONS
SELECT '' as "";
SELECT 'ODEJ ORGANIZATIONS TABLE' as "=== ODEJ ORGANIZATIONS ===";
SELECT id, "contactEmail", "contactPhone", description FROM odej ORDER BY "contactEmail";

-- WILAYAS
SELECT '' as "";
SELECT 'WILAYAS TABLE' as "=== WILAYAS ===";
SELECT id, name, code FROM wilayas ORDER BY name;

-- CATEGORIES
SELECT '' as "";
SELECT 'CATEGORIES TABLE' as "=== CATEGORIES ===";
SELECT id, name, color FROM categories ORDER BY name;
