import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './StaticGrid.css';

class StaticGrid extends React.Component {
  render() {
    return (
      <section className={s.staticgrid}>
        <ul className={s.gridwrapper}>
          <li className={cx(s.gridfour, s.staticgrid1)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>2014 Intercoiffure New York</p>
              <p className={s.text}>Icon of Color</p>
              <p className={s.text}>2011 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year - Winner</p>
              <p className={s.text}>2011 NAHA</p>
              <p className={s.text}>Avant Garde - Finalist</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid2)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>2008 Featured on documentary series</p>
              <p className={s.text}>‘I’m NOT just a hairdresser’</p>
              <p className={s.text}>2006 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year – Nominee</p>
              <p className={s.text}>2006 Canadian Hairdresser Mirror Awards</p>
              <p className={s.text}>International Stylist – Nominee&apos;</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>2005 Canadian Hairdresser Mirror Awards</p>
              <p className={s.text}>International Stylist – Winner</p>
              <p className={s.text}>2005 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year – Nominee</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid3)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>2004 Canadian Hairdresser Mirror Awards</p>
              <p className={s.text}>International Stylist – Winner</p>
              <p className={s.text}>2004 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year – Nominee</p>
              <p className={s.text}>2003 Canadian Hairdresser Mirror Awards</p>
              <p className={s.text}>International Stylist – Nominee</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid4)} />
          <li className={cx(s.gridfour, s.staticgrid5)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>2003 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year – Nominee</p>
              <p className={s.text}>2002 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year – Winner</p>
              <p className={s.text}>2002 ABBIES</p>
              <p className={s.text}>Best Salon Educational Program – Winner</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid6)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>2001 NAHA</p>
              <p className={s.text}>Master Hairstylist of the Year – Nominee</p>
              <p className={s.text}>2000 HairColor USA</p>
              <p className={s.text}>Most Inspirational Educator – Winner&apos;</p>
              <p className={s.text}>1998 HairColor USA</p>
              <p className={s.text}>Best Educator of the Year – Winner</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid7)} />
          <li className={cx(s.gridfour, s.staticgrid8)} />
          <li className={cx(s.gridfour, s.staticgridtext)}>
            <div className={s.gtext}>
              <p className={s.text}>Board Member for NAHA (North American Hairstylist Awards)</p>
              <p className={s.text}>Judge for NAHA (North American Hairstylist Awards)</p>
              <p className={s.text}>Judge for Dutch Hairdressing Awards</p>
              <p className={s.text}>Most Inspirational Educator – Winner</p>
              <p className={s.text}>Judge for Belgian Hairdressing Awards</p>
              <p className={s.text}>Judge for Australian Hairdressing Awards</p>
            </div>
          </li>
          <li className={cx(s.gridfour, s.staticgrid9)} />
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(StaticGrid);
