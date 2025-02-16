import { uploadStorage } from '@/utils/storage/storage';
import { supabase } from '@/utils/supabase/server';
import { useState } from 'react';

export const useStorage = () => {
    const [ path, setPathName ] = useState<string | undefined>();
    const handleUploadStorage = async (folder: FileList | null) => {
        if (!folder || !folder.length) return;
        const { path } = await uploadStorage({
            folder,
            bucketName: 'pictures',
        });
        const { data } = supabase.storage.from('pictures').getPublicUrl(path)
        if (path) setPathName(data.publicUrl);
    };

    return { path, handleUploadStorage };
}