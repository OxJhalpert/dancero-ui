const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express()

const stripe = new Stripe("sk_test_51KH7SdLyE3w569dvFswTsTASL5JdaV7lcXG6VzewW0tT3A41Cp2gLqn3hSemi2FTFXIbNXC8FfVIk1Kt5dYNGwad00CyXzAJw8")

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async (req,res)=>{

    const{ id , amount} = req.body 
    const payment = await stripe.paymentIntents.create({
        amount, 
        currency: "USD",
        description: "rata",
        payment_method: id,
        confirm :true
    });
    console.log(payment)
    res.send({message: 'pago exitoso'})
})




app.listen(3001, ()=>{
    console.log('server on port', 3001)
})