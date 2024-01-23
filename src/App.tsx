import { useEffect, useState } from "react";
import "./App.css";

type ShortnedUrl = {
  url: string;
  short: string;
  hits: number;
  title?: string;
};

function App() {
  const [url, setUrl] = useState("");

  const [shortnedUrls, setShortnedUrls] = useState<ShortnedUrl[]>([]);

  const fetchUrls = () => {
    fetch("http://localhost:3000").then(async (res) => {
      setShortnedUrls(await res.json());
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000").then(async (res) => {
      setShortnedUrls(await res.json());
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setUrl("");
      fetchUrls();
    });
  };

  return (
    <>
      <div>
        <form
          action="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          onSubmit={onSubmit}
        >
          <label htmlFor="url">Add a url to create a short url</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
        <div>
          {shortnedUrls.length > 0 ? <h2>Shortned urls</h2> : null}
          <ul>
            {shortnedUrls.map((url, i) => (
              <li key={url.short}>
                <span>#{i + 1} - Hits: {url.hits} - </span>
                <a href={url.url} target="_blank" rel="noreferrer">
                  {url.title || url.url}
                </a>
                <br />
                <span>{url.short}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
