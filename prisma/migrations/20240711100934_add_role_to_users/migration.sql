-- Add role column to users table
ALTER TABLE "User" 
ADD COLUMN "role" VARCHAR(20) NOT NULL DEFAULT 'user';

-- Update existing users to have 'user' role
UPDATE "User" SET "role" = 'user';

-- Add admin user (replace with actual values in production)
INSERT INTO "User" ("email", "name", "password", "role", "isAdmin") 
VALUES ('admin@example.com', 'Admin User', '$2b$10$...', 'admin', true)
ON CONFLICT ("email") DO NOTHING;

-- Create indexes for faster lookups
CREATE INDEX "User_role_idx" ON "User" ("role");
