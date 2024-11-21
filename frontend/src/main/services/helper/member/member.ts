import {getEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';

export async function getAccessToken() {
  return await getEncryptStorage('token');
}
