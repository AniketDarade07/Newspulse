import React from "react";

class News extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = { articles: [], isLoading: true };
  }

  async componentDidMount() {
    console.log("componentDidMount");
    await this.fetchNewsData(this.props.newsName);
  }

  async componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    if (prevProps.newsName !== this.props.newsName) {
      await this.fetchNewsData(this.props.newsName);
    }
  }

  async fetchNewsData(newsName) {
    try {
      this.setState({ isLoading: true });
      const apiKey = process.env.REACT_APP_NEWS_API_KEY; 
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${newsName}&apiKey=${apiKey}`
      );
      let data = await res.json();
      console.log(data);

      if (data.articles) {
        this.setState({ articles: data.articles, isLoading: false });
      } else {
        console.error("No articles found in response");
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ isLoading: false });
    }
  }

  
  render() {
    console.log("rendering", this.state.isLoading);
    const { articles, isLoading } = this.state;

    return (
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          articles.map((p, index) => (
            <div key={`${p.url}-${index}`} className="p-8">
              <div className="max-w-sm rounded overflow-hidden shadow-lg" >
                <img className="w-full" style={{ maxHeight: '150px', overflow: 'hidden' }} src={p.urlToImage} alt="article" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{p.title}</div>
                  <p className="text-gray-700 text-base" style={{ maxHeight: '150px', overflow: 'hidden' }}>{p.description}</p>
                  <button className="font-bold text-xl mb-2">
                    <a href={p.url}>Read more</a>
                  </button>
                </div>
                <div className="text-gray-700 text-base" style={{ marginLeft: '65px', overflow: 'hidden' }}>{p.publishedAt}</div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Newshub</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Newspulse</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#News</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}


export default News;
