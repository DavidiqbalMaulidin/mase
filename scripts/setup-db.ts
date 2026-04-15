#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupDatabase() {
  try {
    console.log('🚀 Setting up MASE database...')

    // Read the SQL migration file
    const sqlPath = path.join(__dirname, 'setup-database.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')

    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', {
      sql_string: sqlContent,
    })

    if (error) {
      console.error('❌ Database setup failed:', error.message)
      process.exit(1)
    }

    console.log('✅ Database setup completed successfully!')
    console.log('📊 Tables created: transactions, categories')
    console.log('🔐 Row Level Security (RLS) enabled')
    console.log('📝 Default categories inserted')
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

setupDatabase()
