const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')


const app = express();
// app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);
//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//signup 
app.post("/signup", async (req, res) => {
  console.log(req.body)
  const { email } = req.body

  const checkIfExits = await userModel.findOne({
    email: email
  })
  if (checkIfExits) {
    res.json({ message: "Email id is already register", alert: false });
    // res.json("Email is already register ")
  } else {
    const newUsers = await userModel(req.body);
    // res.json("sucessfully sign up ")
    res.json({ message: "sucessfully sign up", alert: true })
    // res.json(newUsers)
    const data = userModel(req.body);
    const save = data.save();
  }
})

//login api 
app.post("/login", async (req, res) => {
  console.log(req.body)
  const { email } = req.body

  const checkIfExits = await userModel.findOne({
    email: email
  })
  if (checkIfExits) {
    const dataSend = {
      _id: checkIfExits._id,
      firstName: checkIfExits.firstName,
      lastName: checkIfExits.lastName,
      email: checkIfExits.email,
      image: checkIfExits.image,
    };
    console.log(dataSend);
    res.json({
      message: "Login is successfully",
      alert: true,
      data: dataSend,
    });
  } else {
    res.json({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
});

//product section
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct)


//save product in data 
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({ message: "Upload successfully" })
})

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

// ****************payment getway
console.log(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment", async (req, res) => {
  // console.log(req.body)

  try {
    const params = {
      submit_type: 'pay',
      mode: "payment",
      payment_method_types: ['card'],
      billing_address_collection: "auto",
      shipping_option: [{ shipping_rate: "shr_1P8cl7SEFYleJoNfC7gnJGbL" }],


      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // image:[item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty
        }
      }),
      sucess_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      

    }


    const session = await Stripe.checkout.sessions.create(params)
    console.log(session)
    res.status(200).json(session.id)
  }

  catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }


  // res.send({message: "payment gateway", sucess:true})
})



//


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT))