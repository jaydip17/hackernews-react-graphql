import * as React from 'react';

import { NewsItem } from '../data/models/news-item';
import { Comment, commentFragment } from './comment';

export interface ICommentsProps {
  newsItem: NewsItem;
}

export const commentsFragment = `
  fragment Comments on Comment {
    id
    comments {
      id
      comments {
        id
        comments {
          id
          comments {
            id
            ...Comment
          }
          ...Comment
        }
        ...Comment
      }
      ...Comment
    }
    ...Comment
  }
  ${commentFragment}
`;

export class Comments extends React.Component<ICommentsProps> {
  renderComment = (comment, indent): JSX.Element => {
    return <Comment key={comment.id} parentId={comment.parent} indentationLevel={indent} {...comment} />;
  };

  render(): JSX.Element {
    const props = this.props;
    const rows = [];

    props.newsItem.comments.forEach(rootComment => {
      rows.push(this.renderComment(rootComment, 0));

      rootComment.comments.forEach(commentOne => {
        rows.push(this.renderComment(commentOne, 1));

        commentOne.comments.forEach(commentTwo => {
          rows.push(this.renderComment(commentTwo, 2));

          commentTwo.comments.forEach(commentThree => {
            rows.push(this.renderComment(commentThree, 3));

            commentThree.comments.forEach(commentFour => {
              rows.push(this.renderComment(commentFour, 4));

              commentFour.comments.forEach(commentFive => {
                rows.push(this.renderComment(commentFive, 5));
              });
            });
          });
        });
      });
    });

    return (
      <table className="comment-tree" style={{ border: '0' }}>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
