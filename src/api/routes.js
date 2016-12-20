import express from 'express';
import fetch from '../core/fetch';

const apiRouter = express.Router();

apiRouter.get('/cart', (req, res) => {
  const url = 'http://staging.ecomm.com/api/orders/R540018862?token=a2169dfff47ef681825af95b2a49772291777e01ea6b8985';
  fetch(url)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json)))
    .catch((err) => (err.json())
      .then((json) => (res.json(json)))));
});

export default apiRouter;
