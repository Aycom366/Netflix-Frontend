import "./watch.scss";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import PageWrapper from "../../utils/PageWrapper";

const Watch = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    let abortController = new AbortController();

    async function getMovie() {
      try {
        let { data } = await instance.get(`api/movie/${id}`, {
          signal: abortController.signal,
        });
        if (!abortController.signal.aborted) {
          setVideoUrl(data.data[0].video);
        }
      } catch (err: any) {
        console.log(err);
      }
    }

    if (id) {
      getMovie();
    }

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <PageWrapper>
      <section className="watch">
        <div onClick={() => navigate(-1)} className="back">
          <BiArrowBack />
          Home
        </div>
        <video src={videoUrl} autoPlay controls className="video" />
      </section>
    </PageWrapper>
  );
};

export default Watch;
