import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './StaticGrid.css';

class StaticGrid extends Component {
  render() {
    return (
      <section className={s.staticgrid}>
        <ul className={s.gridwrapper}>
          <li className={cx(s.gridfour, s.staticgrid1)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                2014 Intercoiffure New York<br />
                <b>Icon of Color</b><br />
                2011 NAHA<br />
                <b>Master Hairstylist of the Year - Winner</b><br />
                2011 NAHA<br />
                <b>Avant Garde - Finalist</b>
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid2)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                2008 Featured on documentary series<br />
                <b>‘I’m NOT just a hairdresser’</b><br />
                2006 NAHA<br />
                <b>Master Hairstylist of the Year – Nominee</b><br />
                2006 Canadian Hairdresser Mirror Awards<br />
                <b>International Stylist – Nominee</b>
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                2005 Canadian Hairdresser Mirror Awards<br />
                <b>International Stylist – Winner</b><br />
                2005 NAHA<br />
                <b>Master Hairstylist of the Year – Nominee</b>
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid3)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                2004 Canadian Hairdresser Mirror Awards<br />
                <b>International Stylist – Winner</b><br />
                2004 NAHA<br />
                <b>Master Hairstylist of the Year – Nominee</b><br />
                2003 Canadian Hairdresser Mirror Awards<br />
                <b>International Stylist – Nominee</b>
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid4)} />
          <li className={cx(s.gridfour, s.staticgrid5)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                2003 NAHA<br />
                <b>Master Hairstylist of the Year – Nominee</b><br />
                2002 NAHA<br />
                <b>Master Hairstylist of the Year – Winner</b><br />
                2002 ABBIES<br />
                <b>Best Salon Educational Program – Winner</b>
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid6)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                2001 NAHA<br />
                <b>Master Hairstylist of the Year – Nominee</b><br />
                1998 HairColor USA<br />
                <b>Best Educator of the Year – Winner</b>
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid7)} />
          <li className={cx(s.gridfour, s.staticgrid8)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>
                Board Member for NAHA (North American Hairstylist Awards)<br />
                Judge for NAHA (North American Hairstylist Awards)<br />
                Judge for Dutch Hairdressing Awards<br />
                Most Inspirational Educator – Winner<br />
                Judge for Belgian Hairdressing Awards<br />
                Judge for Australian Hairdressing Awards
              </p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid9)} />
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(StaticGrid);
