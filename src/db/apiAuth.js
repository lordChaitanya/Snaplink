import supabase from "./supabase";

export async function login({email, password}) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({name, email, password, profile_pic}) {
  // 1. Create a safe filename with the correct extension
  const fileExt = profile_pic.name.split('.').pop();
  const safeName = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  const fileName = `dp-${safeName}-${Math.random()}.${fileExt}`;

  // 2. Upload file
  const {error: storageError} = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  // 3. Generate the correct public URL using the SDK
  const {data: { publicUrl }} = supabase.storage
    .from("profile_pic")
    .getPublicUrl(fileName);

  // 4. Sign up user with the valid image URL
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: publicUrl,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  
  if (!session.session) return null;

  if (error) throw new Error(error.message);
  
  return session.session?.user;
}

export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}