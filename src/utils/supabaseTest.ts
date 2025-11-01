import { supabase } from '@/integrations/supabase/client';

/**
 * Test Supabase connection
 * Call this in browser console: window.testSupabase()
 */
export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test 1: Basic connection
    console.log('1. Testing basic connection...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('tracks')
      .select('id')
      .limit(1);
    
    if (healthError) {
      console.error('❌ Connection failed:', healthError.message);
      return { success: false, error: healthError.message };
    }
    
    console.log('✅ Basic connection successful');
    
    // Test 2: Check if common tables exist
    const tables = ['tracks', 'certifications', 'job_companies', 'assessment_questions'];
    console.log('\n2. Checking table access...');
    
    for (const table of tables) {
      try {
        const { error } = await (supabase as any).from(table).select('id').limit(1);
        if (error) {
          console.warn(`⚠️  Table "${table}": ${error.message}`);
        } else {
          console.log(`✅ Table "${table}": Accessible`);
        }
      } catch (e) {
        console.warn(`⚠️  Table "${table}": ${(e as Error).message}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).testSupabase = testSupabaseConnection;
}

