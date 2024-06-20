const createClient = require('next-sanity').createClient;

const client = createClient({
    projectId: 'vzs4gtg1',
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: false,
    token: "skUgJ9idgvUZ8KIteWhuD6ZO4kgizSMdfM3zWrKfCMIc2RdpjssYeP2jOyWHrhFenS31nX2jmAn9LhdOohT5v9wli1tDM125cy1gM1EnfonK0ANFAbmvCSnHAMbMPlX0535bpf0EJuV2PJR3uT3fj8NDNNNTkCFrAfVHMxblUavkeeOV98h3"
  });
   
  async function fetchCategoryDocuments() {
    const query = `*[_type == "category"]{_id, title}`;
    return client.fetch(query);
  }
  
  async function fetchPosts() {
    const query = `*[_type == "post" && defined(category)]{
      _id,
      category->{_id, title}
    }`;
    return client.fetch(query);
  }
  
  async function updatePost(id, updates) {
    console.log(`Updating post ${id} with updates:`, updates);
    return client
      .patch(id)
      .set(updates)
      .commit();
  }
  
  async function updateCategories() {
    // Fetch category documents to create a reference mapping
    const categories = await fetchCategoryDocuments();
    const categoryMapping = {
      'shop': 'Loja',
      'foodDrink': 'Restauração',
      'art': 'Arte'
    };
  
    const categoryRefs = {};
    categories.forEach(category => {
      if (categoryMapping[category.title]) {
        categoryRefs[category.title] = category._id;
      }
    });
  
    console.log('Category references:', categoryRefs);
  
    const posts = await fetchPosts();
    console.log(`Fetched ${posts.length} posts with categories`);
  
    for (const post of posts) {
      const currentCategoryTitle = post.category && post.category.title;
      const newCategoryTitle = categoryMapping[currentCategoryTitle];
      const newCategoryRef = categoryRefs[newCategoryTitle];
  
      if (newCategoryRef) {
        await updatePost(post._id, { 'category': { _type: 'reference', _ref: newCategoryRef } });
        console.log(`Updated category for post ${post._id} to ${newCategoryTitle}`);
      } else {
        console.log(`No category update needed for post ${post._id}`);
      }
    }
  
    console.log('Category update complete');
  }
  
  updateCategories().catch(err => {
    console.error('Error updating categories:', err);
  });
  