const createClient = require('next-sanity').createClient;

const { dataset, projectId, token } = require('../env');

const client = createClient({
  projectId: 'vzs4gtg1',
  dataset: 'production',
  apiVersion: '2021-08-31',
  useCdn: false,
  token: "skUgJ9idgvUZ8KIteWhuD6ZO4kgizSMdfM3zWrKfCMIc2RdpjssYeP2jOyWHrhFenS31nX2jmAn9LhdOohT5v9wli1tDM125cy1gM1EnfonK0ANFAbmvCSnHAMbMPlX0535bpf0EJuV2PJR3uT3fj8NDNNNTkCFrAfVHMxblUavkeeOV98h3"
});

async function fetchPosts() {
  const query = '*[_type == "post"]{_id, slug, ...}';
  return client.fetch(query);
}

async function deletePost(id) {
  return client.delete(id);
}

async function mergePosts(posts) {
  // Implement your merge logic here
  // Example: Keep the first post and delete the rest
  for (let i = 1; i < posts.length; i++) {
    await deletePost(posts[i]._id);
  }
}

async function deDuplicatePosts() {
  const posts = await fetchPosts();
  const slugMap = {};

  // Group posts by slug
  posts.forEach(post => {
    const slug = post.slug.current;
    if (!slugMap[slug]) {
      slugMap[slug] = [];
    }
    slugMap[slug].push(post);
  });

  // Process duplicates
  for (const slug in slugMap) {
    if (slugMap[slug].length > 1) {
      await mergePosts(slugMap[slug]);
    }
  }

  console.log('De-duplication complete');
}

deDuplicatePosts().catch(err => {
  console.error(err);
});
