import { collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';

export interface ByokKeys {
  geminiKey: string;
  sfuKey1: string;
  sfuKey2?: string;
}

const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const createOrganization = async (
  name: string,
  sfuPreference: string,
  keys: ByokKeys
): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to create an organization.');
  }

  const inviteCode = generateInviteCode();

  // 1. Create Organization
  const orgRef = await addDoc(collection(db, 'organizations'), {
    name,
    inviteCode,
    sfuPreference,
    createdAt: serverTimestamp(),
  });

  // 2. Store Secrets
  const secretsRef = doc(db, 'organizations', orgRef.id, 'secrets', 'api_keys');
  await setDoc(secretsRef, {
    geminiKey: keys.geminiKey,
    sfuKey1: keys.sfuKey1,
    sfuKey2: keys.sfuKey2 || null,
  });

  // 3. Update User Document
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email || '',
    orgId: orgRef.id,
    role: 'main-admin',
    status: 'approved',
  }, { merge: true });

  return inviteCode;
};
