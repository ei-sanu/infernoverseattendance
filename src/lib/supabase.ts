import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AttendanceRecord {
  id?: string;
  registration_number: string;
  participant_name: string;
  marked_by_volunteer: string;
  event_name?: string;
  marked_at?: string;
  created_at?: string;
}

export const markAttendance = async (record: AttendanceRecord) => {
  try {
    console.log('Attempting to mark attendance:', record);

    const { data, error } = await supabase
      .from('attendance_records')
      .insert([record])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Attendance marked successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in markAttendance:', error);
    throw error;
  }
};

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('attendance_records')
      .select('count', { count: 'exact', head: true });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
