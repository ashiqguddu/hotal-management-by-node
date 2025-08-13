const express = require("express");
const router = express.Router();
const menu = require("../models/manu");

// make api for menu

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menu(data);
    const responce = await newMenu.save();
    console.log("data saved");
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal serer error " });
  }
});

// api for get data
router.get("/", async (req, res) => {
  try {
    const data = await menu.find();
    console.log("data fatchad ");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});
// api for get data for perticular taste
router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour" || tasteType == 'liquid') {
      const responce = await menu.find({ taste: tasteType });
      console.log("data fatched");
      res.status(200).json(responce);
    } else {
      res.status(404).json({ error: "invalied taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error " });
  }
});

// api for put (update) data in menu

router.put("/:id", async (req, res) => {
  try {
    const dishID = req.params.id;
    const updateOfDish = req.body;

    const responce = await menu.findByIdAndUpdate(dishID, updateOfDish, {
      new: true,
      runValidators: true,
    });

    if(!responce ){
      res.status(404).json({error:'invalid dish YOu typed '})
    }
    console.log('data updated')
    res.status(200).json(responce)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:
      'internal server error '
    })
  }
});

// api for delete 

router.delete('/:id',async(req,res)=>{
try {
  const menuId = req.params.id;

  const responce = await menu.findByIdAndDelete(menuId,{
    new:true,
    runValidators:true
  })
  if(!responce){
     res.status(404).json({error:'invalid id YOu typed '})
  }
  console.log('data deleted successfully')
  res.status(200).json(responce)
} catch (error) {
   console.log(error)
    res.status(500).json({error:
      'internal server error '
    })
}
})

module.exports = router;
