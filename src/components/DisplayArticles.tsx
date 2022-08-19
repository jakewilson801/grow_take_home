import pinOrReadArticles from "../utility/pinOrReadArticles";
import Emoji from "../utility/Emoji";
import useIsMobile from "../utility/useIsMobile";

export default function DisplayArticles(props: {
  articles: [];
  pinArticle: (articles: []) => void;
  pinned: boolean;
}): JSX.Element {
  const isMobile = useIsMobile();
  const containerStyle = isMobile
    ? { display: "flex", width: 400, flexDirection: "column" }
    : {
        width: 770,
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gridGap: "1rem",
        gridAutoFlow: "row",
      };

  return (
    <div
      //@ts-ignore
      style={containerStyle}
      data-testid={props?.pinned ? "PINNED_ARTICLES" : "ARTICLES"}
    >
      {props?.articles?.map(({ article, views, rank }: any, index) => {
        return (
          <div
            key={index}
            style={{
              margin: 10,
              padding: 5,
              display: "flex",
              height: 50,
              border: "1px solid black",
              borderRadius: 5,
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
                rel="noreferrer"
              >
                {article}
              </a>
              <div>
                <b>Views:</b>
                {views}
              </div>
            </div>
            <div
              data-testid={`${props?.pinned ? "PINNED_" : ""}ARTICLE${index}`}
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
    </div>
  );
}
