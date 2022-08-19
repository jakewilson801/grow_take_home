import React from "react";
import moment from "moment";
import "./App.css";
import pinOrReadArticles from "./utility/pinOrReadArticles";
import DisplayArticles from "./components/DisplayArticles";
import useFetch from "./utility/useFetch";
import PageSizeOptions from "./components/PageSizeOptions";
import PageDateOptions from "./components/PageDateOptions";
import Loading from "./utility/Loading";

function App() {
  const [selectedDate, setSelectedDate] = React.useState<string>(
    moment().subtract(1, "days").format("yyyy-MM-DD")
  );
  const [pageSize, setPageSize] = React.useState<number>(100);
  const [pinnedArticles, setPinnedArticles] = React.useState<[]>(
    pinOrReadArticles()
  );

  const { data, loading, error } = useFetch(
    `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${moment(
      selectedDate
    ).format("yyyy/MM/DD")}`,
    (response) => {
      const {
        items: [articles],
      } = response;
      return articles?.articles.slice(0, pageSize);
    },
    pageSize,
    selectedDate
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: 50,
          border: "2px solid black",
          flexDirection: "column",
        }}
      >
        <h2 style={{ paddingLeft: 5 }}>Wikimedia Top Views</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div>
          <div style={{ margin: 20, display: "flex", flexDirection: "column" }}>
            <div>Start Date:</div>
            <PageDateOptions
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div>Number of results:</div>
            <PageSizeOptions pageSize={pageSize} setPageSize={setPageSize} />
            <Loading loading={loading} />
          </div>
          <div>
            {pinnedArticles && pinnedArticles?.length > 0 && (
              <>
                <div style={{ marginLeft: 15 }}>
                  <b>Pinned:</b>
                </div>
                <DisplayArticles
                  pinned={true}
                  articles={pinnedArticles}
                  pinArticle={setPinnedArticles}
                />
                <hr />
              </>
            )}
            {data && !error && (
              <DisplayArticles
                pinned={false}
                articles={data}
                pinArticle={setPinnedArticles}
              />
            )}
            {error && (
              <div>
                There was an issue fetching posts please check the dates
                inputted.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
