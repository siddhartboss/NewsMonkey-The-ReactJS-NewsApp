import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: "general"

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("constructor from news component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const urln = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(urln);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // console.log("component did mount");
        // let urln = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3159a2ff9394c9084e72ac9319531f3&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(urln);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
        this.updateNews();
    }

    handlePrevClick = async () => {
        // let urln = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cbc0bd68a174dd39ef64ea674f41d3e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true});
        // let data = await fetch(urln);
        // let parsedData = await data.json();

        // this.setState({
        //     page : this.state.page-1,
        //     articles : parsedData.articles,
        //     loading : false
        // });
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }

    handleNextClick = async () => {
        // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let urln = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cbc0bd68a174dd39ef64ea674f41d3e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading : true});
        //     let data = await fetch(urln);
        //     let parsedData = await data.json();

        //     this.setState({
        //         page : this.state.page+1,
        //         articles : parsedData.articles,
        //         loading : false
        //     })
        // }  
        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });
        const urln = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(urln);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            // articles: parsedData.articles,
            totalResults: parsedData.totalResults
            // loading: false
        });
    };

    render() {
        console.log("render");
        return (
            <>
                <div className='container'>
                    <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines On {this.capitalizeFirstLetter(this.props.category)}</h1>
                    {this.state.loading && <Spinner />}
                    <div className="container">
                        <div className="row">
                            {!this.state.loading && this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="conatiner d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-3" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mx-3" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
            </>
        )
    }
}

export default News
