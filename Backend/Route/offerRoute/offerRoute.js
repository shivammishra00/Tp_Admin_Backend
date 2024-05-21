const express = require('express');
const offerRouter = express.Router()

const {addOffer, viewOffer, updateOffer, updateStatusActive, updateStatusDeactive}= require('../../Controller/Offer/offer')

offerRouter.post("/add_offer", addOffer)
offerRouter.get("/view_offer", viewOffer)
offerRouter.patch("/upate_offer/:offerid", updateOffer)
offerRouter.patch("/status_active/:offerid", updateStatusActive)
offerRouter.patch("/status_deactive/:offerid", updateStatusDeactive)



module.exports = offerRouter 