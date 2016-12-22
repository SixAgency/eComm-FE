import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <section className={s.container}>
        <section className={s.cwrpr}>
          <div className={s.content}>
            <article>
              <div className={s.cbody}>
                <h2 className={s.errtitle}> Uh oh! (404 Error)</h2>
                <div>
                  <h4
                    className={s.errcontent}
                  >
                    We are really sorry but the page you requested is missing :(
                  </h4>
                </div>
                <a
                  href=""
                  className={s.goback}
                >
                  ← Go Back
                </a>
              </div>
            </article>
          </div>
        </section>
      </section>
    );
  }
}

export default withStyles(s)(NotFound);
