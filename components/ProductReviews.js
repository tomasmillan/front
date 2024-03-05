import Input from "@/components/Input";
import WhiteBox from "@/components/WhiteBox";
import StarsRating from "@/components/StarsRating";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  
  useEffect(() => {
    loadReviews();
  }, []);

  function submitReview() {
    const data = { title, description, stars, product: product._id };
    axios.post('/api/reviews', data).then(res => {
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    });
  }

  function loadReviews() {
    setReviewsLoading(true);
    axios.get('/api/reviews?product=' + product._id).then(res => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Comentarios</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 mb-10">
        <div>
          <WhiteBox>
            <h3 className="text-lg font-semibold mt-5">Agrega un comentario</h3>
            <div className="mt-3">
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              placeholder="Titulo"
            />
            <Textarea
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder="Dejanos tu opinion"
            />
            <div className="mt-3">
              <button className="p-2 bg-blue-700 text-white hover:text-black hover:bg-blue-400 rounded-2xl" onClick={submitReview}>Subir comentario</button>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <h3 className="text-lg font-semibold mt-5">Todos los Comentarios</h3>
            {reviewsLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>No hay comentarios :(</p>}
            {reviews.length > 0 && reviews.map((review, index) => (
              <div key={index} className="border-t border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} />
                  <time className="text-sm text-gray-500">{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                </div>
                <h3 className="text-base font-medium">{review.title}</h3>
                <p className="text-sm text-gray-600">{review.description}</p>
              </div>
            ))}
          </WhiteBox>
        </div>
      </div>
    </div>
  );
}
