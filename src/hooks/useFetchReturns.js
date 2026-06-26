import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useFetchReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all rows from the specified view
        const { data, error: fetchError } = await supabase
          .from('sandbox_finance.dashboard_returns')
          .select('*');

        if (fetchError) {
          throw fetchError;
        }

        setReturns(data || []);
        console.log(`Successfully loaded ${data ? data.length : 0} rows.`);
        
      } catch (err) {
        console.error('Failed to fetch returns data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  return { returns, loading, error };
};
