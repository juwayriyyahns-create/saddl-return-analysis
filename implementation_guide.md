# SADDL — Returns Dashboard Implementation Guide

## Project context
- Framework: React (create-react-app)
- Database: Supabase (PostgreSQL)
- Installed packages: `@supabase/supabase-js`, `recharts`, `lucide-react`, `tailwindcss`
- Do NOT use any package not listed above.
- Do NOT use localStorage or sessionStorage.
- Use functional components and React hooks only (no class components).

## Data source
- The app queries a Supabase view called: `sandbox_finance.dashboard_returns`
- The Supabase client is exported from: `src/supabaseClient.js` as `{ supabase }`

## Schema of dashboard_returns (key columns only)
- `id` UUID
- `return_date` TIMESTAMP WITH TIME ZONE
- `asin` TEXT
- `msku` TEXT
- `title` TEXT
- `quantity` INTEGER
- `reason_formatted` TEXT
- `disposition` TEXT
- `country` TEXT -- values: 'UAE' or 'KSA'
- `true_return_cost` NUMERIC -- total financial cost of this return (positive number = money lost)
- `mapped_category` TEXT
- `customer_comments` TEXT

## Sample data row (real shape from Supabase)
```json
{
  "id": "a1b2c3d4-...",
  "return_date": "2025-03-15T09:22:00+00:00",
  "asin": "B0ABC12345",
  "msku": "OS-WHEY-CHOC-1KG",
  "title": "OneShot Whey Protein Chocolate 1kg",
  "quantity": 1,
  "reason_formatted": "Defective Item",
  "disposition": "DAMAGED",
  "country": "UAE",
  "true_return_cost": 126.00,
  "mapped_category": "Protein",
  "customer_comments": "Arrived broken"
}
```
