-- Find the earliest date that a user joined
SELECT 
    DATE_FORMAT(created_at, "%M %D %Y") AS earliest_date
FROM users
    ORDER BY created_at
    LIMIT 1;
    
-- Find the email of the earliest user
SELECT 
    email,
    created_at
FROM users
    ORDER BY created_at
    LIMIT 1;

-- Count number of users who joined in each month
SELECT 
    MONTHNAME(created_at) AS month,
    COUNT(*) AS count
FROM users
GROUP BY month
ORDER BY count DESC;

-- Count the number of users with yahoo emails
SELECT 
    COUNT(*) AS yahoo_users
FROM users
    WHERE email LIKE "%yahoo.com";
    
-- Calculate the total # of users for each email host
SELECT CASE 
     WHEN email LIKE '%@yahoo.com' THEN 'yahoo' 
     WHEN email LIKE '%@gmail.com' THEN 'gmail' 
     WHEN email LIKE '%@hotmail.com' THEN 'hotmail' 
     ELSE 'other' 
   END      AS provider, 
   Count(*) AS total_users 
FROM   users 
GROUP  BY provider 
ORDER  BY total_users DESC; 