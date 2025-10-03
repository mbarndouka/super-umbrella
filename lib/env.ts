// Environment variable validation
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'JWT_SECRET',
] as const;

export function validateEnvironment(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Validate Supabase URL format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL (must start with https://)');
  }

  // Validate JWT secret strength
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret && jwtSecret.length < 32) {
    console.warn(
      'Warning: JWT_SECRET should be at least 32 characters long for security'
    );
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}

// Safe environment variable access with defaults
export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development',
  },
} as const;

// Validate on module load
if (typeof window === 'undefined') {
  // Only run on server
  const validation = validateEnvironment();
  if (!validation.isValid) {
    console.error(
      '❌ Missing required environment variables:',
      validation.missing
    );
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Missing required environment variables: ${validation.missing.join(', ')}`
      );
    }
  } else {
    console.log('✅ Environment variables validated successfully');
  }
}
