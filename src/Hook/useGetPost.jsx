import { useEffect, useState } from "react";
import { view } from "../Services/AxiosConfig";

export default function usePostSearch(startPage, endPage, resetPost) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchPost = async () => {
    // console.log("Fetching  post ", endPage);
    let cancel;
    const apiRsp = await view(
      `/user/get/post/${startPage}/${endPage}/?my_posts=false&post_tag=6e94ecb0-7cc8-4575-8f83-0d6e7912fa88`,
      cancel
    )
      .then((res) => {
        if (resetPost) {
          // console.log(resetPost, "=========== resetPost");
          setPosts([...res.data.posts_list]);
        } else {
          const uniqueIds = [];
          const arr = [...posts, ...res.data.posts_list];
          const unique = arr.filter((element) => {
            const isDuplicate = uniqueIds.includes(element.post_id);

            if (!isDuplicate) {
              uniqueIds.push(element.post_id);

              return true;
            }

            return false;
          });

          // console.log(resetPost, "=========== resetPost");
          setPosts(unique);
        }

        setHasMore(res.data.total_posts);
        setLoading(false);
      })
      .catch((e) => {
        // console.log("Error ", e);
        setError(true);
      });
  };
  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchPost();

    // }
  }, [endPage, resetPost]);

  return { loading, error, posts, hasMore };
}
