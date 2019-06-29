import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage() {
    const { blog } = this.props;
    if (blog.imageUrl) {
      const fullImageUrl = `https://my-blogster-buket.s3.eu-central-1.amazonaws.com/${
        blog.imageUrl
      }`;
      return <img width="200px" src={fullImageUrl} />;
    }
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(
  mapStateToProps,
  { fetchBlog }
)(BlogShow);
