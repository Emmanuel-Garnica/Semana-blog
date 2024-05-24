import { useState, useEffect } from 'react';
import { apiInstance } from './api';
import { BentoGrid, BentoGridItem } from './components/bento-grid';

const App = () => {
  const [postsData, setPostsData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostsData = async () => {
      try {
        const response = await apiInstance.get('post');
        console.log(response.data.data)
        setPostsData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPostsData();
  }, []);

  useEffect(() => {
    const getTagsData = async () => {
      try {
        const response = await apiInstance.get('tag');
        console.log(response.data.data)
        const filteredResponse = response.data.data.filter(tag => tag && tag.trim().length > 0)
        
        setTagsData(filteredResponse);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getTagsData();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className='flex flex-col items-center px-4 py-12'>
      <h1>Bienvenido al nuevo Blog de Semana</h1>
      <section className='flex justify-center gap-2 mx-auto my-8'>
          {tagsData.slice(0, 10).map((tag, i) => (
            <button key={i}>
              {tag}
            </button>
          ))}
        </section>
      <h2 className='text-[32px] my-8'>
        Posts
      </h2>
      <BentoGrid>
        {postsData.map((post, i) => (
          <BentoGridItem
            key={post.id}
            title={post.text}
            header={post.image}
            tags={post.tags}
            owner={{
              name: `${post.owner.firstName} ${post.owner.lastName}`,
              photo: post.owner.picture,
            }}
            className={ i === 3 | i === 6 ? 'md:col-span-2' : '' }
          />
        ))}
      </BentoGrid>
      
    </main>
  );
};

export default App;