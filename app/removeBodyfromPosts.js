const createClient = require('next-sanity').createClient;

const client = createClient({
    projectId: 'vzs4gtg1',
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: false,
    token: "skUgJ9idgvUZ8KIteWhuD6ZO4kgizSMdfM3zWrKfCMIc2RdpjssYeP2jOyWHrhFenS31nX2jmAn9LhdOohT5v9wli1tDM125cy1gM1EnfonK0ANFAbmvCSnHAMbMPlX0535bpf0EJuV2PJR3uT3fj8NDNNNTkCFrAfVHMxblUavkeeOV98h3"
  });

  
  async function fetchPosts() {
    const query = '*[_type == "post"]{_id, body}';
    return client.fetch(query);
  }
  
  async function updatePost(id, updates) {
    console.log(`Updating post ${id} with updates:`, updates);
    return client
      .patch(id)
      .set(updates)
      .commit();
  }
  
  async function removeBodyFromPosts() {
    const posts = await fetchPosts();
    console.log(`Fetched ${posts.length} posts`);
  
    for (const post of posts) {
      if (post.body) {
        // Remove the 'body' property by setting it to null
        await updatePost(post._id, { body: null });
        console.log(`Removed body from post ${post._id}`);
      } else {
        console.log(`No body property to remove for post ${post._id}`);
      }
    }
  
    console.log('Body removal complete');
  }
  
  removeBodyFromPosts().catch(err => {
    console.error('Error removing body from posts:', err);
  });
  