import React from "react";
import moment from "moment";
import logo from "./logo.svg";
import "./App.css";
import pinOrReadArticles from "./utility/pinOrReadArticles";
import DisplayArticles from "./components/DisplayArticles";
import useFetch from "./utility/useFetch";

function App() {
  const [selectedDate, setSelectedDate] = React.useState<string>(
    moment().subtract(1, "days").format("yyyy-MM-DD")
  );
  const [pageSize, setPageSize] = React.useState<number>(100);
  const [pinnedArticles, setPinnedArticles] = React.useState<[]>(
    pinOrReadArticles()
  );

  const { data, loading } = useFetch(
    `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${moment(
      selectedDate
    ).format("yyyy/MM/DD")}`,
    (response) => {
      const {
        items: [articles],
      } = response;
      return articles?.articles.slice(0, pageSize);
    },
    pageSize
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
          padding: 1,
        }}
      >
        <h2 style={{ paddingLeft: 5 }}>Grow Take Home</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Start Date:</div>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                const selected = event?.target.value;
                if (
                  moment(selected).isAfter(moment()) ||
                  moment(selected).format("yyyy-DD-MM") ===
                    moment().format("yyyy-DD-MM")
                ) {
                } else {
                  setSelectedDate(event?.target.value);
                }
              }}
            />
            <div>Number of results:</div>
            <select
              defaultValue={pageSize}
              onChange={(event) => setPageSize(Number(event?.target.value))}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
            <br />
            {loading && <img src={logo} className="App-logo" alt="logo" />}
          </div>
          <div>
            {pinnedArticles && (
              <DisplayArticles
                articles={pinnedArticles}
                pinArticle={setPinnedArticles}
              />
            )}
            <br />
            {data && (
              <DisplayArticles articles={data} pinArticle={setPinnedArticles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
