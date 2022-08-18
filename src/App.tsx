import React from "react";
import moment from "moment";
import logo from "./logo.svg";
import "./App.css";

const Emoji = (props: { symbol: string; label: string }) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

function App() {
  const [selectedDate, setSelectedDate] = React.useState<string>(
    moment().subtract(1, "days").format("yyyy-MM-DD")
  );
  const [pageSize, setPageSize] = React.useState<number>(100);
  const [articles, setArticles] = React.useState<[]>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // Tried to do a limit here to reduce traffic but even the client side libraryslices on response
      // https://github.com/tomayac/pageviews.js/blob/master/pageviews.js#L490
      const json = await fetch(
        `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${moment(
          selectedDate
        ).format("yyyy/MM/DD")}`
      );
      const {
        items: [articles],
      } = await json.json();
      const limitedResults = articles?.articles.slice(0, pageSize);
      setLoading(false);
      setArticles(limitedResults);
    };
    getData();
  }, [selectedDate, pageSize]);
  console.log({ selectedDate, pageSize, articles, loading });
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>Start Date:</div>
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => {
            const selected = event?.target.value;
            console.log({
              now: moment().format("yyyy-DD-MM"),
              selected: moment(selected).format("yyyy-DD-MM"),
            });
            //TODO Test cases for this
            if (
              moment(selected).isAfter(moment()) ||
              moment(selected).format("yyyy-DD-MM") ===
                moment().format("yyyy-DD-MM")
            ) {
              console.log(moment(selected).isAfter(moment()));
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
      </div>
      <div>
        {loading && <img src={logo} className="App-logo" alt="logo" />}
        {articles &&
          articles?.map(({ article, views, rank }: any, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  height: 50,
                  width: 300,
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
                <div style={{ justifySelf: "center", paddingRight: 10 }}>
                  <Emoji label={"pin post"} symbol={"📌"} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
