-- Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  profile_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY IF NOT EXISTS "Users can view their own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY IF NOT EXISTS "Users can update their own profile" 
ON user_profiles FOR UPDATE 
USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY IF NOT EXISTS "Users can insert their own profile" 
ON user_profiles FOR INSERT 
WITH CHECK (auth.uid() = id);
