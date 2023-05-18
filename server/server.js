const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Sample data
const coupons = [
  { id: 1, name: 'Amazon', discount: '50%', image: 'https://www.pngfind.com/pngs/m/79-799402_amazon-logo-amazon-marketing-services-logo-hd-png.png', code: 'AMAZON50' },
  { id: 2, name: 'Honey', discount: '40%', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Honey_Logo_Orange.svg', code: 'HONEY40' },
  { id: 3, name: 'eBay', discount: '25%', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg', code: 'EBAY25' },
  { id: 4, name: 'Target', discount: '20%', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg', code: 'TARGET20' },
  { id: 5, name: 'Best Buy', discount: '30%', image: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2011/08/23/21596752-best-buy-logo-wallpaper.530x298.jpg?v=1433251669', code: 'BESTBUY30' },
  { id: 6, name: 'Walmart', discount: '15%', image: 'https://s3.amazonaws.com/www-inside-design/uploads/2018/04/walmart-square.jpg', code: 'WALMART15' },
  { id: 7, name: 'Nike', discount: '35%', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', code: 'NIKE35' },
  { id: 8, name: 'Starbucks', discount: '10%', image: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg', code: 'STARBUCKS10' },
  { id: 9, name: 'Uber', discount: '20%', image: 'https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png', code: 'UBER20' },
  { id: 10, name: 'Apple', discount: '25%', image: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png', code: 'APPLE25' },
];


// GET /coupons endpoint
app.get('/coupons', (req, res) => {
  res.json(coupons);
});

// POST /coupons endpoint
app.post('/coupons', (req, res) => {
  const { id, name, discount, image } = req.body;
  const newCoupon = { id, name, discount, image };
  coupons.push(newCoupon);
  res.json(newCoupon);
});

// GET /coupons/:id endpoint
app.get('/coupons/:id', (req, res) => {
    const couponId = parseInt(req.params.id);
    const coupon = coupons.find((coupon) => coupon.id === couponId);
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  });

// PUT /coupons/:id endpoint
app.put('/coupons/:id', (req, res) => {
  const couponId = parseInt(req.params.id);
  const { name, discount, image } = req.body;
  const couponIndex = coupons.findIndex((coupon) => coupon.id === couponId);
  if (couponIndex !== -1) {
    const updatedCoupon = { ...coupons[couponIndex], name, discount, image };
    coupons[couponIndex] = updatedCoupon;
    res.json(updatedCoupon);
  } else {
    res.status(404).json({ message: 'Coupon not found' });
  }
});

// DELETE /coupons/:id endpoint
app.delete('/coupons/:id', (req, res) => {
  const couponId = parseInt(req.params.id);
  const couponIndex = coupons.findIndex((coupon) => coupon.id === couponId);
  if (couponIndex !== -1) {
    const deletedCoupon = coupons.splice(couponIndex, 1)[0];
    res.json(deletedCoupon);
  } else {
    res.status(404).json({ message: 'Coupon not found' });
  }
});
