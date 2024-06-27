const fs = require('fs');
const readline = require('readline');
const createClient = require('next-sanity').createClient;

const client = createClient({
    projectId: 'vzs4gtg1',
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: false,
    token: "skUgJ9idgvUZ8KIteWhuD6ZO4kgizSMdfM3zWrKfCMIc2RdpjssYeP2jOyWHrhFenS31nX2jmAn9LhdOohT5v9wli1tDM125cy1gM1EnfonK0ANFAbmvCSnHAMbMPlX0535bpf0EJuV2PJR3uT3fj8NDNNNTkCFrAfVHMxblUavkeeOV98h3"
  });

// Function to update documents
async function updateDocument(doc) {
  try {
    // Fetch the existing document by WKT field to get the correct _id
    const existingDocs = await client.fetch('*[_type == "post" && WKT == $wkt]', { wkt: doc.WKT });
    if (existingDocs.length === 0) {
      console.log(`No document found with WKT: ${doc.WKT}`);
      return;
    }

    const existingDoc = existingDocs[0];

    await client
      .patch(existingDoc._id) // Document ID to patch
      .set({ category: doc.category }) // Field to update
      .commit(); // Commit the patch
    console.log(`Document ${existingDoc._id} updated`);
  } catch (err) {
    console.error(`Failed to update document with WKT ${doc.WKT}:`, err.message);
  }
}

// Read NDJSON file and process each line
const fileStream = fs.createReadStream('data.ndjson');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', async (line) => {
  const doc = JSON.parse(line);
  await updateDocument(doc);
});

rl.on('close', () => {
  console.log('All documents processed');
});
