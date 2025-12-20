// data.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ncdabrjqxlqyrhljppvt.supabase.co';
const supabaseKey = 'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz';
const supabase = createClient(supabaseUrl, supabaseKey);

export  async function getMenuItems() {
  const { data, error } = await supabase.from('menu')
  .select('*');
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}
