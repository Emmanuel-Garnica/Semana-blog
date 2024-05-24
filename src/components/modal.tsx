import { PostComment } from "../models/post.model"

interface ModalProps {
  comments: PostComment[]; 
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({comments, isOpen, onClose}: ModalProps) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 grid place-content-center w-full h-full bg-black bg-opacity-50">
      <section className="relative bg-neutral-600 text-white rounded-2xl px-6 py-8 w-screen max-w-xl">
        <button
          className="absolute top-4 right-4"
          onClick={onClose}>
          X
        </button>
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center flex-wrap border-b border-b-white">
            {comment.owner && (
              <div className='font-sans font-normal text-base flex items-center gap-2 py-4 w-full lg:w-1/2'>
                <div className='w-6 h-6 rounded-full overflow-hidden'>
                  <img src={comment.owner.picture} className='w-full h-full object-cover' />
                </div>
                {comment.owner.firstName}
                <span className="text-xs italic">
                  {comment.publishDate}
                </span>
              </div>
            )}
            <p className="">
              {comment.message}
            </p>
          </div>
        )) }
      </section>
    </div>
  )
}