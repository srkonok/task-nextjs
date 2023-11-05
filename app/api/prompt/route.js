export const GET = async (request) => {
    try {
      const response = await fetch('https://dummyjson.com/posts');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      
      if (result && result.posts && Array.isArray(result.posts)) {
        const mappedData = result.posts.map(item => {
          return item; 
        });
  
        return new Response(JSON.stringify(mappedData), { status: 200 });
      } else {
        return new Response("Data structure is not as expected", { status: 500 });
      }
    } catch (error) {
      return new Response("Failed to fetch data", { status: 500 });
    }
  }
  