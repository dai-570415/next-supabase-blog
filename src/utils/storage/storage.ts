import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/utils/supabase/server';

type UploadStorage = {
    folder: FileList;
    bucketName: string;
};

type UploadPathname = {
    path: string;
};

export const uploadStorage = async ({ folder, bucketName }: UploadStorage): Promise<UploadPathname> => {
    const file = folder[0]; // 1ファイルアップロード
    const pathName = `img/${uuidv4()}`; // パス名の設定
    const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(pathName, file, {
        cacheControl: '3600',
        upsert: false,
    });

    if (error) throw error;

    return {
        path: data?.path ?? null,
    };
};


