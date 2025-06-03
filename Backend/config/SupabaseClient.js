import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

<<<<<<< HEAD
export default supabase;
=======
export default supabase;
>>>>>>> 819afd4e714f5722ea5d3ed309a1f984d3fff009
