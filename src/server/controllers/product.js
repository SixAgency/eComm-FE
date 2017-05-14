import React from 'react';
import Promise from 'bluebird';
import capitalize from 'lodash.capitalize';
import ProductWrapper from '../../pages/Product';
import CategoryWrapper from '../../pages/Category';
import MannequinHeadsWrapper from '../../pages/MannequinHeads';

import { render, error } from '../common/render';
import { getProduct, getProducts } from '../products';
import { getSession } from '../session';


/**
 * Product Details page handler
 * @param req
 * @param resp
 * @param next
 */
function product(req, resp, next) {
  Promise.all([
    getSession(req),
    getProduct(req)
  ])
    .then(([cart, prod]) => {
      const prodParams = {
        slug: req.params.slug
      };
      const { images } = prod.product.master;
      let ogImage = '';
      if (images.length > 0 && images[0].large_url) {
        ogImage = `https:${images[0].large_url}`;
      }
      const prodFeed = { ...prod, isLoaded: !prod.isError };
      const params = {
        title: prod.product.name || 'Shop',
        description: prod.product.description || '',
        ogImage,
        header: 'colored',
        active: '/',
        content: <ProductWrapper product={prodFeed} params={prodParams} cartItems={cart} />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Product Category page handler
 * @param req
 * @param resp
 * @param next
 */
function category(req, resp, next) {
  Promise.all([
    getProducts(req)
  ])
    .then(([products]) => {
      const prodParams = {
        slug: req.params.slug
      };
      const gridItems = { ...products, isLoaded: !products.isError };
      const params = {
        title: `${capitalize(prodParams.slug)} Archives`,
        description: '',
        header: 'default',
        active: '/',
        content: <CategoryWrapper categoryItems={gridItems} params={prodParams} />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * KS Mannequin page handler
 * @param req
 * @param resp
 * @param next
 */
function ksMannequin(req, resp, next) {
  const params = {
    title: 'ks Mannequin Heads',
    description: '',
    header: 'default',
    active: '/shop',
    content: <MannequinHeadsWrapper />
  };
  return render(req, resp, next, params);
}
export { product, category, ksMannequin };
