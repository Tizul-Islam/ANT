import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { auth } from './config';
import { storeTokens, removeTokens } from '../../utils/auth';

/**
 * Generate a mock JWT token for frontend simulation
 * This should be replaced by your real Node.js backend generating a JWT
 */
const generateMockJWT = (user, role, fullName) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  
  // exp: 24 hours from now
  const exp = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
  
  const payload = btoa(JSON.stringify({
    user_id: user.uid,
    email: user.email,
    name: fullName || user.displayName || 'User',
    role: role,
    exp: exp
  }));

  const signature = btoa('dummy-signature');
  return `${header}.${payload}.${signature}`;
};

export const registerWithFirebase = async (email, password, role, fullName) => {
  try {
    // 1. Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Update user profile with Full Name
    await updateProfile(user, {
      displayName: fullName
    });

    // 3. Send Email Verification
    await sendEmailVerification(user);

    // 4. Sign out immediately so they cannot bypass email verification
    await signOut(auth);
    
    return { requireVerification: true };
  } catch (error) {
    console.error("Firebase Registration Error:", error);
    
    // FALLBACK FOR DEVELOPMENT
    if (error.code === 'auth/invalid-api-key' || error.code === 'auth/configuration-not-found') {
      console.warn("Using Mock Registration because Firebase is not configured properly in the console.");
      return { requireVerification: true };
    }
    
    throw error;
  }
};

export const loginWithFirebase = async (email, password) => {
  try {
    // 1. Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Check if email is verified
    if (!user.emailVerified) {
      await signOut(auth); // force sign out
      throw new Error("Please verify your email before logging in. Check your inbox.");
    }

    // 3. Simulate Backend generating a JWT
    // In a real app, you might fetch the user's role from your backend here.
    const mockRole = 'customer'; // Ideally fetched from DB
    const mockToken = generateMockJWT(user, mockRole, user.displayName);
    
    // 4. Store tokens
    storeTokens({ access: mockToken, refresh: mockToken });
    
    return { user, token: mockToken };
  } catch (error) {
    console.error("Firebase Login Error:", error);
    
    // FALLBACK FOR DEVELOPMENT
    if (error.code === 'auth/invalid-api-key' || error.code === 'auth/configuration-not-found') {
      console.warn("Using Mock Login because Firebase is not configured properly in the console.");
      
      // Since they can't actually verify a mock email, we'll let them log in successfully
      // so they aren't permanently locked out of testing the app UI.
      const mockUser = { uid: 'mock-uid-123', email };
      const mockRole = 'customer'; 
      const mockToken = generateMockJWT(mockUser, mockRole, "Test User");
      storeTokens({ access: mockToken, refresh: mockToken });
      
      return { user: mockUser, token: mockToken };
    }
    
    throw error;
  }
};

export const resendVerificationEmail = async (email, password) => {
  try {
    // We must sign in briefly to get the user object to send verification
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      await signOut(auth);
      throw new Error("Email is already verified. You can log in directly.");
    }

    await sendEmailVerification(user);
    await signOut(auth); // Sign out again
    
    return true;
  } catch (error) {
    console.error("Resend Verification Error:", error);

    // FALLBACK FOR DEVELOPMENT
    if (error.code === 'auth/invalid-api-key' || error.code === 'auth/configuration-not-found') {
      console.warn("Using Mock Resend because Firebase is not configured properly.");
      return true;
    }

    throw error;
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Firebase Logout Error:", error);
  } finally {
    removeTokens();
    window.dispatchEvent(new Event('userStatusChanged'));
  }
};
