import { useState, useEffect } from 'react';
import { apiInstance } from './api';
import { BentoGrid, BentoGridItem } from './components/bento-grid';
import { Post, PostComment } from './models/post.model';
import { Modal } from './components/modal';

const App = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [tagsData, setTagsData] = useState<string[]>([]);
  const [postComments, setpostComments] = useState<PostComment[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getPostsData = async () => {
      try {
        const response = await apiInstance.get('post');
        
        setPostsData(response.data.data);
      } catch (error) {
        setError(error as Error);
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
        const filteredResponse = response.data.data.filter((tag: string) => tag && !tag.trim().startsWith('#') && tag.trim().length > 0)
        
        setTagsData(filteredResponse);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getTagsData();
  }, []);

  if (loading) {
    return <div className='grid place-content-center'>Loading...</div>;
  }

  if (error) {
    return <div className='grid place-content-center'>Error: {error.message}</div>;
  }

  const handleTagClick = async (tag: string) => {
    try {
      const response = await apiInstance.get(`tag/${tag}/post`);
      const responseData = response.data.data;

      if (responseData.length > 0) {
        setPostsData(responseData);
      } else {
        alert(`No se encontraron resultados para el tag: ${tag}`);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (postId: string) => {
    try {
      const response = await apiInstance.get(`post/${postId}/comment`);
      const responseData = response.data.data;

      if (responseData.length > 0) {
        setpostComments(responseData);
        setIsOpen(true)
      } else {
        alert(`No se encontraron resultados para el post: ${postId}`);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false)
  };

  return (
    <main className='flex flex-col items-center px-4 py-12'>
      <h1>Bienvenido al nuevo Blog de Semana</h1>
      <section className='flex justify-center flex-wrap gap-2 mx-auto my-8'>
          <button key={111} onClick={() => handleTagClick('water')}>
            water
          </button>
          {tagsData.slice(0, 10).map((tag, i) => (
            <button key={i} onClick={() => handleTagClick(tag.toString())}>
              {tag}
            </button>
          ))}
        </section>
      <h2 className='text-[32px] my-8'>
        Posts
      </h2>
      {postsData.length &&
        <BentoGrid>
        {postsData.map((post, i) => (
          <BentoGridItem
            key={post?.id}
            title={post?.text}
            header={post?.image}
            tags={post?.tags}
            owner={{
              name: `${post?.owner?.firstName} ${post?.owner?.lastName}`,
              photo: post?.owner?.picture,
            }}
            className={ i === 3 || i === 6 ? 'md:col-span-2' : '' }
            onClick={() => handlePostClick(post.id)}
          />
        ))}
      </BentoGrid>
      }
      <Modal comments={postComments} isOpen={isOpen} onClose={handleCloseModal}/>
    </main>
  );
};

export default App;