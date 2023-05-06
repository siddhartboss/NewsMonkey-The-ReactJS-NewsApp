import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageurl, newsurl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{display:'flex', justifyContent : 'flex-end', position:'absolute', right:0}}>
                    <span class="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={imageurl ? imageurl : "https://media.cnn.com/api/v1/images/stellar/prod/230420123747-06-spacex-starship-launch-0420-explosion.jpg?c=16x9&q=w_800,c_fill"} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unkown"} On {new Date(date).toGMTString()} </small></p>
                        <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-sm btn-dark">Read News</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
