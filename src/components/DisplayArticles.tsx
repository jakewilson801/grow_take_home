import pinOrReadArticles from "../utility/pinOrReadArticles";
import Emoji from "../utility/Emoji";
import useIsMobile from "../utility/useIsMobile";

export default function DisplayArticles(props: {
  articles: [];
  pinArticle: (articles: []) => void;
}): JSX.Element {
  const isMobile = useIsMobile();
  return (
    <>
      {props?.articles?.map(({ article, views, rank }: any, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              height: 50,
              width: isMobile ? 300 : 700,
              border: "1px solid black",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {`#${rank} `}
              <a
                href={`https://en.wikipedia.org/wiki/${article}`}
                target={"_blank"}
              >
                {article}
              </a>
              <div>
                <b>Views:</b>
                {views}
              </div>
            </div>
            <div
              onClick={() => {
                const updatedArticles = pinOrReadArticles({
                  article,
                  views,
                  rank,
                });
                props?.pinArticle(updatedArticles);
              }}
              style={{
                justifySelf: "center",
                paddingRight: 10,
                cursor: "pointer",
              }}
            >
              <Emoji label={"pin post"} symbol={"📌"} />
            </div>
          </div>
        );
      })}
    </>
  );
}
