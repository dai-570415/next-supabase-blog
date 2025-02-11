import { supabase } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

export const useAuthUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    return { user };
};
