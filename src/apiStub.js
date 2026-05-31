// apiStub.js - dummy implementations for removed services
export const registerUser = async (email, password, fullName) => {
  console.log('registerUser stub called with', { email, password, fullName });
  // Simulate a successful registration
  return { user: { uid: 'stub-uid', email, fullName } };
};

export const loginUser = async (email, password) => {
  console.log('loginUser stub called with', { email, password });
  // Simulate successful login
  return { user: { uid: 'stub-uid', email } };
};

export const supabase = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null, count: 0 }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  })
};

export const db = {}; // placeholder for Firestore db if needed
